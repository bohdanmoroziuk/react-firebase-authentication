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
  username: string;
  password: string;
  password2: string;
  error: { message: string } | null;
}

export interface Props {
  firebase: FirebaseService;
  history: any;
}

export const initialState = {
  email: '',
  username: '',
  password: '',
  password2: '',
  error: null,
};

export class SignUpFormBase extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { ...initialState };
  }

  get isValid() {
    return R.and(
      R.all(
        R.pipe(R.isEmpty, R.not),
        R.values(R.pick(['email', 'username', 'password'], this.state))
      ),
      R.equals(
        this.state.password,
        this.state.password2
      )
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

    this.props.firebase.createUser(email, password)
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
        username,
        password,
        password2,
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
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Fullname</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Fullname"
            value={username}
            onChange={handleChange}
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="password2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password2"
            placeholder="Password"
            value={password2}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{ marginRight: '1rem' }}
          disabled={isInvalid}  
        >
          Sign Up
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

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpForm;
