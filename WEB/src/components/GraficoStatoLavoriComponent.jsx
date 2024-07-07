/* eslint-disable react/prop-types */

import { BarChart } from '@mui/x-charts/BarChart';

export default function GraficoStatoLavoriComponent({ provinceData }) {
  const hasTerminati = provinceData.some(item => item.terminato > 0);
  const hasInEsecuzione = provinceData.some(item => item['in esecuzione'] > 0);
  const hasInProgrammazione = provinceData.some(item => item['in programmazione'] > 0);

  const series = [];
  if (hasTerminati) {
    const terminati = provinceData.map(item => item.terminato || 0);
    series.push({ data: terminati, label: 'Terminati' });
  }
  if (hasInEsecuzione) {
    const inEsecuzione = provinceData.map(item => item['in esecuzione'] || 0);
    series.push({ data: inEsecuzione, label: 'In Esecuzione' });
  }
  if (hasInProgrammazione) {
    const inProgrammazione = provinceData.map(item => item['in programmazione'] || 0);
    series.push({ data: inProgrammazione, label: 'In Programmazione' });
  }

  const province = provinceData.map(item => item.Provincia);

  return (
    <>
      <BarChart
        xAxis={[{ scaleType: 'band', data: province }]}
        series={series}
        height={300}
      />
    </>
  );
}
