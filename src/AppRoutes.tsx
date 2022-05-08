import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { Layout } from './components/Layout';
import { Private } from './components/Private';
import { AuthContext } from './context/Auth';
import { Account } from './pages/Account';
import { Career } from './pages/Career';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Services } from './pages/Services';
import { SignUp } from './pages/SignUp';
import { loginService } from './services/login';

const toastLoginId = 'af40tq3egq3';

export function AppRoutes() {
  const navigate = useNavigate();
  const { handleUserData } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await (await loginService.signInSocial()).data;
        handleUserData(result.user);
        navigate('/');
      } catch (error: any) {
        toast.error('Usuário não encontrado', {
          autoClose: 3000,
          toastId: toastLoginId,
        });
      }
    };
    getUser();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route
          caseSensitive
          path='/'
          element={
            <Private>
              <Home />
            </Private>
          }
        />
        <Route
          path='/services'
          element={
            <Private>
              <Services />
            </Private>
          }
        />
        <Route path='/contact' element={<Contact />} />
        <Route path='/career' element={<Career />} />
        <Route
          path='/profile'
          element={
            <Private>
              <Profile />
            </Private>
          }
        />
        <Route
          path='/account'
          element={
            <Private>
              <Account />
            </Private>
          }
        />
      </Routes>
      <ToastContainer />
    </Layout>
  );
}
