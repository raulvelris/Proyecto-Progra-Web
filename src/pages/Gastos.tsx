// src/pages/Gastos.tsx
import { useEffect, useState, useMemo } from "react";
import { obtenerGastos } from "../services/GastoService";
import { GastoTipo } from "../types/GastoTipo";
import FiltroGastos from "../components/FiltroGastos";
import EditarGasto from "./EditarGasto";            // <--- Asegúrate que se llama igual
import ExportarGastoModal from "./ExportarGastoModal";
import ModalAddGasto from "./ModalAddGasto";
import EliminarGasto from "./EliminarGasto";
import { obtenerCategorias, CategoriaTipo } from "../services/CategoryService";

function Gastos() {
  const [lista, setLista] = useState<GastoTipo[]>([]);
  const [categorias, setCategorias] = useState<CategoriaTipo[]>([]);

  // Filtros
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [minMonto, setMinMonto] = useState<number | null>(null);
  const [maxMonto, setMaxMonto] = useState<number | null>(null);
  const [filtroRec, setFiltroRec] = useState("");

  // Modals
  const [selectedGasto, setSelectedGasto] = useState<GastoTipo | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    cargarGastos();
    cargarCategorias();
  }, []);

  async function cargarGastos() {
    const gastosBD = await obtenerGastos();
    setLista(gastosBD);
    // Podrías notificar a Dashboard si quieres recargar
  }

  async function cargarCategorias() {
    const cats = await obtenerCategorias();
    setCategorias(cats);
  }

  // Mapea category_id -> category.name
  function getCategoryName(id: number): string {
    const cat = categorias.find((c) => c.id === id);
    return cat ? cat.name : String(id);
  }

  // Mapea nombre -> category_id (para filtrar)
  function getCategoryIdByName(name: string): number | null {
    const cat = categorias.find((c) => c.name === name);
    return cat ? cat.id : null;
  }

  const datosFiltrados = useMemo(() => {
    return lista.filter((g) => {
      // Filtro por nombre de categoría
      let cOk = true;
      if (filtroCategoria) {
        const catId = getCategoryIdByName(filtroCategoria);
        cOk = catId != null && g.category_id === catId;
      }

      // Filtro por fecha
      let fOk = !filtroFecha || g.date === filtroFecha;

      // Rango de montos
      let mOk = true;
      if (minMonto !== null && g.amount < minMonto) mOk = false;
      if (maxMonto !== null && g.amount > maxMonto) mOk = false;

      // Filtro recurrente
      let rOk = true;
      if (filtroRec === "si") rOk = g.recurring === true;
      if (filtroRec === "no") rOk = g.recurring === false;

      return cOk && fOk && mOk && rOk;
    });
  }, [lista, filtroCategoria, filtroFecha, minMonto, maxMonto, filtroRec, categorias]);

  function handleEditClick(g: GastoTipo) {
    setSelectedGasto(g);
    setIsEditModalOpen(true);
  }

  function handleDeleteClick(g: GastoTipo) {
    setSelectedGasto(g);
    setIsDeleteModalOpen(true);
  }

  function handleAddClick() {
    setIsAddModalOpen(true);
  }

  return (
    <div className="container mt-4">
      <h2>Mis Gastos</h2>
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
          <button
            className="btn btn-secondary"
            onClick={() => setIsExportModalOpen(true)}
          >
            Exportar Gastos
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Descripción</th>
            <th>Recurrente</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((g) => (
            <tr key={g.id}>
              <td>{g.date}</td>
              <td>{g.amount}</td>
              <td>{g.description}</td>
              <td>{g.recurring ? "Sí" : "No"}</td>
              <td>{getCategoryName(g.category_id)}</td>
              <td>
                <button
                  onClick={() => handleEditClick(g)}
                  className="btn btn-warning btn-sm me-2"
                >
                  <i className="bi bi-pencil-square" />
                </button>
                <button
                  onClick={() => handleDeleteClick(g)}
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

      {/* Exportar Modal */}
      {isExportModalOpen && (
        <ExportarGastoModal
          closeModal={() => setIsExportModalOpen(false)}
          onExport={() => setIsExportModalOpen(false)}
          data={lista}
        />
      )}

      {/* Editar Modal */}
      {isEditModalOpen && selectedGasto && (
        <EditarGasto
          showModal={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          onUpdate={() => {
            cargarGastos();
            setIsEditModalOpen(false);
          }}
          gasto={selectedGasto}
          categorias={categorias}
        />
      )}

      {/* Eliminar Modal */}
      {isDeleteModalOpen && selectedGasto && (
        <EliminarGasto
          closeModal={() => setIsDeleteModalOpen(false)}
          onDelete={() => {
            cargarGastos();
          }}
          gastoId={selectedGasto.id}
        />
      )}

      {/* Agregar Modal */}
      {isAddModalOpen && (
        <ModalAddGasto
          showModal={isAddModalOpen}
          closeModal={() => setIsAddModalOpen(false)}
          onAddGasto={() => {
            cargarGastos();
          }}
          categorias={categorias}
        />
      )}
    </div>
  );
}

export default Gastos;

