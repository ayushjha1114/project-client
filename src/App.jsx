import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ChildrenDemo } from './pages';
import theme from './theme';

const App = () => (
  <>
    {/* <InputDemo /> */}
    <MuiThemeProvider theme={theme}>
      <Typography>
        <ChildrenDemo />
      </Typography>
    </MuiThemeProvider>
  </>
);
export default App;
