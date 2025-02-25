import React, { useState } from "react"
import { ListadoPresupuestoItem, Categoria } from "./Presupuestos"

interface EditarPresupuestoModalProps {
    presupuesto: ListadoPresupuestoItem
    closeModal: () => void
    onSave: (presupuesto: ListadoPresupuestoItem) => void
    categorias: Categoria[]
}

const EditarPresupuestoModal: React.FC<EditarPresupuestoModalProps> = ({ presupuesto, closeModal, onSave, categorias }) => {
    const [presupuestoData, setPresupuestoData] = useState<ListadoPresupuestoItem>(presupuesto)

    function handleChange(p: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = p.target
        setPresupuestoData(prev => ({ ...prev, [name]: value }))
    }

    function handleSubmit(p: React.FormEvent) {
        p.preventDefault()
        onSave(presupuestoData)
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
                       value={presupuestoData.category_id} 
                     className="form-select" 
                      name="category_id" 
                      onChange={handleChange}>
                      {categorias.map(categoria => (
                          <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Monto</label>
                    <input
                      type="number"
                      name="monthly_budget"
                      className="form-control"
                      value={presupuestoData.monthly_budget}
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