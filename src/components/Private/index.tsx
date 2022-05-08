import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';

interface IProps {
  children: ReactNode;
}
export function Private({ children }: IProps) {
  const { user } = useContext(AuthContext);

  if (!user.id) return <Navigate to='/login' />;
  return <>{children}</>;
}
