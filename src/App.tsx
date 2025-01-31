import { Routes, Route} from "react-router-dom";
import BarraLateral from "./components/BarraLateral";
import Presupuestos from "./pages/Presupuesto";
import Configuracion from "./pages/Configuracion";
import Gastos from "./pages/Gastos"
import Dashboard from "./pages/Tablas"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="d-flex">
      <BarraLateral/>
      <div className="flex-grow-1">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="gastos" element={<Gastos />} />
          <Route path="presupuestos" element={<Presupuestos />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;