
import { Box } from '@mui/material';
import business from '../assets/image/business.png';
import "./_dashboardPage.scss";
import PrimoPianoComponent from '../components/PrimoPianoComponent';

function DashboardPage() {
 
  return ( 
    <>
    <div className='imageContainer'>
      <img className="img" src={business} />
    </div>


    
    <Box sx={{ width: '100%'}}>
      <PrimoPianoComponent/>
    </Box>
    </>
  )
}

export default DashboardPage

