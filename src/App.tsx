import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import App from "./pages/App"
import RecuperarContraseña from "./pages/RecuperarContraseña"
import './index.css'
import Presupuestos from "./pages/Presupuestos"
import Configuracion from "./pages/Configuracion"


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
        <Route path="/presupuestos" element={<Presupuestos />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
    </Router>
  </StrictMode>
)

export default App