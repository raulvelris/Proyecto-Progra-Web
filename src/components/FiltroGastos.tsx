import React from "react"

interface Props {
  filtroCategoria: string
  setFiltroCategoria: (v: string) => void
  filtroFecha: string
  setFiltroFecha: (v: string) => void
  filtroMonto: number | null
  setFiltroMonto: (v: number | null) => void
  filtroRec: string
  setFiltroRec: (v: string) => void
}

function FiltroGastos({
  filtroCategoria,
  setFiltroCategoria,
  filtroFecha,
  setFiltroFecha,
  filtroMonto,
  setFiltroMonto,
  filtroRec,
  setFiltroRec
}: Props) {
  function cambiarMonto(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value
    if (!valor) {
      setFiltroMonto(null)
      return
    }
    const num = parseFloat(valor)
    setFiltroMonto(isNaN(num) ? null : num)
  }

  return (
    <div className="row gx-2 gy-1">
      <div className="col-auto">
        <label className="form-label mb-0">Categoría:</label>
        <select
          className="form-select form-select-sm"
          value={filtroCategoria}
          onChange={e => setFiltroCategoria(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Alimentación">Alimentación</option>
          <option value="Servicios">Servicios</option>
          <option value="Ocio">Ocio</option>
        </select>
      </div>
      <div className="col-auto">
        <label className="form-label mb-0">Fecha exacta:</label>
        <input
          type="date"
          className="form-control form-control-sm"
          value={filtroFecha}
          onChange={e => setFiltroFecha(e.target.value)}
        />
      </div>
      <div className="col-auto">
        <label className="form-label mb-0">Monto exacto:</label>
        <input
          type="number"
          className="form-control form-control-sm"
          value={filtroMonto === null ? "" : filtroMonto}
          onChange={cambiarMonto}
        />
      </div>
      <div className="col-auto">
        <label className="form-label mb-0">Recurrente:</label>
        <select
          className="form-select form-select-sm"
          value={filtroRec}
          onChange={e => setFiltroRec(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
    </div>
  )
}

export default FiltroGastos
