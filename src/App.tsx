import { Routes, Route, Navigate } from "react-router-dom";
import SidebarUsuario from "./components/SidebarUsuario";
import Presupuestos from "./pages/Presupuesto";
import Configuracion from "./pages/Configuracion";
import Gastos from "./pages/Gastos"
import EditarGasto from "./pages/EditarGasto"
import Dashboard from "./pages/Tablas"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="d-flex">
      <SidebarUsuario />
      <div className="flex-grow-1">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="gastos" element={<Gastos />} />
          <Route path="gastos/editar/:id" element={<EditarGasto />} />
          <Route path="presupuestos" element={<Presupuestos />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;