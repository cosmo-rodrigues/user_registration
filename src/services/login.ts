// @ts-nocheck
import { get, post } from './api';
import { ROLES } from './constants';

const storageNames = [
  { name: '@ezrecord/user', keyData: 'user', isJson: true },
  { name: '@ezrecord/token', keyData: 'token', isJson: false },
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

const signInSocial = () =>
  get({ type: 'user', service: '/auth/login/success' });

const signInWithCPF = (cpf: number, ref = 'cpf') =>
  post({ type: 'user', service: `login/authentication/${cpf}?ref=${ref}` });

const signInWithPIS = (pis: number, ref = 'pis') =>
  post({ type: 'user', service: `login/authentication/${pis}?ref=${ref}` });

const signOut = () =>
  storageNames.forEach((item) => localStorage.removeItem(item.name));

const isLogged = () => (getUserAuthentication() ? true : false);

const getToken = () => localStorage.getItem('@ezrecord/token');

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
  signIn,
  signInSocial,
  signInWithCPF,
  signInWithPIS,
  signOut,
};
