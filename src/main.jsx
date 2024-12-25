import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import ThemeProvider from './provider/ThemeProvider'
import AuthProvider from './provider/AuthProvider'
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </HelmetProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
