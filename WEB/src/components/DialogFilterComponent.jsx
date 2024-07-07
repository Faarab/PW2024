/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { FormControl } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
    maxHeight: '400px',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

export default function DialogFilter({ onApply, dati }) {
  const [open, setOpen] = useState(false);
  const [selectedRegioni, setSelectedRegioni] = useState([]);

  const handleApply = () => {
    const selectedOptions = {
      regione: selectedRegioni,
    };
    onApply(selectedOptions);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} sx={{ fontSize: '16px', color: 'black' }}>
        <b>
          <FilterListOutlinedIcon sx={{ fontSize: '16px' }} /> Filter
        </b>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Filtri
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
            <Autocomplete
              multiple
              limitTags={2}
              value={selectedRegioni}
              disablePortal={false} 
              id="combo-box-demo-regioni"
              options={dati?.regioni || []}
              onChange={(event, newValue) => setSelectedRegioni(newValue)}
              sx={{ width: '100%' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Regioni"
                  placeholder="Seleziona una regione"
                />
              )}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleApply}>
            Applica
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
