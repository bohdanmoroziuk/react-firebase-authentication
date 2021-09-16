import { FC } from 'react';

import { User, useAuthorization } from 'contexts/firebase';

const Home: FC = () => {
  const condition = (user: User) => !!user;

  useAuthorization(condition);

  return (
    <div>
      <h1>Home Page</h1>
      <p>The Home Page is accessible by every signed in user.</p>
    </div>
  );
};

export default Home;
