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

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value
    if (!rawValue) {
      setFilterAmount(null)
      return
    }
    const num = parseFloat(rawValue)
    if (isNaN(num)) {
      setFilterAmount(null)
    } else {
      setFilterAmount(num)
    }
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
          placeholder="dd/mm/aaaa"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
        />
      </div>

      <div className="col-auto">
        <label className="form-label mb-0">Monto exacto:</label>
        <input
          type="number"
          className="form-control form-control-sm"
          placeholder="Ej: 200"
          value={filterAmount === null ? "" : filterAmount}
          onChange={handleAmountChange}
        />
      </div>
    </div>
  )
}

export default ExpenseFilter
