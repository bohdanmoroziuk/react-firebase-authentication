import { FC } from 'react';

import Button from 'react-bootstrap/Button';

import { useFirebase } from 'contexts/firebase';

export const SignOutButton: FC = () => {
  const { firebase } = useFirebase();

  const handleSignOut = async () => {
    await firebase.signOut();
  };

  return (
    <Button
      type="button"
      variant="primary"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
