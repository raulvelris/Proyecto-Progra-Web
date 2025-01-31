import React, { useState } from 'react';
import { getConfiguracion, actualizarConfiguracion } from '../services/ConfiguracionService';
import { ConfiguracionTipo } from '../types/ConfiguracionTipo';
import EditarPerfilModal from './EditarPerfilModal';

const Configuracion: React.FC = () => {
    const [configuracion, setConfiguracion] = useState<ConfiguracionTipo>(getConfiguracion());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = (configuracionActualizada: ConfiguracionTipo) => {
        actualizarConfiguracion(configuracionActualizada);
        setConfiguracion(configuracionActualizada);
        closeModal();
    };

    return (
        <div className="container mt-4">
            <h1>Configuración</h1>
            <p>Aquí puedes ajustar tus preferencias y configuraciones.</p>
            <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <p>{configuracion.nombre}</p>
            </div>
            <div className="mb-3">
                <label className="form-label">Email:</label>
                <p>{configuracion.email}</p>
            </div>
            <div className="mb-3">
                <label className="form-label">Contraseña:</label>
                <p>{configuracion.password}</p>
            </div>
            <button className="btn btn-primary" onClick={openModal}>Editar Perfil</button>
            {isModalOpen && (
                <EditarPerfilModal
                    configuracion={configuracion}
                    closeModal={closeModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default Configuracion;