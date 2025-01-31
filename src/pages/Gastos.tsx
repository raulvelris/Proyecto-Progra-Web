import { useEffect, useState, useMemo } from "react"
import { obtenerGastos, eliminarGasto } from "../services/GastoService"
import { GastoTipo } from "../types/GastoTipo"
import FiltroGastos from "../components/FiltroGastos"
import EditarGastoModal from "../components/EditarGasto"

function Gastos() {
  const [lista, setLista] = useState<GastoTipo[]>([])
  const [filtroCategoria, setFiltroCategoria] = useState("")
  const [filtroFecha, setFiltroFecha] = useState("")
  const [filtroMonto, setFiltroMonto] = useState<number | null>(null)
  const [filtroRec, setFiltroRec] = useState("")
  const [selectedGastoId, setSelectedGastoId] = useState<number | null>(null)
  const [showBudgetAlert, setShowBudgetAlert] = useState(false)
  const [exceededCategories, setExceededCategories] = useState<string[]>([])

//-------------------------Alerta de agastos--------------------------------------------

// 2. Límites hardcodeados (puedes modificarlos)
const categoryLimits: {[key: string]: number} = {
  'Alimentación': 5000,
  'Servicios': 3000,
  'Ocio': 2000
}

// 3. Calcular totales y detectar excesos
useEffect(() => {
  const totals = lista.reduce((acc: {[key: string]: number}, gasto) => {
    acc[gasto.categoria] = (acc[gasto.categoria] || 0) + gasto.monto
    return acc
  }, {})

  const exceeded = Object.keys(totals)
    .filter(categoria => totals[categoria] > (categoryLimits[categoria] || Infinity))

  setExceededCategories(exceeded)
  if (exceeded.length > 0) setShowBudgetAlert(true)
}, [lista])

// 4. Modal de Alerta
const BudgetAlertModal = () => {
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
          <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
          <h3 className="text-danger">¡Alerta de Presupuesto!</h3>
        </div>
        
        <div className="alert-body">
          {exceededCategories.map(categoria => (
            <div key={categoria} className="mb-2">
              <strong>{categoria}:</strong>
              <div>
                Límite: ${categoryLimits[categoria].toLocaleString()}
              </div>
              <div>
                Gastado: ${lista
                  .filter(g => g.categoria === categoria)
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

//-------------------------Alerta de agastos--------------------------------------------
  useEffect(() => {
    setLista(obtenerGastos())
  }, [])

  const datosFiltrados = useMemo(() => {
    return lista.filter(g => {
      const catOk = !filtroCategoria || g.categoria === filtroCategoria
      const fechaOk = !filtroFecha || g.fecha === filtroFecha
      const montoOk = filtroMonto === null || g.monto === filtroMonto
      let recOk = true
      if (filtroRec === "si") recOk = g.recurrente === true
      if (filtroRec === "no") recOk = g.recurrente === false
      return catOk && fechaOk && montoOk && recOk
    })
  }, [lista, filtroCategoria, filtroFecha, filtroMonto, filtroRec])

  function borrar(id: number) {
    if (window.confirm("¿Eliminar este gasto?")) {
      eliminarGasto(id)
      setLista(obtenerGastos())
    }
  }

  const actualizarLista = () => {
    setLista(obtenerGastos())
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
          filtroMonto={filtroMonto}
          setFiltroMonto={setFiltroMonto}
          filtroRec={filtroRec}
          setFiltroRec={setFiltroRec}
        />
        <button className="btn btn-primary">+ Agregar</button>
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
                  onClick={() => setSelectedGastoId(g.id)} 
                  className="btn btn-warning btn-sm me-2"
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button onClick={() => borrar(g.id)} className="btn btn-danger btn-sm">
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          {datosFiltrados.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">No hay registros</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedGastoId && (
        <EditarGastoModal
          id={selectedGastoId}
          onClose={() => setSelectedGastoId(null)}
          onUpdate={actualizarLista}
        />
      )}
    </div>
  )
}

export default Gastos