import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, Image } from "react-bootstrap";
import { VscGraph } from "react-icons/vsc";
import { FaUsers, FaHistory, FaCog, FaSignOutAlt } from "react-icons/fa";

const Barra: React.FC = () => {
  return (
    <div className="sidebar d-flex flex-column p-3">
      <Image
        src="https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/45843.png&w=350&h=254"
        roundedCircle
        className="mb-3"
      />
      <h5 className="text-center">Lionel Messi</h5>
      <ListGroup variant="flush">

      <ListGroup.Item
          as={Link} to="/appadmin/dashboard"
          action
          className="text-secondary d-flex align-items-center">
          <VscGraph /> Dashboard
      </ListGroup.Item>


      <ListGroup.Item
        as={Link} to="/appadmin/usuarios"
        action
        className="text-muted d-flex align-items-center">
        <FaUsers /> Usuarios
      </ListGroup.Item>

      
      <ListGroup.Item
        as={Link} to="/appadmin/historial"
        action
        className="text-secondary d-flex align-items-center">
        <FaHistory /> Historial
      </ListGroup.Item>

      <ListGroup.Item
        as={Link} to="/appadmin/configuracion"
        action
        className="text-muted d-flex align-items-center">
        <FaCog /> Configuracion
      </ListGroup.Item>
        
      <ListGroup.Item
        as={Link}
        to="/"
        action
        className="text-muted salir-item d-flex align-items-center"
        onClick={() => {
          localStorage.removeItem("user");
          console.log("Saliendo...");
          // navigate('/');
        }}>
        <FaSignOutAlt /> Salir
      </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Barra;
