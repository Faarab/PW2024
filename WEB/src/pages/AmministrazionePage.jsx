import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { Delete, Update, getAll } from '../services/apiService';

export default function FullFeaturedCrudGrid() {
  const [rowModesModel, setRowModesModel] = useState({});
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const data = await getAll();
        setRows(data);
      } catch (error) {
        console.error('There was an error fetching data!', error);
      }
    };

    fetchRows();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    Delete(id)
      .then(() => {
        setRows(rows.filter((row) => row.id !== id));
      })
      .catch((error) => {
        console.error('Failed to delete the item!', error);
      });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    
    Update(updatedRow.id, updatedRow)
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: 'actions',
      type: 'actions',
  
      width: 120,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`${id}-save`}
              icon={<SaveIcon sx={{fontSize:'16px'}}/>}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`${id}-cancel`}
              icon={<CancelIcon sx={{fontSize:'16px'}}/>}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={`${id}-edit`}
            icon={<EditIcon sx={{'color': '#1976d2', fontSize:'16px'}} />}
            label="Edit"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            key={`${id}-delete`}
            icon={<DeleteIcon sx={{'color': 'red', fontSize:'16px'}}/>}
            label="Delete"
            onClick={handleDeleteClick(id)}
          />,
        ];
      },
    },
    { field: 'Regione', headerName: 'Regione', width: 180, editable: false},
    { field: 'Provincia', headerName: 'Provincia', width: 180, editable: false },

    {
      field: 'Stato Fibra',
      headerName: 'Stato Fibra',
      width: 180,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['terminato', 'in esecuzione', 'in programmazione', 'in collaudo', 'in progettazione esecutiva', 'in progettazione definitiva'],
    },
    {
      field: 'Piano fibra (anno)',
      headerName: 'Piano Fibra',
      width: 150,
      editable: true,
    },
    {
      field: 'Stato FWA',
      headerName: 'Stato FWA',
      width: 180,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['terminato', 'in esecuzione', 'in programmazione', 'in collaudo', 'in progettazione esecutiva', 'in progettazione definitiva'],
    },
    {
      field: 'Piano FWA (anno)',
      headerName: 'Piano FWA',
      width: 150,
      editable: true,
    },
  ];

  return (
    <Box sx={{ height: '80vh', width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        sx={{fontSize: '16px'}}
      />
    </Box>
  );
}
