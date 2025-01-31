import { UsuarioAutenticado } from '../types/Configuracion';

export const actualizarUsuario = async (usuario: UsuarioAutenticado): Promise<void> => {
    const response = await fetch(`/api/usuarios/${usuario.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
    }
};