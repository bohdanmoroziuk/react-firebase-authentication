import { FC, useState, ChangeEvent, FormEvent } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useAuthentication } from 'contexts/firebase';

export interface State {
  email: string;
  error: { message: string } | null;
}

const initialState = {
  email: '',
  error: null,
};

const PasswordForgetForm: FC = () => {
  const [state, setState] = useState<State>(initialState);

  const auth = useAuthentication();

  const isInvalid = state.email.trim() === '';

  const resetState = () => {
    setState(initialState);
  };

  const updateState = (changes: Partial<State>) => {
    setState((previousState) => ({
      ...previousState,
      ...changes,
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateState({ [event.target.name]: event.target.value });
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { email } = state;

    auth.resetPassword(email)
      .then(() => {
        resetState();
      })
      .catch((error) => {
        updateState({ error });
      });
  }

  return (
    <Form
      className="my-3"
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

      <Button
        variant="primary"
        type="submit"
        disabled={isInvalid}
        style={{ marginRight: '1rem' }}
      >
        Reset Password
      </Button>

      {state.error && (
        <p className="text-danger mt-3">
          {state.error.message}
        </p>
      )}
    </Form>
  );
};

export default PasswordForgetForm;
