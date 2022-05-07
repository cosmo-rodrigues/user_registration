import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { IUserInfo } from '../../dtos';

interface IProps {
  children: ReactNode;
  user: IUserInfo;
}
export function Private({ children, user }: IProps) {
  if (!user?.id) return <Navigate to='/login' />;
  return <>{children}</>;
}
