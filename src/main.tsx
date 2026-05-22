import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { ErrorProvider } from './utils/ErrorDisplay.tsx';
import { UserProvider } from "./utils/UserContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ErrorProvider>
  </StrictMode>
);