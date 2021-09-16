import { ChangeEvent, FC, FormEvent, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import * as R from 'ramda';

import { useAuthentication } from 'contexts/firebase';

export interface State {
  password: string;
  password2: string;
  error: { message: string } | null;
}

export const initialState = {
  password: '',
  password2: '',
  error: null,
};

export const PasswordChangeForm: FC = () => {
  const [state, setState] = useState<State>(initialState);

  const auth = useAuthentication();

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
    R.not(R.equals(state.password, '')),
    R.equals(state.password, state.password2)
  );

  const isInvalid = R.not(isValid);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { password } = state;

    auth.changePassword(password)
      .then(() => {
        resetState();
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
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="New password"
          value={state.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password2">
        <Form.Label>Confirm New Password</Form.Label>
        <Form.Control
          type="password"
          name="password2"
          placeholder="Confirm new password"
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
        Change Password
      </Button>

      {state.error && (
        <p className="text-danger mt-3">
          {state.error.message}
        </p>
      )}
    </Form>
  );
};

export default PasswordChangeForm;
