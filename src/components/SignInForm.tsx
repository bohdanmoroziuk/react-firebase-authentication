import { ChangeEvent, FormEvent, FC, useState } from 'react';

import { useHistory } from 'react-router';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import * as R from 'ramda';

import FirebaseService from 'services/Firebase';
import { useAuthentication} from 'contexts/firebase';
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

const SignInForm: FC = () => {
  const [state, setState] = useState<State>(initialState);

  const auth = useAuthentication();

  const history = useHistory();

  const isValid = R.all(
    R.pipe(R.isEmpty, R.not),
    R.values(R.pick(['email', 'password'], state))
  );

  const isInvalid = R.not(isValid);

  const resetState = () => {
    setState(initialState);
  };

  const updateState = (changes: Partial<State>) => {
    setState((previousState) => ({
      ...previousState,
      ...changes,
    }));
  };

  const handleReset = () => {
    resetState();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { email, password } = state;

    auth.signIn(email, password)
      .then(() => {
        resetState();
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        updateState({ error });
      });
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateState({ [event.target.name]: event.target.value });
  }

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
          value={state.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
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

      {state.error && (
        <p className="text-danger mt-3">
          {state.error.message}
        </p>
      )}
    </Form>
  );
};

export default SignInForm;
