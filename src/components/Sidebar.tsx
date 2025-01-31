import React from "react";
import { FaUserFriends, FaTachometerAlt, FaHistory, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar: React.FC = () => {
    return (
        <div className="d-flex flex-column bg-light p-3 vh-100" style={{ width: "250px" }}>
            <div className="text-center mb-4">
                <img
                    src="https://via.placeholder.com/100"
                    alt="User Avatar"
                    className="rounded-circle mb-2"
                    style={{ width: "100px" }}
                />
                <h5 className="mb-0">Jessica Straus</h5>
            </div>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a href="#dashboard" className="nav-link text-dark">
                        <FaTachometerAlt className="me-2" />
                        Dashboard
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#usuarios" className="nav-link text-dark active">
                        <FaUserFriends className="me-2" />
                        Usuarios
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#historial" className="nav-link text-dark">
                        <FaHistory className="me-2" />
                        Historial
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#configuracion" className="nav-link text-dark">
                        <FaCog className="me-2" />
                        Configuración
                    </a>
                </li>
                <li className="nav-item mt-auto">
                    <a href="#salir" className="nav-link text-danger">
                        <FaSignOutAlt className="me-2" />
                        Salir
                    </a>
                </li>
            </ul>
        </div>
  );
};

export default Sidebar;