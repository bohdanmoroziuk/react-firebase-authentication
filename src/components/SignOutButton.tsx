import { FC } from 'react';

import Button from 'react-bootstrap/Button';

import { useAuthentication } from 'contexts/firebase';

export const SignOutButton: FC = () => {
  const auth = useAuthentication();

  const handleSignOut = async () => {
    await auth.signOut();
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
