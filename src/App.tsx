import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AppRoutes } from './AppRoutes';

import { history } from './helpers/history';

import { GlobalStyle } from './styles/global';
import { useContext } from 'react';
import { ThemeContext } from './context/Theme';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <HistoryRouter history={history}>
        <AppRoutes />
      </HistoryRouter>
    </ThemeProvider>
  );
}

export default App;
