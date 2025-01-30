import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { obtenerGastoPorId, actualizarGasto } from "../services/GastoService"
import { GastoTipo } from "../types/GastoTipo"

function EditarGasto() {
  const { id } = useParams()
  const nav = useNavigate()
  const [dato, setDato] = useState<GastoTipo | null>(null)

  useEffect(() => {
    const numId = Number(id)
    if (!numId) {
      nav("/app/gastos")
      return
    }
    const enc = obtenerGastoPorId(numId)
    if (!enc) {
      nav("/app/gastos")
      return
    }
    setDato(enc)
  }, [id, nav])

  function cambio(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (!dato) return
    let val: string | number | boolean = e.target.value
    if (e.target.name === "monto") val = parseFloat(val as string) || 0
    if (e.target.name === "recurrente") val = (e.target as HTMLInputElement).checked
    setDato({ ...dato, [e.target.name]: val })
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (!dato) return
    actualizarGasto(dato)
    alert("Gasto actualizado")
    nav("/app/gastos")
  }

  if (!dato) {
    return <div className="container mt-4">Cargando...</div>
  }

  return (
    <div className="container mt-4">
      <h2>Editar Gasto</h2>
      <form className="row g-3" onSubmit={enviar}>
        <div className="col-md-6">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            value={dato.fecha}
            onChange={cambio}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Monto</label>
          <input
            type="number"
            name="monto"
            className="form-control"
            value={dato.monto}
            onChange={cambio}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Categoría</label>
          <select
            name="categoria"
            className="form-select"
            value={dato.categoria}
            onChange={cambio}
          >
            <option value="Alimentación">Alimentación</option>
            <option value="Servicios">Servicios</option>
            <option value="Ocio">Ocio</option>
          </select>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <label className="form-label me-2 mb-0">Recurrente</label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              name="recurrente"
              checked={dato.recurrente}
              onChange={cambio}
            />
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            name="descripcion"
            className="form-control"
            value={dato.descripcion}
            onChange={cambio}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditarGasto
