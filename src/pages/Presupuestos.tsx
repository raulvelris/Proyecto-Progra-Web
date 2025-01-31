import React, { useState, useEffect } from "react";  
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getPresupuestos, eliminarPresupuesto } from "../services/PresupuestoService";
import { PresupuestoTipo } from "../types/PresupuestoTipo";
import AgregarPresupuestoModal from "./AgregarPresupuestoModal";
import EliminarPresupuestoModal from "./EliminarPresupuestoModal";
import EditarPresupuestoModal from "./EditarPresupuestoModal";

const Presupuestos: React.FC = () => {
    const [allPresupuestos, setAllPresupuestos] = useState<PresupuestoTipo[]>([])
    const [selectedPresupuesto, setSelectedPresupuesto] = useState<PresupuestoTipo | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState<'edit' | 'delete' | 'add'>('edit')

    useEffect(() => {
        setAllPresupuestos(getPresupuestos())
    }, [])

    function handleDelete(id: number) {
        eliminarPresupuesto(id)
        setAllPresupuestos(getPresupuestos())
        closeModal()
    }

    function handleAddPresupuesto() {
        const currentPresupuestos = [...getPresupuestos()]
        setAllPresupuestos(currentPresupuestos)
        closeModal()
    }

    const openModal = (presupuesto: PresupuestoTipo | null, type: 'edit' | 'delete' | 'add') => {
        setSelectedPresupuesto(presupuesto)
        setModalType(type)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedPresupuesto(null)
        setIsModalOpen(false)
    }

    return (
        <div className="container mt-4">
        <h2>Mis Presupuestos</h2>
        <div className="d-flex justify-content-end my-3">
            <button onClick={() => openModal(null, 'add')} className="btn btn-primary me-4 d-flex align-items-center">
                <FaPlus className="me-2" />
                Agregar
            </button>
        </div>
        <table className="table table-bordered">
            <thead className="table-light">
                <tr>
                    <th>Id</th>
                    <th>Categoria</th>
                    <th>Monto</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {allPresupuestos.map(presupuesto => (
                    <tr key={presupuesto.id}>
                        <td>{presupuesto.id}</td>
                        <td>{presupuesto.categoria}</td>
                        <td>{presupuesto.monto}</td>
                        <td>
                            <button onClick={() => openModal(presupuesto, 'edit')} className="btn btn-sm">
                                <FaEdit />
                            </button>
                            <button onClick={() => openModal(presupuesto, 'delete')} className="btn btn-sm">
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {isModalOpen && selectedPresupuesto && modalType === 'edit' && (
            <EditarPresupuestoModal
                presupuesto={selectedPresupuesto}
                closeModal={closeModal}
                onSave={() => {
                    setAllPresupuestos(getPresupuestos())
                    closeModal()
                }}
            />
        )}
        {isModalOpen && selectedPresupuesto && modalType === 'delete' && (
            <EliminarPresupuestoModal
                closeModal={closeModal}
                onDelete={() => {
                    handleDelete(selectedPresupuesto.id)
                    closeModal()
                }}
            />
        )}
        {isModalOpen && modalType === 'add' && (
            <AgregarPresupuestoModal
                closeModal={closeModal}
                onSave={handleAddPresupuesto}
            />
        )}
    </div>
    )
}

export default Presupuestos;

