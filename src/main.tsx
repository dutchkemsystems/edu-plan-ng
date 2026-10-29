import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LowDataProvider } from './lib/LowDataContext.tsx';

createRoot(document.getElementById('root')!).render(
  <LowDataProvider>
    <App />
  </LowDataProvider>
);
