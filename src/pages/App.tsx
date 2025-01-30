import { Routes, Route } from "react-router-dom"
import BarraLateral from "../components/BarraLateral"
import Gastos from "../components/Gastos"
import EditarGasto from "../components/EditarGasto"
import Dashboard from "./Tablas"
import "bootstrap/dist/css/bootstrap.min.css"

const App: React.FC = () => {
  return (
    <div className="d-flex">
      <BarraLateral />
      <div className="w-100 p-3">
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
