import { AppThemeProvider } from './themes/AppThemeProvider';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store, { persistor } from './app/store';
import React from 'react';
import App from './App';
import './main.css';
import { PersistGate } from 'redux-persist/integration/react';
import './i18n'; // Import i18n configuration
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppThemeProvider>
          <GoogleOAuthProvider
            clientId={
              import.meta.env.GOOGLE_API_KEY ??
              '497829239889-4m7elvq3trp2tu5e0890j0rdq6mvabea.apps.googleusercontent.com'
            }
          >
            <App />
          </GoogleOAuthProvider>
        </AppThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
