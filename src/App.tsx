import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import App from "./pages/App"
import RecuperarContraseña from "./pages/RecuperarContraseña"
import './index.css'
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app/*" element={<App />} />
        <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
      </Routes>
    </Router>
  </StrictMode>
)

export default App