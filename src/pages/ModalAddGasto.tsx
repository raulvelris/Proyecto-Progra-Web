// src/pages/ModalAddGasto.tsx
import React, { useState } from "react";
import { crearGasto } from "../services/GastoService";
import { CategoriaTipo } from "../services/CategoryService";

interface ModalAddGastoProps {
  showModal: boolean;
  closeModal: () => void;
  onAddGasto: () => void; // para recargar
  categorias: CategoriaTipo[];
}

const ModalAddGasto: React.FC<ModalAddGastoProps> = ({
  showModal,
  closeModal,
  onAddGasto,
  categorias
}) => {
  const [fecha, setFecha] = useState("");
  const [categoriaId, setCategoriaId] = useState<number>(
    categorias.length > 0 ? categorias[0].id : 1
  );
  const [recurrente, setRecurrente] = useState(false);
  const [monto, setMonto] = useState<number | "">("");
  const [descripcion, setDescripcion] = useState("");

  if (!showModal) return null;

  async function handleAceptar() {
    await crearGasto({
      date: fecha,
      amount: monto === "" ? 0 : Number(monto),
      description: descripcion,
      recurring: recurrente,
      category_id: categoriaId
    });
    onAddGasto(); // recarga la lista en Gastos
    handleClose();
  }

  function handleClose() {
    closeModal();
    // Limpiar
    setFecha("");
    setCategoriaId(categorias.length > 0 ? categorias[0].id : 1);
    setRecurrente(false);
    setMonto("");
    setDescripcion("");
  }

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="modal-header border-0 text-center">
            <h5 className="modal-title w-100">Agregar gasto</h5>
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

export default ModalAddGasto;
