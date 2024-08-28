import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Web3ContextProvider } from './lib/components/WebContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Web3ContextProvider>
     <App />
    </Web3ContextProvider>
  </StrictMode>
);
