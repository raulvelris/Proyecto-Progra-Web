import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import App from "./pages/App"
import RecuperarContraseña from "./pages/RecuperarContraseña"
import Users from "./pages/Users"

import Dashboard from "./pages/Dashboard"
import './index.css'
import Presupuestos from "./pages/Presupuestos"
import Configuracion from "./pages/Configuracion"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app/*" element={<App />} />
        <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
        <Route path="/users" element={<Users />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/app/presupuestos" element={<Presupuestos />} />
        <Route path="/app/configuracion" element={<Configuracion />} />
      </Routes>
    </Router>
  </StrictMode>
)