import React from "react"
import { Routes, Route } from "react-router-dom"
import BarraLateral from "./components/BarraLateral"
import Gastos from "./pages/Gastos"
import EditarGasto from "./pages/EditarGasto"
import Dashboard from "./pages/Tablas"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="d-flex">
      <BarraLateral />
      <div className="flex-grow-1">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="gastos" element={<Gastos />} />
          <Route path="gastos/editar/:id" element={<EditarGasto />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
