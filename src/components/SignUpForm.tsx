import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { useHistory } from 'react-router';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import * as R from 'ramda';

import { useFirebase } from 'contexts/firebase';

import * as ROUTES from 'constants/routes';

export interface State {
  email: string;
  username: string;
  password: string;
  password2: string;
  error: { message: string } | null;
}

export const initialState = {
  email: '',
  username: '',
  password: '',
  password2: '',
  error: null,
};

export const SignUpForm: FC = () => {
  const [state, setState] = useState<State>(initialState);

  const { firebase } = useFirebase();

  const history = useHistory();

  const resetState = () => {
    setState(initialState);
  };

  const updateState = (changes: Partial<State>) => {
    setState((previousState) => ({
      ...previousState,
      ...changes,
    }));
  };

  const isValid = R.and(
    R.all(
      R.pipe(R.isEmpty, R.not),
      R.values(R.pick(['email', 'username', 'password'], state))
    ),
    R.equals(
      state.password,
      state.password2
    )
  );

  const isInvalid = R.not(isValid);

  const handleReset = () => {
    resetState();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { email, password } = state;

    firebase.createUser(email, password)
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
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Fullname</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Fullname"
          value={state.username}
          onChange={handleChange}
        />
      </Form.Group>
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
      <Form.Group className="mb-3" controlId="password2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="password2"
          placeholder="Password"
          value={state.password2}
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

      {state.error && (
        <p className="text-danger mt-3">
          {state.error.message}
        </p>
      )}
    </Form>
  );
};

export default SignUpForm;
