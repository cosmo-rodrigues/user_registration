// @ts-nocheck
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserCredentialsCredentials, IUserInfo } from '../../dtos';

interface IAuth {
  user: IUserInfo;
  setUser: Dispatch<SetStateAction<IUserCredentials>>;
  login: (user: IUserCredentials) => void;
  logout: () => void;
  handleUserData: ({}) => void;
}

const DEFAULT_USER_INFOS = {
  id: '',
  name: '',
  email: '',
  role: '',
  cpf: '',
  pis: '',
  addressId: '',
  address: '',
  photo: '',
};

const AUTH_CONTEXT_DEFAULT_VALUES = {
  user: DEFAULT_USER_INFOS,
  setUser: (user: IUserCredentials) => user,
  login: (user: IUserCredentials) => null,
  logout: () => null,
  handleUserData: ({}) => null,
};

export const AuthContext = createContext<IAuth>(
  AUTH_CONTEXT_DEFAULT_VALUES as IAuth
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({} as IUserCredentials);
  const navigate = useNavigate();

  function login(userCredentials: IUserCredentialsCredentials) {
    setUser(userCredentials);
    navigate('/');
  }

  function logout() {
    window.open(process.env.REACT_APP_LOGOUT_URL, '_self');
    setUser(DEFAULT_USER_INFOS);
    navigate('/login');
  }

  function handleUserData(data: IUserCredentials) {
    console.log(data);
    const dataUpdated = { ...data };
    if (data.displayName) {
      dataUpdated.name = data.displayName;
    }
    if (data.photos) {
      dataUpdated.photo = data.photos[0].value;
      delete data.photos;
    }
    if (!data.photo) dataUpdated.photo = './favicon.png';
    setUser(dataUpdated);
  }

  return (
    <AuthContext.Provider
      value={{
        handleUserData,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
