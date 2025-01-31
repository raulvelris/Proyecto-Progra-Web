import { useState } from "react";
import ModalAddGasto from "./ModalAddGasto";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"; // Importar Bootstrap

const PruebaPage = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const addGasto = () => {
        setShowModal(true);
    }

    return <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-dark">
        <button className="btn btn-primary" type="button" onClick={addGasto}>Agregar</button>
        <ModalAddGasto showModal={showModal} closeModal={() => {
            setShowModal(false)
        }}/>
    </div>
}

export default PruebaPage;