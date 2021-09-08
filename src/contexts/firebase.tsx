import { createContext } from 'react';

import FirebaseService from 'services/Firebase';

export const FirebaseContext = createContext({} as FirebaseService);

export const FirebaseProvider = FirebaseContext.Provider;
