import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <LoginPage/> */}
    <RegisterPage/>
  </StrictMode>,
)
