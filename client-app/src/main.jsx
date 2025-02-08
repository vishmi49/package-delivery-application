import { Auth0Provider } from '@auth0/auth0-react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import './index.css';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider 
     domain={domain}
     clientId={clientId}
     authorizationParams={{
      redirect_uri: redirectUri
    }}
    >
     <App />
    </Auth0Provider>
  </StrictMode>
);