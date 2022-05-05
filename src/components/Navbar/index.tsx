// @ts-nocheck
// import { ThemeSwitcher } from './components/ThemeSwitcher';
import { HeaderContainer, HeaderContent } from './styles';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { useContext } from 'react';
import { Button, Typography } from '@mui/material';

export function Navbar() {
  const params = useLocation().pathname;
  const { storedUser, logout } = useContext(AuthContext);

  function shouldShowLoginButton() {
    const local = params.split('/')[1];
    if (local !== 'login') return true;
    return false;
  }

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
            <Typography variant='p'>Bem vindo,</Typography>
            <Typography style={{ margin: '0 10px' }} variant='p'>
              {storedUser.name.givenName}
            </Typography>
            <img src={setUserImageAvatar()} alt='avatar' />

            <Button
              variant='contained'
              color='secondary'
              style={{ marginLeft: '12px' }}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        )}
        {shouldShowLoginButton() && !storedUser.id && (
          <Button
            variant='contained'
            color='secondary'
            style={{ marginLeft: '12px' }}
            onClick={logout}
          >
            Login
          </Button>
        )}
        {/* <ThemeSwitcher /> */}
      </HeaderContent>
    </HeaderContainer>
  );
}
