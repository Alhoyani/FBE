import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import { AuthProvider } from './context/AuthContext';
import GlobalLoader from './components/Loading/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AuthProvider>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <GlobalLoader />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routing />
        </LocalizationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
