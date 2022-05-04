import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

// import { About } from './pages/about';
// import { Contact } from './pages/contact';
// import { PageNotFound } from './pages/404';

import { Layout } from './components/Layout';
import { Private } from './components/Privite';
import { AuthContext, AuthProvider } from './context/Auth';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

export function AppRoutes() {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <AuthProvider>
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
      </AuthProvider>
    </Layout>
  );
}
