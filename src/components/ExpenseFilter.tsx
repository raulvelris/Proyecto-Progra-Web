import React from "react"

interface Props {
  filterCategory: string
  setFilterCategory: (val: string) => void
  filterDate: string
  setFilterDate: (val: string) => void
  filterAmount: number | null
  setFilterAmount: (val: number | null) => void
}

function ExpenseFilter({
  filterCategory,
  setFilterCategory,
  filterDate,
  setFilterDate,
  filterAmount,
  setFilterAmount
}: Props) {
  function handleAmount(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterAmount(e.target.value ? parseFloat(e.target.value) : null)
  }

  return (
    <div className="row gx-2 gy-1">
      <div className="col-auto">
        <label className="form-label mb-0">Categoría:</label>
        <select
          className="form-select form-select-sm"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
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
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
        />
      </div>
      <div className="col-auto">
        <label className="form-label mb-0">Monto exacto:</label>
        <input
          type="number"
          className="form-control form-control-sm"
          value={filterAmount === null ? "" : filterAmount}
          onChange={handleAmount}
        />
      </div>
    </div>
  )
}

export default ExpenseFilter
