import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserThemeProvider } from './context/Theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserThemeProvider>
      <App />
    </UserThemeProvider>
  </React.StrictMode>
);
