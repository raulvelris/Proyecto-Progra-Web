// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Importa BrowserRouter y tus páginas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import App from './App'  // luego pondremos en App las rutas
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Ruta principal para login */}
        <Route path="/" element={<Login />} />

        {/* Ruta /app para todo lo demás */}
        <Route path="/app/*" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>,
)

