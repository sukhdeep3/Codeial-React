import { createContext } from 'react';
import { useProvideAuth } from '../hooks';

const initialState = {
  user: null,
  login: (email, password) => {},
  logout: () => {},
  loading: true,
  signup: ()=>{}
};
export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
