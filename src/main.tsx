import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ConfirmationPage from './pages/ConfirmationPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PruebaPage from './pages/PruebaPage'
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/prueba" element={<PruebaPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
