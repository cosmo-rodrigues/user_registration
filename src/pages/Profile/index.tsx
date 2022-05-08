import { useContext } from 'react';
import { AddEdit } from '../../components/AddEdit';
import { AuthContext } from '../../context/Auth';

export function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* @ts-ignore */}
      <AddEdit user={user} />
    </>
  );
}
