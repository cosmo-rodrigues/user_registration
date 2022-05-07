import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

// import { About } from './pages/about';
// import { Contact } from './pages/contact';
// import { PageNotFound } from './pages/404';

import { Layout } from './components/Layout';
import { Private } from './components/Private';
import { AuthContext } from './context/Auth';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { loginService } from './services/login';

const toastLoginId = 'af40tq3egq3';

export function AppRoutes() {
  const { user, handleUserData } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await (await loginService.signInSocial()).data;
        handleUserData(result.user);
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
            <Private user={user}>
              <Home />
            </Private>
          }
        />
        {/* <Route path='/about' element={<About />} /> */}
        {/* <Route path='/services' element={<Services />} /> */}
        {/* <Route path='/contact' element={<Contact />} /> */}
        {/* <Route element={<PageNotFound />} /> */}
      </Routes>
      <ToastContainer />
    </Layout>
  );
}
