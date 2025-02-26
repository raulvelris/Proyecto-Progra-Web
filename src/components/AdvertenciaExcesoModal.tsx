import React from "react";

interface AdvertenciaExcesoModalProps {
  showModal: boolean;
  closeModal: () => void;
  categoria: string;
  presupuesto: number;
  gastoActual: number;
}

const AdvertenciaExcesoModal: React.FC<AdvertenciaExcesoModalProps> = ({
  showModal,
  closeModal,
  categoria,
  presupuesto,
  gastoActual,
}) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>⚠️ Advertencia de Presupuesto ⚠️</h2>
        <p>
          Estás cerca o has superado tu presupuesto de <strong>{categoria}</strong>.
        </p>
        <p>
          Presupuesto: <strong>${presupuesto.toFixed(2)}</strong>
        </p>
        <p>
          Gasto actual: <strong>${gastoActual.toFixed(2)}</strong>
        </p>
        <button onClick={closeModal} className="btn btn-warning">
          Entendido
        </button>
      </div>
    </div>
  );
};

export default AdvertenciaExcesoModal;
