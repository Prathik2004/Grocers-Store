import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './context/CartContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="75745422358-40jna83pgu1fmtp2kquv7iufbo0rs7kk.apps.googleusercontent.com">
    <CartProvider>
    <App />
    </CartProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
