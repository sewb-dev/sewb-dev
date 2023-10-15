import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => (
  <Box display='flex' justifyContent='center' alignItems='center' height='60vh'>
    <CircularProgress color='primary' />
  </Box>
);

export default Loader;
