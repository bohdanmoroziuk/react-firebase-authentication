import { ChangeEvent, Component, FormEvent } from 'react';

import { withRouter } from 'react-router';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import * as R from 'ramda';

import FirebaseService from 'services/Firebase';
import withFirebase from 'hocs/withFirebase';
import * as ROUTES from 'constants/routes';

export interface State {
  email: string;
  password: string;
  error: { message: string } | null;
}

export interface Props {
  firebase: FirebaseService;
  history: any;
}

export const initialState = {
  email: '',
  password: '',
  error: null,
};

export class SignInFormBase extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { ...initialState };
  }

  get isValid() {
    return R.all(
        R.pipe(R.isEmpty, R.not),
        R.values(R.pick(['email', 'password'], this.state))
      );
  }

  get isInvalid() {
    return R.not(this.isValid);
  }

  handleReset = () => {
    this.setState(initialState);
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { email, password } = this.state;

    this.props.firebase.signIn(email, password)
      .then(() => {
        this.setState({ ...initialState });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
  }

  render() {
    const {
      state: {
        email,
        password,
        error,
      },
      isInvalid,
      handleReset,
      handleChange,
      handleSubmit,
    } = this;

    return (
      <Form
        className="my-3"
        onReset={handleReset}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{ marginRight: '1rem' }}
          disabled={isInvalid}  
        >
          Sign In
        </Button>
        <Button variant="secondary" type="reset">
          Reset
        </Button>

        {error && (
          <p className="text-danger mt-3">
            {error.message}
          </p>
        )}
      </Form>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInForm;
