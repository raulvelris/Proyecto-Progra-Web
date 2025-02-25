import { GastoTipo } from "../types/GastoTipo"

let lista: GastoTipo[] = [
  {
    id: 1,
    fecha: "2025-01-10",
    monto: 500,
    categoria: "Alimentación",
    descripcion: "Compra supermercado",
    recurrente: false
  },
  {
    id: 2,
    fecha: "2025-01-15",
    monto: 2000,
    categoria: "Servicios",
    descripcion: "Pago de luz",
    recurrente: true
  }
]

export function obtenerGastos(): GastoTipo[] {
  return lista
}

export function obtenerGastoPorId(id: number): GastoTipo | undefined {
  return lista.find(x => x.id === id)
}

export function actualizarGasto(g: GastoTipo): void {
  lista = lista.map(e => e.id === g.id ? g : e)
}

export function crearGasto(nuevo: GastoTipo): void {
  const nuevoId = lista.length > 0 ? Math.max(...lista.map(e => e.id)) + 1 : 1
  nuevo.id = nuevoId
  lista.push(nuevo)
}

export function eliminarGasto(id: number): void {
  lista = lista.filter(x => x.id !== id)
}