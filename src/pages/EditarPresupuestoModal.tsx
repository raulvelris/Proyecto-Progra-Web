import React, { useState } from "react"
import { actualizarPresupuesto } from "../services/PresupuestoService"
import { PresupuestoTipo } from "../types/PresupuestoTipo"

interface EditarPresupuestoModalProps {
    presupuesto: PresupuestoTipo
    closeModal: () => void
    onSave: () => void
}

const EditarPresupuestoModal: React.FC<EditarPresupuestoModalProps> = ({ presupuesto, closeModal, onSave }) => {
    const [presupuestoData, setPresupuestoData] = useState<PresupuestoTipo>(presupuesto)

    function handleChange(p: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = p.target
        setPresupuestoData(prev => ({ ...prev, [name]: value }))
    }

    function handleSubmit(p: React.FormEvent) {
        p.preventDefault()
        actualizarPresupuesto(presupuestoData)
        alert("Presupuesto actualizado correctamente")
        onSave()
        closeModal()
    }

    return (
        <div className="modal fade show d-flex align-items-center justify-content-center"
             style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", minHeight: "100vh" }}
             aria-modal="true" role="dialog">
          <div className="modal-dialog" style={{ maxWidth: "450px", width: "100%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title mx-auto">Editar presupuesto</h5>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <select 
                       value={presupuestoData.categoria} 
                     className="form-select" 
                      name="categoria" 
                      onChange={handleChange}>
                      <option value="Ocio">Ocio</option>
                      <option value="Servicios">Servicios</option>
                      <option value="Alimentación">Alimentación</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Monto</label>
                    <input
                      type="number"
                      name="monto"
                      className="form-control"
                      value={presupuestoData.monto}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">Aceptar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}

export default EditarPresupuestoModal