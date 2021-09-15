import { createContext } from 'react';

export const UserContext = createContext<unknown>({});

export const UserConsumer = UserContext.Consumer;

export const UserProvider = UserContext.Provider;
