import React from "react";

interface ExpenseFilterProps {
  filterCategory: string;
  setFilterCategory: (val: string) => void;
  filterDate: string;
  setFilterDate: (val: string) => void;
  filterAmount: number | null;
  setFilterAmount: (val: number | null) => void;
}

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({
  filterCategory,
  setFilterCategory,
  filterDate,
  setFilterDate,
  filterAmount,
  setFilterAmount,
}) => {
  return (
    <div className="row gx-2 gy-1">
      <div className="col-auto">
        <label className="form-label mb-0">Categoría:</label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="form-select form-select-sm"
        >
          <option value="">Todas</option>
          <option value="Alimentación">Alimentación</option>
          <option value="Servicios">Servicios</option>
          <option value="Ocio">Ocio</option>
        </select>
      </div>

      {/* Fecha */}
      <div className="col-auto">
        <label className="form-label mb-0">Fecha (dd-mm-yyyy):</label>
        <input
          type="text"
          placeholder="Ej: 18-12-2021"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="form-control form-control-sm"
        />
      </div>

      {/* Monto */}
      <div className="col-auto">
        <label className="form-label mb-0">Monto exacto:</label>
        <input
          type="number"
          placeholder="Ej: 2000"
          value={filterAmount === null ? "" : filterAmount}
          onChange={(e) =>
            setFilterAmount(e.target.value ? Number(e.target.value) : null)
          }
          className="form-control form-control-sm"
        />
      </div>
    </div>
  );
};

export default ExpenseFilter;
