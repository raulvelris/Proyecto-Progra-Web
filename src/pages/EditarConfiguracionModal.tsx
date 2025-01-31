import React, { useState } from 'react';
import { UsuarioAutenticado } from '../types/Configuracion';
import { actualizarUsuario } from '../services/ConfiguracionService';

interface EditarConfiguracionModalProps {
    usuario: UsuarioAutenticado;
    onClose: () => void;
    onUsuarioUpdated: (usuario: UsuarioAutenticado) => void;
}

const EditarConfiguracionModal: React.FC<EditarConfiguracionModalProps> = ({ usuario, onClose, onUsuarioUpdated }) => {
    const [formData, setFormData] = useState<UsuarioAutenticado>(usuario);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await actualizarUsuario(formData);
            onUsuarioUpdated(formData);
            alert('Usuario actualizado con éxito');
        } catch (error) {
            alert('Error al actualizar el usuario');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <button type="submit">Actualizar</button>
                </form>
            </div>
        </div>
    );
};

export default EditarConfiguracionModal;