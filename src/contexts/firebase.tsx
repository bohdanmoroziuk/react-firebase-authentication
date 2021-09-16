import { createContext, useContext, FC, useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import FirebaseService from 'services/Firebase';

import * as ROUTES from 'constants/routes';

export type User = 
  | 
    {
      email: string;
    }
  | 
    null;
export interface Value {
  firebase: FirebaseService;
  user: User;
}

export interface Props {
  config: Object;
}

export const FirebaseContext = createContext({} as Value);

export const FirebaseConsumer = FirebaseContext.Consumer;

const useFirebase = () => useContext(FirebaseContext);

export const useUser = () => {
  const { user } = useFirebase();

  return user;
};

export const useAuthentication = () => {
  const { firebase } = useFirebase();

  return {
    createUser: (email: string, password: string) => firebase.createUser(email, password), 
    signIn: (email: string, password: string) => firebase.signIn(email, password), 
    signOut: () => firebase.signOut(), 
    changePassword: (password: string) => firebase.changePassword(password), 
    resetPassword: (email: string) => firebase.resetPassword(email),
  };
};

export const useAuthorization = (condition: (user: User) => boolean) => {
  const { firebase } = useFirebase();

  const history = useHistory();

  useEffect(() => {
    const listener = firebase.onAuthStateChange((user) => {
      if (!condition(user as User)) {
        history.push(ROUTES.SIGN_IN);
      }
    });

    return () => listener();
  }, [condition, firebase, history]);
};

const instances = new WeakMap();

const initialize = (config: Object) => { 
  if (!instances.has(config)) {
    instances.set(config, new FirebaseService(config));
  }

  return instances.get(config);
};

export const FirebaseProvider: FC<Props> = ({ config, children }) => {
  const [user, setUser] = useState<User>(null);

  const firebase = initialize(config);

  useEffect(() => {
    const authStateChangeListener = firebase.onAuthStateChange((user: unknown) => {
      user 
        ? setUser(user as User)
        : setUser(null);
    });

    return () => authStateChangeListener();
  });

  const value: Value = {
    firebase,
    user,
  };

  return (
    <FirebaseContext.Provider
      value={value}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
