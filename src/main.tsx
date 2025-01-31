import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import App from "./pages/App"
import RecuperarContraseña from "./pages/RecuperarContraseña"
import Users from "./pages/Users"
import Presupuestos from "./pages/Presupuestos"
import Dashboard from "./pages/Dashboard"
import './index.css'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app/*" element={<App />} />
        <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
        <Route path="/users" element={<Users />} />
        <Route path="/presupuestos" element={<Presupuestos />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </StrictMode>
)