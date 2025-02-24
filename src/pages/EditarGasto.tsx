// src/pages/EditarGasto.tsx
import React, { useEffect, useState } from "react";
import { GastoTipo } from "../types/GastoTipo";
import { actualizarGasto } from "../services/GastoService";
import { CategoriaTipo } from "../services/CategoryService";

interface EditarGastoProps {
  showModal: boolean;
  closeModal: () => void;
  onUpdate: () => void;
  gasto: GastoTipo;            // Pasamos el gasto completo
  categorias: CategoriaTipo[]; // Para mostrar en dropdown
}

const EditarGasto: React.FC<EditarGastoProps> = ({ showModal, closeModal, onUpdate, gasto, categorias }) => {
  const [fecha, setFecha] = useState(gasto.date);
  const [categoriaId, setCategoriaId] = useState(gasto.category_id);
  const [recurrente, setRecurrente] = useState(gasto.recurring);
  const [monto, setMonto] = useState<number | "">(gasto.amount);
  const [descripcion, setDescripcion] = useState(gasto.description);

  useEffect(() => {
    // Cada vez que el modal se abra con un gasto nuevo, sincroniza estado
    setFecha(gasto.date);
    setCategoriaId(gasto.category_id);
    setRecurrente(gasto.recurring);
    setMonto(gasto.amount);
    setDescripcion(gasto.description);
  }, [gasto]);

  if (!showModal) return null;

  async function handleAceptar() {
    const updated: GastoTipo = {
      ...gasto,
      date: fecha,
      category_id: categoriaId,
      recurring: recurrente,
      amount: monto === "" ? 0 : Number(monto),
      description
    };
    await actualizarGasto(updated);
    onUpdate();
    handleClose();
  }

  function handleClose() {
    closeModal();
  }

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="modal-header border-0 text-center">
            <h5 className="modal-title w-100">Editar gasto</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <label className="fw-bold">Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="fw-bold">Categoría</label>
                <select
                  className="form-select"
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(Number(e.target.value))}
                >
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-check form-switch mb-3">
                <label className="form-check-label fw-bold">Recurrente</label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={recurrente}
                  onChange={(e) => setRecurrente(e.target.checked)}
                />
              </div>
              <div className="mb-3">
                <label className="fw-bold">Monto</label>
                <input
                  type="number"
                  className="form-control"
                  value={monto}
                  onChange={(e) =>
                    setMonto(e.target.value === "" ? "" : Number(e.target.value))
                  }
                />
              </div>
              <div className="mb-3">
                <label className="fw-bold">Descripción</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer border-0 d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleAceptar}>
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarGasto;


