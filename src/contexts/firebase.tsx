import { createContext, useContext, FC, useState, useEffect } from 'react';

import FirebaseService from 'services/Firebase';

export type User = 
 | {}
 | null;
export interface Value {
  firebase: FirebaseService;
  user: User;
}

export interface Props {
  config: Object;
}

export const FirebaseContext = createContext({} as Value);

export const FirebaseConsumer = FirebaseContext.Consumer;

export const useFirebase = () => useContext(FirebaseContext);

const instances = new WeakMap();

const initialize = (config: Object) => { 
  if (!instances.has(config)) {
    instances.set(config, new FirebaseService(config));
  }

  return instances.get(config);
};

export const FirebaseProvider: FC<Props> = ({ config, children }) => {
  const [user, setUser] = useState<User>({});

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
