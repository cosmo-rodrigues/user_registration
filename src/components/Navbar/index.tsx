// @ts-nocheck
// import { ThemeSwitcher } from './components/ThemeSwitcher';
import { HeaderContainer, HeaderContent } from './styles';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { useContext } from 'react';
import { Button, Typography } from '@mui/material';

export function Navbar() {
  const { storedUser } = useContext(AuthContext);

  function setUserImageAvatar() {
    if (storedUser.id) {
      return storedUser.photos[0].value;
    }

    return './favicon.png';
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <h3>EZ Record</h3>
        <nav>
          <NavLink to='/'>Serviços</NavLink>
          <NavLink to='/'>Contato</NavLink>
          <NavLink to='/'>Carreira</NavLink>
        </nav>
        {storedUser.id && (
          <div>
            <img src={setUserImageAvatar()} alt='avatar' />
            <Typography variant='p'>{storedUser.displayName}</Typography>
            <Button
              variant='contained'
              color='secondary'
              style={{ marginLeft: '12px' }}
            >
              Logout
            </Button>
          </div>
        )}
        {/* <ThemeSwitcher /> */}
      </HeaderContent>
    </HeaderContainer>
  );
}
