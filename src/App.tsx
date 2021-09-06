import { FC } from 'react';

import { Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Home from 'pages/Home';
import Admin from 'pages/Admin';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Account from 'pages/Account';
import Landing from 'pages/Landing';
import PasswordForget from 'pages/PasswordForget';

import Navigation from 'components/Navigation';

import * as ROUTES from 'constants/routes';

const App: FC = () => (
  <div className="app">
    <Navigation />

    <Container>
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route path={ROUTES.ADMIN} component={Admin} />
    </Container>
  </div>
);

export default App;
