import React from "react"
import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="bg-light border-end vh-100 d-flex flex-column align-items-center" style={{ width: "220px" }}>
      <div className="text-center p-3">
        <img
          src="../src/assets/FotoMujer.jpeg"
          alt="Foto"
          className="rounded-circle"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
        <h5 className="mt-2">Jessica Straus</h5>
      </div>
      <ul className="nav flex-column w-100 px-3">
        <li className="nav-item mb-1">
          <Link to="/app/dashboard" className="nav-link">Dashboard</Link>
        </li>
        <li className="nav-item mb-1">
          <Link to="/app/expenses" className="nav-link">Gastos</Link>
        </li>
        <li className="nav-item mb-1">
          <Link to="#" className="nav-link">Presupuestos</Link>
        </li>
        <li className="nav-item mb-1">
          <Link to="#" className="nav-link">Configuración</Link>
        </li>
        <li className="nav-item mt-auto">
          <Link to="/" className="nav-link">Salir</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar

