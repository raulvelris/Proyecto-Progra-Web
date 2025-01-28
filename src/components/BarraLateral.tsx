import React from "react"
import { Link } from "react-router-dom"
import "./BarraLateral.css"

function BarraLateral() {
  return (
    <div className="bg-light border-end vh-100 d-flex flex-column sidebar-width">
      <div className="text-center p-4">
        <img
          src="../assets/FotoMujer.jpeg"
          alt="Foto"
          className="rounded-circle"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
        <h5 className="mt-2">Jessica Straus</h5>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/app/dashboard" className="nav-link px-4">
            <i className="bi bi-bar-chart-fill me-2"></i>Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/app/gastos" className="nav-link px-4">
            <i className="bi bi-wallet2 me-2"></i>Gastos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link px-4">
            <i className="bi bi-cash-stack me-2"></i>Presupuestos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link px-4">
            <i className="bi bi-gear me-2"></i>Configuración
          </Link>
        </li>
        <li className="nav-item mt-auto">
          <Link to="/" className="nav-link px-4">
            <i className="bi bi-box-arrow-left me-2"></i>Salir
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default BarraLateral
