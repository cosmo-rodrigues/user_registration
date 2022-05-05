import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// import { About } from './pages/about';
// import { Contact } from './pages/contact';
// import { PageNotFound } from './pages/404';

import { Layout } from './components/Layout';
import { Private } from './components/Private';
import { AuthContext } from './context/Auth';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

export function AppRoutes() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const getUser = () => {
      fetch('https://registration-user-api.herokuapp.com/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error('Falha na autenticação');
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
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
    </Layout>
  );
}
