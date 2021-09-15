import { FC } from 'react';

import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';

import SignInForm from 'components/SignInForm';
import SignUpLink from 'components/SignUpLink';
import PasswordForgetLink from 'components/PasswordForgetLink';

const SignIn: FC = () => {
  return (
    <div>
      <Row>
        <Column md={{ span: 6, offset: 3 }}>
          <h2>Sign In</h2>

          <SignInForm />
          <PasswordForgetLink />
          <SignUpLink />
        </Column>
      </Row>
    </div>
  );
};

export default SignIn;
