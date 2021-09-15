import { FC } from 'react';

import { Link } from 'react-router-dom';

import * as ROUTES from 'constants/routes';

const PasswordForgetLink: FC = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forget password?</Link>
  </p>
);

export default PasswordForgetLink;
