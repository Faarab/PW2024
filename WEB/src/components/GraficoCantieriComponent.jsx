/* eslint-disable react/prop-types */

import { BarChart } from '@mui/x-charts/BarChart';


export default function GraficoCantieriComponent({ regioni }) {

  const regioniData = [...new Set(regioni.map(item => item.regione))];
  const fibraData = regioni.filter(item => item.tipo === 'fibra');
  const fwaData = regioni.filter(item => item.tipo === 'fwa');

  const conteggiFibra = regioniData.map(regione => 
    fibraData.find(item => item.regione === regione)?.conteggio || 0
  );
  const conteggiFwa = regioniData.map(regione => 
    fwaData.find(item => item.regione === regione)?.conteggio || 0
  );

  return (
    <>
      <BarChart
        xAxis={[{ scaleType: 'band', data: regioniData }]}
        series={[
          { data: conteggiFibra, label: 'Fibra' },
          { data: conteggiFwa, label: 'FWA'}
        ]}
        height={300}
      />
    </>
  );
}
