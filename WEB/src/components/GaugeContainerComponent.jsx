/* eslint-disable react/prop-types */

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AddchartIcon from '@mui/icons-material/Addchart';
import ArcDesign from './GaugeComponent';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const iconMapping = {
  locked: LockOutlinedIcon,
  open: LockOpenIcon,
  calendar: CalendarMonthOutlinedIcon
};

export default function GaugeContainerComponent({ title, icon, valueFWA, valueFibra, onToggle, showGraph, isToggleVisible }) {
  const IconComponent = iconMapping[icon];

  return (
    <Paper elevation={3} sx={{ display: 'inline-block' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4><IconComponent sx={{ fontSize: 24 }} /> {title}</h4>
        {isToggleVisible && (
          <Button onClick={onToggle}>
            {showGraph ? <VisibilityOffOutlinedIcon sx={{ fontSize: 18, color:"black" }}/> : <AddchartIcon sx={{ fontSize: 24}}/>}
          </Button>
        )}
      </Box>
      <ArcDesign valueFWA={valueFWA} valueFibra={valueFibra} />
    </Paper>
  );
}


