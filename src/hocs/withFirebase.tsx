import { FirebaseConsumer } from 'contexts/firebase';
import FirebaseService from 'services/Firebase';

export interface WithFirebaseProps {
  firebase: FirebaseService;
}

const withFirebase = (Component: any) => (props: any) => (
  <FirebaseConsumer>
    {(firebase) => (
      <Component
        {...props}
        firebase={firebase}
      />
    )}
  </FirebaseConsumer>
);

export default withFirebase;
