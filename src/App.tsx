import { Routes, Route, Navigate } from "react-router-dom";
import SidebarUsuario from "./components/SidebarUsuario";
import Presupuestos from "./pages/Presupuesto";
import EditarConfiguracion from "./pages/EditarConfiguracion";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="d-flex">
      <SidebarUsuario />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Navigate to="/app/presupuestos" />} />
          <Route path="presupuestos" element={<Presupuestos />} />
          <Route path="configuracion" element={<EditarConfiguracion />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;