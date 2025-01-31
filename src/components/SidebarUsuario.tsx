import React from "react";
import { FaUsers, FaHistory, FaCog, FaSignOutAlt } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const SidebarUsuario: React.FC = () => {
    return (
        <div className="d-flex flex-column bg-light p-3 vh-100" style={{ width: "250px" }}>
            <div className="text-center mb-4">
                <Image
                    src="https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/45843.png&w=350&h=254"
                    alt="User Avatar"
                    className="rounded-circle mb-2"
                    style={{ width: "100px" }}
                />
                <h5 className="mb-0">Lionel Messi</h5>
            </div>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <LinkContainer to="/app/dashboard">
                        <a className="nav-link text-dark">
                            <VscGraph className="me-2" />
                            Dashboard
                        </a>
                    </LinkContainer>
                </li>
                <li className="nav-item">
                    <LinkContainer to="/app/gastos">
                        <a className="nav-link text-dark">
                            <FaUsers className="me-2" />
                            Gastos
                        </a>
                    </LinkContainer>
                </li>
                <li className="nav-item">
                    <LinkContainer to="/app/presupuestos">
                        <a className="nav-link text-dark">
                            <FaHistory className="me-2" />
                            Presupuestos
                        </a>
                    </LinkContainer>
                </li>
                <li className="nav-item">
                    <LinkContainer to="/app/configuracion">
                        <a className="nav-link text-dark">
                            <FaCog className="me-2" />
                            Configuración
                        </a>
                    </LinkContainer>
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

export default SidebarUsuario;