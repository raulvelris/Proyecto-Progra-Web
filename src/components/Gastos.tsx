import { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { obtenerGastos, eliminarGasto } from "../services/GastoService"
import { GastoTipo } from "../types/GastoTipo"
import FiltroGastos from "./FiltroGastos"

function Gastos() {
  const [lista, setLista] = useState<GastoTipo[]>([])
  const [filtroCategoria, setFiltroCategoria] = useState("")
  const [filtroFecha, setFiltroFecha] = useState("")
  const [filtroMonto, setFiltroMonto] = useState<number | null>(null)
  const [filtroRec, setFiltroRec] = useState("")

  useEffect(() => {
    setLista(obtenerGastos())
  }, [])

  const datosFiltrados = useMemo(() => {
    return lista.filter(g => {
      const catOk = !filtroCategoria || g.categoria === filtroCategoria
      const fechaOk = !filtroFecha || g.fecha === filtroFecha
      const montoOk = filtroMonto === null || g.monto === filtroMonto
      let recOk = true
      if (filtroRec === "si") recOk = g.recurrente === true
      if (filtroRec === "no") recOk = g.recurrente === false
      return catOk && fechaOk && montoOk && recOk
    })
  }, [lista, filtroCategoria, filtroFecha, filtroMonto, filtroRec])

  function borrar(id: number) {
    if (window.confirm("¿Eliminar este gasto?")) {
      eliminarGasto(id)
      setLista(obtenerGastos())
    }
  }

  return (
    <div className="container mt-4">
      <h2>Mis Gastos</h2>
      <div className="d-flex justify-content-between align-items-center my-3">
        <FiltroGastos
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
          filtroFecha={filtroFecha}
          setFiltroFecha={setFiltroFecha}
          filtroMonto={filtroMonto}
          setFiltroMonto={setFiltroMonto}
          filtroRec={filtroRec}
          setFiltroRec={setFiltroRec}
        />
        <button className="btn btn-primary">+ Agregar</button>
      </div>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Recurrente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map(g => (
            <tr key={g.id}>
              <td>{g.fecha}</td>
              <td>{g.monto}</td>
              <td>{g.categoria}</td>
              <td>{g.descripcion}</td>
              <td>{g.recurrente ? "Sí" : "No"}</td>
              <td>
                <Link to={`/app/gastos/editar/${g.id}`} className="btn btn-warning btn-sm me-2">
                  <i className="bi bi-pencil-square"></i>
                </Link>
                <button onClick={() => borrar(g.id)} className="btn btn-danger btn-sm">
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          {datosFiltrados.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">No hay registros</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Gastos
