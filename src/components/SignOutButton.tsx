import { FC } from 'react';

import Button from 'react-bootstrap/Button';

import FirebaseService from 'services/Firebase';
import withFirebase from 'hocs/withFirebase';

export interface Props {
  firebase: FirebaseService;
}

export const SignOutButton: FC<Props> = ({ firebase }) => (
  <Button
    type="button"
    variant="primary"
    onClick={() => firebase.signOut()}
  >
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
