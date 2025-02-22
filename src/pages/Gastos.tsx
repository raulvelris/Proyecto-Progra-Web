import { useEffect, useState, useMemo } from "react"
import { obtenerGastos, eliminarGasto } from "../services/GastoService"
import { GastoTipo } from "../types/GastoTipo"
import FiltroGastos from "../components/FiltroGastos"
import EditarGastoModal from "./EditarGasto"
import ExportarGastoModal from "./ExportarGastoModal"
import ModalAddGasto from "./ModalAddGasto"
import EliminarGasto from "./EliminarGasto"

function Gastos() {
  const [lista, setLista] = useState<GastoTipo[]>([])
  const [filtroCategoria, setFiltroCategoria] = useState("")
  const [filtroFecha, setFiltroFecha] = useState("")
  const [minMonto, setMinMonto] = useState<number | null>(null)
  const [maxMonto, setMaxMonto] = useState<number | null>(null)
  const [filtroRec, setFiltroRec] = useState("")
  const [selectedGastoId, setSelectedGastoId] = useState<number | null>(null)
  const [showBudgetAlert, setShowBudgetAlert] = useState(false)
  const [exceededCategories, setExceededCategories] = useState<string[]>([])
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [editingGastoId, setEditingGastoId] = useState<number | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const categoryLimits: { [key: string]: number } = {
    Alimentación: 5000,
    Servicios: 3000,
    Ocio: 2000
  }

  function BudgetAlertModal() {
    if (!showBudgetAlert) return null
    return (
      <div className="modal-overlay" style={{ zIndex: 1050 }}>
        <div className="modal-contenido alert-modal">
          <button
            className="cerrar-modal"
            onClick={() => setShowBudgetAlert(false)}
          >
            &times;
          </button>
          <div className="alert-header mb-3">
            <i className="bi bi-exclamation-triangle-fill text-danger me-2" />
            <h3 className="text-danger">¡Alerta de Presupuesto!</h3>
          </div>
          <div className="alert-body">
            {exceededCategories.map(c => (
              <div key={c} className="mb-2">
                <strong>{c}:</strong>
                <div>Límite: ${categoryLimits[c].toLocaleString()}</div>
                <div>
                  Gastado: $
                  {lista
                    .filter(g => g.categoria === c)
                    .reduce((sum, g) => sum + g.monto, 0)
                    .toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="alert-footer mt-4">
            <button
              className="btn btn-primary"
              onClick={() => setShowBudgetAlert(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    setLista(obtenerGastos())
  }, [])

  useEffect(() => {
    const totals = lista.reduce((acc: { [key: string]: number }, gasto) => {
      acc[gasto.categoria] = (acc[gasto.categoria] || 0) + gasto.monto
      return acc
    }, {})
    const exceeded = Object.keys(totals).filter(
      c => totals[c] > (categoryLimits[c] || Infinity)
    )
    setExceededCategories(exceeded)
    if (exceeded.length > 0) setShowBudgetAlert(true)
  }, [lista])

  const datosFiltrados = useMemo(() => {
    return lista.filter(g => {
      const cOk = !filtroCategoria || g.categoria === filtroCategoria
      const fOk = !filtroFecha || g.fecha === filtroFecha
      let mOk = true
      if (minMonto !== null && g.monto < minMonto) mOk = false
      if (maxMonto !== null && g.monto > maxMonto) mOk = false
      let rOk = true
      if (filtroRec === "si") rOk = g.recurrente === true
      if (filtroRec === "no") rOk = g.recurrente === false
      return cOk && fOk && mOk && rOk
    })
  }, [lista, filtroCategoria, filtroFecha, minMonto, maxMonto, filtroRec])

  function actualizarLista() {
    setLista(obtenerGastos())
  }

  function openExportModal() {
    setIsExportModalOpen(true)
  }

  function closeExportModal() {
    setIsExportModalOpen(false)
  }

  function handleExport(format: "csv" | "pdf") {
    closeExportModal()
  }

  function handleDeleteClick(id: number) {
    setEditingGastoId(null)
    setSelectedGastoId(id)
    setIsDeleteModalOpen(true)
  }

  function handleEditClick(id: number) {
    setIsDeleteModalOpen(false)
    setSelectedGastoId(null)
    setEditingGastoId(id)
  }

  function handleAddClick() {
    setIsAddModalOpen(true)
  }

  function onNuevoGastoCreado() {
    setLista(obtenerGastos())
  }

  const addGastoHandler = async (ng_fecha: string, ng_categoria: number, ng_recurrente: boolean, ng_monto: number, ng_descripcion: string) => {
    const gastoData = {
      fecha: ng_fecha,
      categoria: ng_categoria,
      recurrente: ng_recurrente,
      monto: ng_monto,
      descripcion: ng_descripcion
    }

    const resp = await fetch('http://localhost:5000/gastos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gastoData)
    });
    
    const data = await resp.json();
    if (data.msg == "") {
      console.log("Gasto agregado");
    } else {
      console.log(data.msg);
    }
  }

  return (
    <div className="container mt-4">
      <h2>Mis Gastos</h2>
      <BudgetAlertModal />
      <div className="d-flex justify-content-between align-items-center my-3">
        <FiltroGastos
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
          filtroFecha={filtroFecha}
          setFiltroFecha={setFiltroFecha}
          minMonto={minMonto}
          setMinMonto={setMinMonto}
          maxMonto={maxMonto}
          setMaxMonto={setMaxMonto}
          filtroRec={filtroRec}
          setFiltroRec={setFiltroRec}
        />
        <div>
          <button className="btn btn-primary me-2" onClick={handleAddClick}>
            + Agregar
          </button>
          <button className="btn btn-secondary" onClick={openExportModal}>
            Exportar Gastos
          </button>
        </div>
      </div>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Recurrente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map(g => (
            <tr key={g.id}>
              <td>{g.fecha}</td>
              <td>{g.monto}</td>
              <td>{g.categoria}</td>
              <td>{g.descripcion}</td>
              <td>{g.recurrente ? "Sí" : "No"}</td>
              <td>
                <button
                  onClick={() => handleEditClick(g.id)}
                  className="btn btn-warning btn-sm me-2"
                >
                  <i className="bi bi-pencil-square" />
                </button>
                <button
                  onClick={() => handleDeleteClick(g.id)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="bi bi-trash" />
                </button>
              </td>
            </tr>
          ))}
          {datosFiltrados.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isExportModalOpen && (
        <ExportarGastoModal
          closeModal={closeExportModal}
          onExport={handleExport}
          data={lista}
        />
      )}
      {editingGastoId && (
        <EditarGastoModal
          id={editingGastoId}
          onClose={() => setEditingGastoId(null)}
          onUpdate={actualizarLista}
        />
      )}
      {isDeleteModalOpen && (
        <EliminarGasto
          closeModal={() => setIsDeleteModalOpen(false)}
          onDelete={() => {
            if (selectedGastoId != null) {
              eliminarGasto(selectedGastoId)
              setLista(obtenerGastos())
            }
            setIsDeleteModalOpen(false)
          }}
        />
      )}
      {isAddModalOpen && (
        <ModalAddGasto
          showModal={isAddModalOpen}
          closeModal={() => setIsAddModalOpen(false)}
          onAddGasto={ async (fecha, categoria, recurrente, monto, descripcion) => {
            // addGastoHandler(fecha, categoria, recurrente, monto, descripcion);
            console.log(fecha);
            console.log(categoria);
            console.log(recurrente);
            console.log(monto);
            console.log(descripcion);
          }}
        />
      )}
    </div>
  )
}

export default Gastos
