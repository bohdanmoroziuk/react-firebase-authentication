import { FC } from 'react';

import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';

import PasswordForgetForm from 'components/PasswordForgetForm';

const PasswordForget: FC = () => {
  return (
    <div>
      <Row>
        <Column md={{ span: 6, offset: 3 }}>
          <h2>Reset Password</h2>

          <PasswordForgetForm />
        </Column>
      </Row>
    </div>
  );
};

export default PasswordForget;
