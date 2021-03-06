// @ts-nocheck
import { get, post } from './api';
import { ROLES } from './constants';

const storageNames = [
  { name: '@ezrecord/user', keyData: 'user', isJson: true },
  { name: '@ezrecord/token', keyData: 'token', isJson: false },
  { name: '@ezrecord/theme', keyData: 'theme', isJson: true },
  { name: '@ezrecord/checked', keyData: 'checked', isJson: false },
];

interface IUserEmailCredential {
  email: string;
  password: string;
}

const getUserAuthentication = () =>
  JSON.parse(localStorage.getItem('@ezrecord/user'));

const isAdmin = () => checkCurrentUserRole('admin');
const isUser = () => checkCurrentUserRole('user');

const checkCurrentUserRole = (sourceName: string) =>
  getUserAuthentication()?.role === sourceName;

const signIn = (user: IUserEmailCredential) =>
  post({ type: 'user', service: '/login', data: user });

const signInWithCPF = (cpf: number, ref = 'cpf') =>
  post({ type: 'user', service: `login/${cpf}?ref=${ref}` });

const signInWithPIS = (pis: number, ref = 'pis') =>
  post({ type: 'user', service: `login/${pis}?ref=${ref}` });

const signInSocial = () =>
  get({ type: 'user', service: '/auth/login/success' });

const signOut = () =>
  storageNames.forEach((item) => localStorage.removeItem(item.name));

const isLogged = () => (getUserAuthentication() ? true : false);

const getToken = () => localStorage.getItem('@ezrecord/token');

const removeToken = () => localStorage.removeItem('@ezrecord/token');

const isValidRoles = (currentUser = {}) => {
  ROLES.some((routeRole: string) =>
    currentUser.role === routeRole ? true : false
  );
};

export const loginService = {
  getUserAuthentication,
  getToken,
  isAdmin,
  isLogged,
  isValidRoles,
  isUser,
  removeToken,
  signIn,
  signInSocial,
  signInWithCPF,
  signInWithPIS,
  signOut,
};
