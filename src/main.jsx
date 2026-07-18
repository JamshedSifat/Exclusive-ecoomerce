import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { RouterProvider } from "react-router";
import { router } from './Router/routing.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { CartProvider } from './Context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
    
   </AuthProvider>
  </StrictMode>,
)
