import { FC } from 'react';

import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';

import PasswordForgetForm from 'components/PasswordForgetForm';
import PasswordChangeForm from 'components/PasswordChangeForm';

import { User, useAuthorization, useFirebase } from 'contexts/firebase';

const Account: FC = () => {
  const condition = (user: User) => !!user;

  useAuthorization(condition);

  const { user } = useFirebase();

  return (
    <div>
      <Row>
        <Column md={{ span: 6, offset: 3 }}>
          <h2>Account: {user?.email}</h2>

          <div className="mt-5">
            <PasswordForgetForm />
          </div>
          <div className="mt-5">
            <PasswordChangeForm />
          </div>
        </Column>
      </Row>
    </div>
  );
};

export default Account;
