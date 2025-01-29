import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import RecuperarContraseña from './pages/RecuperarContraseña';
import EgresosxFecha from './pages/EgresosxFecha';

//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
        <Route path="/egresosxfecha" element={<EgresosxFecha />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);