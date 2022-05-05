// @ts-nocheck
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersistedState } from '../../hooks/usePersistedState';

export interface IUser {
  id: string;
  displayName: string;
  photos: string[];
}

interface IAuth {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  login: (user: IUser) => void;
  logout: () => void;
}

const DEFAULT_USER_INFOS = {
  id: '',
  displayName: '',
  photos: [],
};

const AUTH_CONTEXT_DEFAULT_VALUES = {
  user: DEFAULT_USER_INFOS,
  setUser: (user: IUser) => user,
  login: (user: IUser) => null,
  logout: () => null,
};

export const AuthContext = createContext<IAuth>(
  AUTH_CONTEXT_DEFAULT_VALUES as IAuth
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({} as IUser);
  const [storedUser, setUserLocalStorage] = usePersistedState('user', user);
  const navigate = useNavigate();

  function login(userCredentials: IUser) {
    setUser(userCredentials);
    navigate('/');
  }

  function logout() {
    window.open(process.env.REACT_APP_LOGOUT_URL, '_self');
    setUser(DEFAULT_USER_INFOS);
    navigate('/login');
  }

  useEffect(() => {
    setUserLocalStorage(user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        storedUser,
        setUserLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
