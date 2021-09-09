import { FC } from 'react';

import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';

import SignInForm from 'components/SignInForm';
import SignUpLink from 'components/SignUpLink';

const SignIn: FC = () => {
  return (
    <div>
      <Row>
        <Column md={{ span: 6, offset: 3 }}>
          <h2>Sign In</h2>

          <SignInForm />
          <SignUpLink />
        </Column>
      </Row>
    </div>
  );
};

export default SignIn;
