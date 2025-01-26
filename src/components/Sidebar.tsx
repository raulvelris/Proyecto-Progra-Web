import React from "react";
import { Link } from "react-router-dom";
import FotoMujer from "../assets/FotoMujer.jpeg"; // o tu imagen

const Sidebar: React.FC = () => {
  return (
    <div className="bg-light border-end vh-100" style={{ width: "220px" }}>
      <div className="text-center p-3">
        <img
          src={FotoMujer} 
          alt="Foto Jessica"
          className="rounded-circle mb-2"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
        <h5>Jessica Straus</h5>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/app/dashboard" className="nav-link">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/app/expenses" className="nav-link">Gastos</Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link">Presupuestos</Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link">Configuración</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">Salir</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

