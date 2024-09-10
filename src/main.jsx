import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Styles
import '../styles/main.scss';
// import '@styles';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
