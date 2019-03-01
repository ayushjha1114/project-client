import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthRoute, PrivateRoute } from './routes';
import Login from './pages/Login';
import TextFieldDemo, {
  NoMatch, Trainee, ChildrenDemo, InputDemo,
} from './pages';
import { traineePath } from './configs/constants';

const App = () => (
  <>
    <CssBaseline />
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Trainee} />
        <AuthRoute path="/login" component={Login} />
        <PrivateRoute path="/text-field-demo" component={TextFieldDemo} />
        <PrivateRoute path={traineePath} component={Trainee} />
        <PrivateRoute path="/children-demo" component={ChildrenDemo} />
        <PrivateRoute path="/input-demo" component={InputDemo} />
        <PrivateRoute component={NoMatch} />
      </Switch>
    </Router>
  </>
);
export default App;
