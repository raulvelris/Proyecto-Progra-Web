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
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", minHeight: "100vh" }} aria-modal="true" role="dialog">
            <div className="modal-dialog" style={{ maxWidth: "450px", width: "100%" }}>
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center w-100">
                        <h4 className="modal-title">Editar Presupuesto</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            
                            <div className="mb-3 d-flex align-items-center">
                                <label className="form-label me-3 ms-2" style={{ minWidth: "120px" }}>Monto</label>
                                <input
                                    type="number"
                                    name="monto"
                                    className="form-control"
                                    style={{ width: "200px" }}
                                    value={presupuestoData.monto}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-secondary mx-3" onClick={closeModal}>Cancelar</button>
                            <button type="submit" className="btn btn-primary mx-3">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditarPresupuestoModal