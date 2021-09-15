import { UserConsumer } from 'contexts/user';

export interface WithUserProps {
  user: unknown;
}

const withUser = (Component: any) => (props: any) => (
  <UserConsumer>
    {(user) => (
      <Component
        {...props}
        user={user}
      />
    )}
  </UserConsumer>
);

export default withUser;
