import { PresupuestoTipo } from "../types/PresupuestoTipo"; 

let listapresupuesto: PresupuestoTipo[] = [
    {id: 1, categoria: "Ocio", monto: 129.99},
    {id: 2, categoria: "Servicios", monto: 129.99},
    {id: 3, categoria: "Alimentacion", monto: 129.99},
]

export function getPresupuestos() : PresupuestoTipo[] {
    return listapresupuesto;
}

export function actualizarPresupuesto(presupuestoActualizado: PresupuestoTipo): void {
    listapresupuesto = listapresupuesto.map(p => p.id === presupuestoActualizado.id ? presupuestoActualizado : p)
}

export function agregarPresupuesto(nuevoPresupuesto: PresupuestoTipo): void {
    const nuevoPresupuestoId = listapresupuesto.length > 0 ? Math.max(...listapresupuesto.map(p => p.id)) + 1 : 1
    nuevoPresupuesto.id = nuevoPresupuestoId
    listapresupuesto.push(nuevoPresupuesto)
}

export function eliminarPresupuesto(id: number): void {
    listapresupuesto = listapresupuesto.filter(p => p.id !== id)
}

