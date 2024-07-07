import  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import GaugeContainerComponent from './GaugeContainerComponent';
import BarAnimation2 from './GraficoCantieriComponent';
import { lavoriChiusiCollaudati, getRegioniAnni, lavoriAperti, lavoriInProgrammazione } from '../services/apiService';
import BasicMenu from './DialogFilterComponent';

export default function SimplePaper() {
  const [showGraphs, setShowGraphs] = useState({
    chiusi: false,
    aperti: false,
    programmazione: false,
  });
  const [lavoriChiusi, setLavoriChiusi] = useState(null);
  const [lavoriApertiData, setLavoriAperti] = useState(null);
  const [lavoriInProgrammazioneData, setLavoriInProgrammazione] = useState(null);
  const [regioniAnni, setRegioniAnni] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    regione: [],
  });

  const handleApplyOptions = (options) => {
    setSelectedOptions(options);
    
  };

  useEffect(() => {
    const fetchRegioni = async () => {
      try {
        const data = await getRegioniAnni();
        setRegioniAnni(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRegioni();
  }, [selectedOptions]);

  const handleClickToggleGraph = (statoCantiere) => {
    setShowGraphs(prevState => ({
      chiusi: statoCantiere === 'chiusi' ? !prevState.chiusi : false,
      aperti: statoCantiere === 'aperti' ? !prevState.aperti : false,
      programmazione: statoCantiere === 'programmazione' ? !prevState.programmazione : false,
    }));
  };

  useEffect(() => {
    async function fetchLavoriChiusi() {
      try {
        const result = await lavoriChiusiCollaudati(true, true, selectedOptions.regione);
        setLavoriChiusi(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLavoriChiusi();
  }, [regioniAnni, selectedOptions]);

  useEffect(() => {
    async function fetchLavoriAperti() {
      try {
        const result = await lavoriAperti(true, true, selectedOptions.regione);
        setLavoriAperti(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLavoriAperti();
  }, [regioniAnni, selectedOptions]);
  useEffect(() => {
    async function fetchLavoriInProgrammazione() {
      try {
        const result = await lavoriInProgrammazione(true, true, selectedOptions.regione);
        setLavoriInProgrammazione(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLavoriInProgrammazione();
  }, [regioniAnni, selectedOptions]);

  
  const totalFwaChiusi = (lavoriChiusi || [])
    .filter(item => item.tipo === 'fwa')
    .reduce((sum, item) => sum + item.conteggio, 0);

  const totalFibraChiusi = (lavoriChiusi || [])
    .filter(item => item.tipo === 'fibra')
    .reduce((sum, item) => sum + item.conteggio, 0);

  const totalFwaAperti = (lavoriApertiData || [])
    .filter(item => item.tipo === 'fwa')
    .reduce((sum, item) => sum + item.conteggio, 0);

  const totalFibraAperti = (lavoriApertiData || [])
    .filter(item => item.tipo === 'fibra')
    .reduce((sum, item) => sum + item.conteggio, 0);

  const totalFwaInProgrammazione = (lavoriInProgrammazioneData || [])
    .filter(item => item.tipo === 'fwa')
    .reduce((sum, item) => sum + item.conteggio, 0);

  const totalFibraInProgrammazione = (lavoriInProgrammazioneData || [])
    .filter(item => item.tipo === 'fibra')
    .reduce((sum, item) => sum + item.conteggio, 0);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:'2rem', marginTop:'3rem'}}>
        <h3 className='titoloPrimoPiano'>Primo Piano Cantieri in Italia</h3>
        <BasicMenu dati={regioniAnni} onApply={handleApplyOptions} />
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          '& > :not(style)': {
            m: 2,
            width: 'auto',
            height: 'auto',
            flexGrow: 1,
            padding: '1rem',
          },
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
          scrollbarWidth: 'thin',
          scrollbarColor: '#888 #e0e0e0',
        }}
      >
        <GaugeContainerComponent 
          title="Chiusi e collaudati" 
          icon="locked" 
          valueFWA={totalFwaChiusi} 
          valueFibra={totalFibraChiusi} 
          onToggle={() => handleClickToggleGraph('chiusi')}
          showGraph={showGraphs['chiusi']}
          isToggleVisible={true}
        />
        <GaugeContainerComponent 
          title="Aperti" 
          icon="open" 
          valueFWA={totalFwaAperti} 
          valueFibra={totalFibraAperti} 
          onToggle={() => handleClickToggleGraph('aperti')}
          showGraph={showGraphs['aperti']}
          isToggleVisible={true}
        />
        <GaugeContainerComponent 
          title="In Programmazione" 
          icon="calendar" 
          valueFWA={totalFwaInProgrammazione} 
          valueFibra={totalFibraInProgrammazione} 
          onToggle={() => handleClickToggleGraph('programmazione')}
          showGraph={showGraphs['programmazione']}
          isToggleVisible={true}
        />
      </Box>
      {showGraphs['chiusi'] && lavoriChiusi && <BarAnimation2 regioni={lavoriChiusi} />}
      {showGraphs['aperti'] && lavoriApertiData && <BarAnimation2 regioni={lavoriApertiData} />}
      {showGraphs['programmazione'] && <BarAnimation2 regioni={lavoriInProgrammazioneData}/>}
    </>
  );
}
