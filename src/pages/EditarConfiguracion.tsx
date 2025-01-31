import React, { useState, useEffect } from 'react';
import { UsuarioAutenticado } from '../types/Configuracion';
import EditarConfiguracionModal from './EditarConfiguracionModal';

const EditarConfiguracion: React.FC = () => {
    const [usuario, setUsuario] = useState<UsuarioAutenticado | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Aquí deberías obtener los datos del usuario autenticado
        const fetchUsuario = async () => {
            const response = await fetch('/api/usuario-autenticado');
            const data = await response.json();
            setUsuario(data);
        };

        fetchUsuario();
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUsuarioUpdated = (updatedUsuario: UsuarioAutenticado) => {
        setUsuario(updatedUsuario);
        setIsModalOpen(false);
    };

    if (!usuario) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Configuración del Usuario</h1>
            <p>Nombre: {usuario.nombre}</p>
            <p>Email: {usuario.email}</p>
            <button onClick={handleOpenModal}>Editar</button>
            {isModalOpen && (
                <EditarConfiguracionModal
                    usuario={usuario}
                    onClose={handleCloseModal}
                    onUsuarioUpdated={handleUsuarioUpdated}
                />
            )}
        </div>
    );
};

export default EditarConfiguracion;