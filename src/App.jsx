import React from 'react';
/* import { MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'; */
import CssBaseline from '@material-ui/core/CssBaseline';
/* import { Trainee } from './pages';
import Navbar from './pages/components'; */
// import theme from './theme';
import Login from './pages/Login';

const App = () => (
  <>
    <CssBaseline />
    {/* <InputDemo /> */}
    {/*     <MuiThemeProvider theme={theme}>
      <Typography>
        <Trainee />
      </Typography>
    </MuiThemeProvider> */}
    {/*     <Navbar />
    <Trainee /> */}
    <Login />
  </>
);
export default App;
