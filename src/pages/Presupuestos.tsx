import React, { useState, useEffect } from "react";  
import { Table } from "react-bootstrap"
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import AgregarPresupuestoModal from "./AgregarPresupuestoModal";
import EliminarPresupuestoModal from "./EliminarPresupuestoModal";
import EditarPresupuestoModal from "./EditarPresupuestoModal";

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND || "http://localhost:5000"

export interface Categoria {
    id: number,
    nombre: string
}

export interface ListadoPresupuestoItem {
    id: number,
    user_id: number,
    monthly_budget: number,
    category_id: number,
    categoria: Categoria
}

interface ListadoPresupuestosProps {
    data: ListadoPresupuestoItem[]
    onOpenModal: () => void
    onEliminar: (id: number) => void
}

const ListadoPresupuestos = (props: ListadoPresupuestosProps) => {
    const [presupuesto, setPresupuesto] = useState<ListadoPresupuestoItem[]>([])
    const [categoria, setCategoria] = useState<Categoria[]>([])
    const [showModalPresupuesto, setShowModalPresupuesto] = useState<boolean>(false)
    const [showModalEliminar, setShowModalEliminar] = useState<boolean>(false)
    const [showModalEditar, setShowModalEditar] = useState<boolean>(false)
    const [presupuestoIdEliminar, setPresupuestoIdEliminar] = useState<number | null>(null)
    const [presupuestoEditar, setPresupuestoEditar] = useState<ListadoPresupuestoItem | null>(null)

    const httpGuardarPresupuesto = async (categoriaId: number, monto: number) => {
        const url = URL_BACKEND + "/presupuesto"
        const resp = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                category_id: categoriaId,
                monto: monto
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await resp.json()
        if (data.msg === "") {
            closeModalPresupuesto()
            httpObtenerPresupuestos()
        }
    }

    const httpObtenerPresupuestos = async () => {
        const url = URL_BACKEND + "/presupuesto"
        const resp = await fetch(url)
        const data = await resp.json()
        if (data.msg === "") {
            const listaPresupuesto = data.presupuestos
            setPresupuesto(listaPresupuesto)
            console.log(listaPresupuesto)
        } else {
            console.log(`Error al obtener presupuestos: ${data.msg}`)
        }
    }

    const httpObtenerCategorias = async () => {
        const url = URL_BACKEND + "/categorias"
        const resp = await fetch(url)
        const data = await resp.json()
        if (data.msg === "") {
            const listaCategorias = data.categorias
            setCategoria(listaCategorias)
        } else {
            console.log(`Error al obtener categorias: ${data.msg}`)
        }
    }

    const httpEliminarProyecto = async (id: number) => {
        const url = URL_BACKEND + "/presupuesto?id=" + id
        const resp = await fetch(url, {
            method: "DELETE"
        })
        const data = await resp.json()
        if (data.msg === "") {
            httpObtenerPresupuestos()
        } else {
            console.log(`Error al eliminar presupuesto: ${data.msg}`)
        }
    }

    const httpActualizarPresupuesto = async (presupuesto: ListadoPresupuestoItem) => {
        const url = URL_BACKEND + "/presupuesto"
        const resp = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(presupuesto),
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await resp.json()
        if (data.msg === "") {
            closeModalEditar()
            httpObtenerPresupuestos()
        }
    }

    useEffect(() => {
        httpObtenerPresupuestos()
        httpObtenerCategorias()
    }, [])

    const openModalPresupuesto = () => {
        setShowModalPresupuesto(true)
    }

    const closeModalPresupuesto = () => {
        setShowModalPresupuesto(false)
    }

    const openModalEliminar = (id: number) => {
        setPresupuestoIdEliminar(id)
        setShowModalEliminar(true)
    }

    const closeModalEliminar = () => {
        setShowModalEliminar(false)
        setPresupuestoIdEliminar(null)
    }

    const openModalEditar = (presupuesto: ListadoPresupuestoItem) => {
        setPresupuestoEditar(presupuesto)
        setShowModalEditar(true)
    }

    const closeModalEditar = () => {
        setShowModalEditar(false)
        setPresupuestoEditar(null)
    }

    const handleEliminarPresupuesto = () => {
        if (presupuestoIdEliminar !== null) {
            httpEliminarProyecto(presupuestoIdEliminar)
            closeModalEliminar()
        }
    }

    const handleGuardarPresupuesto = (categoriaId: number, monto: number) => {
        httpGuardarPresupuesto(categoriaId, monto)
    }

    const handleActualizarPresupuesto = (presupuesto: ListadoPresupuestoItem) => {
        httpActualizarPresupuesto(presupuesto)
    }

    const navigate = useNavigate()

    return (
        <div className="table-section" style={{ minHeight: "80vh" }}>
            <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                <h2 className="table-title m-0">Mis Presupuestos</h2>
                <div className="d-flex flex-row">
                    <button onClick={() => openModalPresupuesto()} className="btn btn-primary btn-lg me-4 d-flex align-items-center">
                        <FaPlus className="me-2" />
                        Agregar
                    </button>
                </div>
            </div>
            <div className="usertable-title">
                <Table className="custom-table" hover>
                    <thead>
                        <tr>
                            <th className="text-start">Categoria</th>
                            <th className="text-start">Monto</th>
                            <th className="text-center">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            presupuesto.map((presupuesto: ListadoPresupuestoItem) => (
                                <tr key={presupuesto.id}>
                                    <td>{
                                        presupuesto.categoria != null
                                            ? presupuesto.categoria.nombre
                                            : "-"
                                    }
                                    </td>
                                    <td>{presupuesto.monthly_budget}</td>
                                    <td>
                                        <button type="button" className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => openModalEditar(presupuesto)}>
                                            I
                                        </button>
                                        <button type="button" className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => openModalEliminar(presupuesto.id)}>
                                            E
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
            <AgregarPresupuestoModal
                showModal={showModalPresupuesto}
                closeModal={closeModalPresupuesto}
                onGuardarPresupuesto={handleGuardarPresupuesto}
                categorias={categoria}
            />
            {showModalEliminar && (
                <EliminarPresupuestoModal
                    closeModal={closeModalEliminar}
                    onDelete={handleEliminarPresupuesto}
                />
            )}
            {showModalEditar && presupuestoEditar && (
                <EditarPresupuestoModal
                    presupuesto={presupuestoEditar}
                    closeModal={closeModalEditar}
                    onSave={handleActualizarPresupuesto}
                    categorias={categoria}
                />
            )}
        </div>
    )
}

export default ListadoPresupuestos;