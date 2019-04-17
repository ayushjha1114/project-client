import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthRoute, PrivateRoute, PublicRoute, UserRoute } from './routes';
import Login from './pages/Login';
import AdminLogin from './pages/Admin';
import TextFieldDemo, {
  Admin, NoMatch, AboutUs, User, ChildrenDemo, InputDemo,
  SignUp,
} from './pages';
import { userPath, adminPath } from './configs/constants';
import SnackbarProvider from './contexts';

const App = () => (
  <>
    <SnackbarProvider>
      <CssBaseline />
      <Router>
        <Switch>
          <AuthRoute path="/adminLogin" component={AdminLogin} />
          <AuthRoute path="/login" component={Login} />

          <PublicRoute exact path="/" component={AboutUs} />
          <PublicRoute exact path="/aboutUs" component={AboutUs} />
          <PublicRoute exact path="/contactUs" component={ContactUs} />
          <PublicRoute exact path="/signUp" component={SignUp} />

          <UserRoute exact path={userPath} component={User} />

          <PrivateRoute path="/text-field-demo" component={TextFieldDemo} />
          <PrivateRoute path={adminPath} component={Admin} />
          <PrivateRoute path="/logout" component={ChildrenDemo} />
          <PrivateRoute path="/input-demo" component={InputDemo} />
          <PrivateRoute component={NoMatch} />
        </Switch>
      </Router>
    </SnackbarProvider>
  </>
);
export default App;
