import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import App from "./pages/Users"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/app/*" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>
)
