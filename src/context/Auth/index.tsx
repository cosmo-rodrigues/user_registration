import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

export interface IUser {
  email: string;
  credential: string | number;
  authenticated?: boolean;
}

interface IAuth {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  login: (email: string, credential: string | number) => void;
  logout: () => void;
}

const DEFAULT_USER_INFOS = {
  email: '',
  credential: '',
  authenticated: false,
};

const AUTH_CONTEXT_DEFAULT_VALUES = {
  user: DEFAULT_USER_INFOS,
  setUser: (user: IUser) => user,
  login: () => null,
  logout: () => null,
};

export const AuthContext = createContext<IAuth>(
  AUTH_CONTEXT_DEFAULT_VALUES as IAuth
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({} as IUser);
  const navigate = useNavigate();

  function login(email: string, credential: string | number) {
    setUser({ email, credential });
    navigate('/');
  }

  function logout() {
    setUser(DEFAULT_USER_INFOS);
    navigate('/login');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
