import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './middelwares/AuthContext';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      {/* <CookiesProvider> */}
    <AuthProvider>

    <App />
    </AuthProvider>
      {/* </CookiesProvider> */}

  </React.StrictMode>
);


reportWebVitals();
