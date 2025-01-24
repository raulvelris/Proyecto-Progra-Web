import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Login from './Login'
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login/>
  </StrictMode>,
)
