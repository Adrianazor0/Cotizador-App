import react from 'react';
import reactDom from 'react-dom/client';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

reactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <react.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </react.StrictMode>
);
