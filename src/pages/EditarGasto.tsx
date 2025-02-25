import React, { useEffect, useState } from "react"
import { obtenerGastoPorId } from "../services/GastoService"

interface GastoTipo {
  id: number
  fecha: string
  monto: number
  categoria: string
  recurrente: boolean
  descripcion: string
}

interface Props {
  id: number | null
  onClose: () => void
  onUpdate: () => void
}

function EditarGasto({ id, onClose, onUpdate }: Props) {
  const [dato, setDato] = useState<GastoTipo | null>(null)

  useEffect(() => {
    if (!id) return
    
    const cargarDatos = async () => {
      try {
        const enc = await obtenerGastoPorId(id)
        if (!enc) {
          onClose()
          return
        }
        setDato(enc)
      } catch (error) {
        console.error("Error al obtener el gasto:", error)
        onClose()
      }
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

  async function enviar() {
    if (!dato) return
    try {
      await fetch("http://localhost:5000/edit-expenses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dato)
      })
      onUpdate()
      onClose()
    } catch (error) {
      console.error("Error al actualizar el gasto:", error)
    }
  }

  if (!id || !dato) return null

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <button className="cerrar-modal" onClick={onClose}>&times;</button>
        <h2>Editar Gasto</h2>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Fecha</label>
            <input type="date" name="fecha" className="form-control" value={dato.fecha} onChange={cambio} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Monto</label>
            <input type="number" name="monto" className="form-control" value={dato.monto} onChange={cambio} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Categoría</label>
            <select name="categoria" className="form-select" value={dato.categoria} onChange={cambio}>
              <option value="Servicios">Servicios</option>
              <option value="Alimentación">Alimentación</option>
              <option value="Ocio">Ocio</option>
              <option value="Comida">Comida</option>
              <option value="Transporte">Transporte</option>
              <option value="Salud">Salud</option>
              <option value="Entretenimiento">Entretenimiento</option>
              <option value="Estudios">Estudios</option>
              <option value="Regalos">Regalos</option>
            </select>
          </div>

          <div className="col-md-6 d-flex align-items-center">
            <label className="form-label me-2 mb-0">Recurrente</label>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" name="recurrente" checked={dato.recurrente} onChange={cambio} />
            </div>
          </div>

          <div className="col-12">
            <label className="form-label">Descripción</label>
            <input type="text" name="descripcion" className="form-control" value={dato.descripcion} onChange={cambio} />
          </div>
          
          <div className="col-12">
            <button type="button" className="btn btn-primary" onClick={enviar}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarGasto
