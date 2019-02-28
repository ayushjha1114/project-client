import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ChildrenDemo } from './pages';
import theme from './theme';

const App = () => (
  <>
    {/* <InputDemo /> */}
    <MuiThemeProvider theme={theme}>
      <ChildrenDemo />
    </MuiThemeProvider>
  </>
);
export default App;
