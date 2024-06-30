/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Checkbox,
  TextField,
  Autocomplete,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const statoLavori = [
  { label: 'in esecuzione' },
  { label: 'in programmazione' },
  { label: 'terminato' }
];

export default function FormFilterComponent({ dati, onApply, defaultOptions }) {
  const [selectedRegioni, setSelectedRegioni] = useState(defaultOptions.regione || null);
  const [selectedAnno, setSelectedAnno] = useState(defaultOptions.anno || null);
  const [selectedStati, setSelectedStati] = useState(defaultOptions.stato.map(state => ({ label: state })) || []);

  useEffect(() => {
    setSelectedRegioni(defaultOptions.regione || null);
    setSelectedAnno(defaultOptions.anno || null);
    setSelectedStati(defaultOptions.stato.map(state => ({ label: state })) || []);
  }, [defaultOptions]);

  const handleApply = () => {
    const selectedOptions = {
      regione: selectedRegioni,
      anno: selectedAnno,
      stato: selectedStati.map(option => option.label)
    };
    onApply(selectedOptions);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: "500px",
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          id="combo-box-demo-regioni"
          options={dati?.regioni || []}
          value={selectedRegioni}
          onChange={(event, newValue) => setSelectedRegioni(newValue)}
          sx={{ width: "100%", marginBottom: "1rem" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Regioni"
              placeholder="Seleziona una regione"
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo-anni"
          options={dati?.anni || []}
          value={selectedAnno}
          onChange={(event, newValue) => setSelectedAnno(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Anni"
              placeholder="Seleziona un anno"
            />
          )}
        />
        <Autocomplete
          multiple
          id="checkboxes-tags-demo-stati"
          options={statoLavori}
          disableCloseOnSelect
          value={selectedStati}
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => setSelectedStati(newValue)}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Stato lavori"
              
            />
          )}
          sx={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}
        />
        <Button
          variant="contained"
          onClick={handleApply}
          sx={{ width: "24%", alignSelf: "flex-end", fontSize: "14px" }}
        >
          <b>Applica</b>
        </Button>
      </FormControl>
    </Box>
  );
}
