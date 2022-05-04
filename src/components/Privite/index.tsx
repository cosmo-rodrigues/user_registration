import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { IUser } from '../../context/Auth';

interface IProps {
  children: ReactNode;
  user: IUser;
}
export function Private({ children, user }: IProps) {
  if (!user.authenticated) return <Navigate to='/login' />;
  return <>{children}</>;
}
