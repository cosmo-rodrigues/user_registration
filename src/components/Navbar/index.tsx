import { useContext, useState } from 'react';
import {
  AppBar,
  Avatar,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';

const pages = [
  {
    title: 'Serviços',
    link: '/services',
  },
  {
    title: 'Contato',
    link: '/contact',
  },
  {
    title: 'Carreira',
    link: '/career',
  },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const params = useLocation().pathname;
  const navigate = useNavigate();

  function shouldShowLoginButton() {
    const local = params.split('/')[1];
    if (local !== 'login') return true;
    return false;
  }

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (route: string) => {
    navigate(route);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Link to='/' style={{ color: '#fff', textDecoration: 'none' }}>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              EZ Record
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => handleCloseNavMenu('/')}>
                <Typography textAlign='center'>EZ Record</Typography>
              </MenuItem>
              {pages.map((page) => (
                <MenuItem
                  key={page.link}
                  onClick={() => handleCloseNavMenu(page.link)}
                >
                  <Typography textAlign='center'>{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => handleCloseNavMenu(page.link)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {user.id ? (
            <Box
              sx={{ flexGrow: 0 }}
              style={{ alignItems: 'center', display: 'flex' }}
            >
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Typography variant='subtitle2'>Olá,</Typography>
                <Typography style={{ margin: '0 10px' }} variant='subtitle2'>
                  {user.name}
                </Typography>
              </Box>
              <Tooltip title='Detalhes'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='avatar' src={user.photo} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Button
                variant='contained'
                color='error'
                style={{ marginLeft: '12px' }}
                onClick={() => logout()}
              >
                SAIR
              </Button>
            </Box>
          ) : (
            <Typography variant='subtitle2'>Olá visitante</Typography>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
