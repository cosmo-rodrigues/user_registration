import { useContext } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Container,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as NavigateLink, useNavigate } from 'react-router-dom';
import { loginService } from '../../services/login';
import { AuthContext } from '../../context/Auth';
import { toast } from 'react-toastify';

const theme = createTheme();

export function LoginForm() {
  const { handleUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userCredentials = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      // @ts-ignore
      const result = await (await loginService.signIn(userCredentials)).data;
      if (result.user) {
        handleUserData(result.user);
        localStorage.setItem('@ezrecord/user', JSON.stringify(result.user));
        localStorage.setItem('@ezrecord/token', JSON.stringify(result.token));
        return navigate('/');
      }
    } catch (error) {
      toast.error('Falha ao tentar logar', { autoClose: 5000 });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Senha'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Grid item xs>
              <Link href='#' variant='body2'>
                Esqueceu sua senha?
              </Link>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                Ainda não tem uma conta?{' '}
                <NavigateLink to='/sign-up'>Cadastre-se</NavigateLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
