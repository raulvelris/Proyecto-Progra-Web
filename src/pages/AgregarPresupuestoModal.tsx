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
        onSave()
        closeModal()
    }

    return (
        <div className="modal fade show d-flex align-items-center justify-content-center"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", minHeight: "100vh" }} 
            aria-modal="true" role="dialog">
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "450px", width: "100%" }}>
                <div className="modal-content p-3">
                    {/* Título */}
                    <div className="modal-header border-0 text-center">
                        <h5 className="modal-title w-100">Agregar presupuesto</h5>
                    </div>
    
                    {/* Cuerpo */}
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {/* Selección de Categoría */}
                            <div className="form-group">
                                <label className="fw-bold">Categoría</label>
                                <select
                                    className="form-select"
                                    name="categoria"
                                    value={presupuesto.categoria}
                                    onChange={handleChange}
                                >
                                    <option value="Ocio">Ocio</option>
                                    <option value="Servicios">Servicios</option>
                                    <option value="Alimentación">Alimentación</option>
                                </select>
                            </div>
    
                            {/* Entrada de Monto */}
                            <div className="form-group mt-3">
                                <label className="fw-bold">Monto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="monto"
                                    placeholder="Ingresar monto en soles"
                                    value={presupuesto.monto}
                                    onChange={handleChange}
                                />
                            </div>
    
                            {/* Botones */}
                            <div className="d-flex justify-content-between mt-4">
                                <button type="button" className="btn btn-secondary w-45" onClick={closeModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary w-45">
                                    Aceptar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgregarPresupuestoModal