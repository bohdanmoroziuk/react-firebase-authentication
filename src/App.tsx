import { Component } from 'react';

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

import { UserProvider } from 'contexts/user';
import FirebaseService from 'services/Firebase';
import withFirebase from 'hocs/withFirebase';

import * as ROUTES from 'constants/routes';

interface Props {
  firebase: FirebaseService;
}

interface State {
  user: unknown;
}

export class App extends Component<Props, State> {
  private listener: Function | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.onAuthStateChange((user: unknown) => (
      user 
        ? this.setState({ user }) 
        : this.setState({ user: null })
    ));
  }

  componentWillUnmount() {
    this.listener?.();
  }

  render() {
    const {
      state: {
        user,
      },
    } = this;

    return (
      <UserProvider value={user}>
        <div className="app">
          <Navigation />
      
          <Container className="mt-3">
            <Route exact path={ROUTES.LANDING} component={Landing} />
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
            <Route path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.ACCOUNT} component={Account} />
            <Route path={ROUTES.ADMIN} component={Admin} />
          </Container>
        </div>
      </UserProvider>
    );
  }
}

export default withFirebase(App);
