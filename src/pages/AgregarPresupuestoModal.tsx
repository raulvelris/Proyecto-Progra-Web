import React, { useState } from "react"
import { Categoria } from "./ModalAddGasto"

interface AgregarPresupuestoModalProps {
    showModal: boolean,
    closeModal: () => void,
    onGuardarPresupuesto: (categoriaId: number, monto: number) => void,
    categorias: Categoria[]
}

const AgregarPresupuestoModal = (props: AgregarPresupuestoModalProps) => {
    const [categoriaId, setCategoriaId] = useState<number>(0)
    const [monto, setMonto] = useState<number>(0)

    const categoriaChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoriaId(parseInt(e.target.value))
    }

    const montoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMonto(parseInt(e.target.value))
    }

    return (
        <div className={props.showModal ? "modal fade show d-flex align-items-center justify-content-center" : "modal fade"}
            style={{ display: props.showModal ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)", minHeight: "100vh" }}
            aria-modal="true" role="dialog">
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "450px", width: "100%" }}>
                <div className="modal-content p-3">
                    {/* Título */}
                    <div className="modal-header border-0 text-center">
                        <h5 className="modal-title w-100">Agregar presupuesto</h5>
                    </div>

                    {/* Cuerpo */}
                    <div className="modal-body">
                        <form>
                            {/* Selección de Categoría */}
                            <div className="form-group">
                                <label className="fw-bold">Categoría</label>
                                <select
                                    className="form-select"
                                    name="categoria"
                                    value={categoriaId}
                                    onChange={categoriaChangeHandler}>
                                    {
                                        props.categorias.map((c: Categoria) => {
                                            return <option key={c.id} value={c.id}>{c.name}</option>
                                        })
                                    }
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
                                    value={monto}
                                    onChange={montoChangeHandler}
                                />
                            </div>
                        </form>
                    </div>

                    {/* Botones */}
                    <div className="modal-footer d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-secondary w-45" onClick={props.closeModal}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary w-45" onClick={() => {
                            props.onGuardarPresupuesto(categoriaId, monto)
                        }}>
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgregarPresupuestoModal