import { FC } from 'react';

import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';

import SignUpForm from 'components/SignUpForm';

const SignUp: FC = () => {
  return (
    <div>
      <Row>
        <Column md={{ span: 6, offset: 3 }}>
          <h2>Sign Up</h2>

          <SignUpForm />
        </Column>
      </Row>
    </div>
  );
};

export default SignUp;
