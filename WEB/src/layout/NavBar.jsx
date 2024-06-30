import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import FibraPage from '../pages/FibraPage';
import FwaPage from '../pages/FwsPage';
import FullFeaturedCrudGrid from '../pages/AmministrazionePage';
import './_navBar.scss';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate('/');
    } else if (newValue === 1) {
      navigate('/fibra');
    } else if (newValue === 2) {
      navigate('/fwa');
    } else if (newValue === 3) {
      navigate('/gestioneDati');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <div className="prova">
        <h3 className='logo'>Butiki.</h3>
      </div>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          variant="scrollable" 
          scrollButtons="auto"
        >
          <Tab label="Home" {...a11yProps(0)} style={{ fontSize: '16px' }} />
          <Tab label="Fibra" {...a11yProps(1)} style={{ fontSize: '16px' }} />
          <Tab label="FWA" {...a11yProps(2)} style={{ fontSize: '16px' }} />
          <Tab label="Gestione dati" {...a11yProps(3)} style={{ fontSize: '16px' }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DashboardPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FibraPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <FwaPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <FullFeaturedCrudGrid />
      </CustomTabPanel>
    </Box>
  );
}
