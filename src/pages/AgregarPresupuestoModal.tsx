import React, { useState } from "react"
import { agregarPresupuesto } from "../services/PresupuestoService"
import { PresupuestoTipo } from "../types/PresupuestoTipo"

interface AgregarPresupuestoModalProps {
    closeModal: () => void
    onSave: () => void
}

const AgregarPresupuestoModal: React.FC<AgregarPresupuestoModalProps> = ({ closeModal, onSave }) => {
    const [presupuesto, setPresupuesto] = useState<PresupuestoTipo>({
        id: 0,
        categoria: "",
        monto: 0
    })

    function handleChange(p: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = p.target
        setPresupuesto(prev => ({ ...prev, [name]: value }))
    }

    function handleSubmit(p: React.FormEvent) {
        p.preventDefault()
        agregarPresupuesto(presupuesto)
        alert("Presupuesto agregado correctamente")
        onSave()
        closeModal()
    }

    return (
        <div className="modal fade show d-flex align-items-center justify-content-center"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", minHeight: "100vh" }} aria-modal="true" role="dialog">
            <div className="modal-dialog" style={{ maxWidth: "450px", width: "100%" }}>
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center w-100">
                        <h5 className="modal-title">Agregar Presupuesto</h5>
                        <button type="button" className="close" onClick={closeModal}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="categoria">Categoría</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="categoria"
                                    name="categoria"
                                    value={presupuesto.categoria}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="monto">Monto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="monto"
                                    name="monto"
                                    value={presupuesto.monto}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgregarPresupuestoModal

