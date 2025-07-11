import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { router } from './app/router/Router';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" hideProgressBar theme="colored" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
