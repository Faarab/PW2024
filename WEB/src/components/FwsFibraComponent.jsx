/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import FormFilterComponent from "./FormFilterComponent";
import GraficoStatoLavoriComponent from "./GraficoStatoLavoriComponent";

export default function FwsFibraComponent({
  initialOptions,
  fetchOptionsApi,
  fetchDatiApi,
  immagineSrc,
  formLeft = true,
}) {
  const [selectedOptions, setSelectedOptions] = useState(initialOptions);
  const [optionsData, setOptionsData] = useState([]);
  const [datiCantieri, setDatiCantieri] = useState([]);

  const handleApplyOptions = (options) => {
    setSelectedOptions(options);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await fetchOptionsApi(selectedOptions.regione, selectedOptions.anno);
        setOptionsData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOptions();
  }, [selectedOptions.regione, selectedOptions.anno]);

  useEffect(() => {
    const fetchDati = async () => {
      try {
        const data = await fetchDatiApi(selectedOptions.regione, selectedOptions.anno, selectedOptions.stato);
        setDatiCantieri(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDati();
  }, [selectedOptions]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          alignItems: "flex-start",
          marginBottom: "5rem",
          flexWrap: "wrap",
          flexDirection: formLeft ? "row" : "row-reverse",
        }}
      >
        <Box sx={{ flex: "1 1 auto", minWidth: "250px", justifyContent:'space-between' }}>
          <FormFilterComponent dati={optionsData} onApply={handleApplyOptions} defaultOptions={selectedOptions} />
        </Box>
        <Box
          component="img"
          src={immagineSrc}
          sx={{
            height: "32vh",
            width: "24vw",
            display: { xs: "none", md: "block" },
          }}
        />
      </Box>

      <GraficoStatoLavoriComponent provinceData={datiCantieri} />
    </>
  );
}
