import { Routes, Route } from "react-router-dom"
import BarraLateral from "../components/BarraLateral"
import Gastos from "./Gastos"
//import EditarGasto from "../components/EditarGasto"
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
        </Routes>
      </div>
    </div>
  )
}

export default App
