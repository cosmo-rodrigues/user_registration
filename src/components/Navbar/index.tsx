// @ts-nocheck
// import { ThemeSwitcher } from './components/ThemeSwitcher';
import { HeaderContainer, HeaderContent } from './styles';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { useContext } from 'react';
import { Button, Typography } from '@mui/material';

export function Navbar() {
  const params = useLocation().pathname;
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  function shouldShowLoginButton() {
    const local = params.split('/')[1];
    if (local !== 'login') return true;
    return false;
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
        {user?.id && (
          <div>
            <Typography variant='p'>Bem vindo,</Typography>
            <Typography style={{ margin: '0 10px' }} variant='p'>
              {user.name}
            </Typography>
            <img src={user.photo} alt='avatar' />

            <Button
              variant='contained'
              color='secondary'
              style={{ marginLeft: '12px' }}
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
        )}
        {shouldShowLoginButton() && !user.id && (
          <Button
            variant='contained'
            color='secondary'
            style={{ marginLeft: 'auto' }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}
        {/* <ThemeSwitcher /> */}
      </HeaderContent>
    </HeaderContainer>
  );
}
