import { ConfiguracionTipo } from "../types/ConfiguracionTipo";

let configuracion: ConfiguracionTipo = {
    id: 1,
    nombre: "Lionel Messi",
    email: "lionel.messi@example.com",
    password: "password123"
};

export function getConfiguracion(): ConfiguracionTipo {
    return configuracion;
}

export function actualizarConfiguracion(configuracionActualizada: ConfiguracionTipo): void {
    configuracion = configuracionActualizada;
}