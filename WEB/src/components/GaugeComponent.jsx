/* eslint-disable react/prop-types */

import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Box } from '@mui/material';

export default function ArcDesign({ valueFWA, valueFibra }) {
  const settings = {
    width: 150,
    height: 150,
    value: valueFWA,
  };
  const settings1 = {
    width: 150,
    height: 150,
    value: valueFibra,
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Gauge
      valueMax={7000}
        {...settings}
        cornerRadius="50%" startAngle={-90} endAngle={90}
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 30,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
          
        })}
      />
      <Gauge
      valueMax={7000}
        {...settings1}
        cornerRadius="50%" startAngle={-90} endAngle={90}
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 30,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: '#02b2af',
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
    </Box>
  );
}
