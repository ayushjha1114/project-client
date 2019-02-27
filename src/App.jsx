import React from 'react';
/* import { MuiThemeProvider } from '@material-ui/core/styles'; */
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthRoute, PrivateRoute } from './routes';
import Login from './pages/Login';
import TextFieldDemo, {
  NoMatch, Trainee, ChildrenDemo, InputDemo,
} from './pages';
// import theme from './theme';

const App = () => (
  <>
    <CssBaseline />
    {/* <InputDemo /> */}
    {/*     <MuiThemeProvider theme={theme}>
        <Trainee />
    </MuiThemeProvider> */}
    {/* <AuthRoute /> */}
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Trainee} />
        <AuthRoute path="/login" component={Login} />
        <PrivateRoute path="/text-field-demo" component={TextFieldDemo} />
        <PrivateRoute path="/trainee" component={Trainee} />
        <PrivateRoute path="/children-demo" component={ChildrenDemo} />
        <PrivateRoute path="/input-demo" component={InputDemo} />
        <PrivateRoute component={NoMatch} />
      </Switch>
    </Router>
  </>
);
export default App;
