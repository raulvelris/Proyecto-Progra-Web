// EditarGastoModal.tsx (nuevo componente modal)
import React, { useEffect, useState } from "react"
import { GastoTipo } from "../types/GastoTipo"
import { obtenerGastoPorId, actualizarGasto } from "../services/GastoService"

interface Props {
  id: number | null
  onClose: () => void
  onUpdate: () => void
}

function EditarGasto({ id, onClose, onUpdate }: Props) {
  const [dato, setDato] = useState<GastoTipo | null>(null)
  
  useEffect(() => {
    if (!id) return
    
    const cargarDatos = () => {
      const enc = obtenerGastoPorId(id)
      if (!enc) {
        onClose()
        return
      }
      setDato(enc)
    }
    
    cargarDatos()
  }, [id, onClose])

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
    onUpdate()
    onClose()
  }

  if (!id || !dato) return null

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <button className="cerrar-modal" onClick={onClose}>&times;</button>
        
        <h2>Editar Gasto</h2>
        <form className="row g-3" onSubmit={enviar}>
          {/* Mantenemos todo el formulario original */}
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
          
          {/* Campo de Monto */}
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

        {/* Selector de Categoría */}
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

        {/* Checkbox Recurrente */}
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

        {/* Campo de Descripción */}
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
    </div>
  )
}

export default EditarGasto