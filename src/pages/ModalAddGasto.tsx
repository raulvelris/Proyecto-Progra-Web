import { useState } from "react"
import { crearGasto } from "../services/GastoService"
import { GastoTipo } from "../types/GastoTipo"

interface MAGProps {
  showModal: boolean
  closeModal: () => void
  onGastoCreado: () => void
}

const ModalAddGasto = (props: MAGProps) => {
  const [fecha, setFecha] = useState("")
  const [categoria, setCategoria] = useState("Servicios")
  const [recurrente, setRecurrente] = useState(false)
  const [monto, setMonto] = useState<number | "">("")
  const [descripcion, setDescripcion] = useState("")

  function fechaChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFecha(e.target.value)
  }

  function categoriaChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCategoria(e.target.value)
  }

  function recurrenteChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRecurrente(e.target.checked)
  }

  function montoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setMonto(val === "" ? "" : Number(val))
  }

  function descripcionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescripcion(e.target.value)
  }

  function aceptarClick() {
    if (monto === "") {
      alert("Ingresa un monto válido.")
      return
    }
    const nuevoGasto: GastoTipo = {
      id: 0,
      fecha,
      monto: Number(monto),
      categoria,
      descripcion,
      recurrente
    }
    crearGasto(nuevoGasto)
    props.onGastoCreado()
    setFecha("")
    setCategoria("Servicios")
    setRecurrente(false)
    setMonto("")
    setDescripcion("")
    props.closeModal()
  }

  return (
    <div
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      className={props.showModal ? "modal fade show d-block" : "modal fade"}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-5 shadow overflow-hidden">
          <div className="modal-body p-5 text-secondary-emphasis">
            <h3 className="text-center mb-4 fw-bold">Agregar gasto</h3>
            <form className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center">
                <label className="col-4 fw-bold fs-5">Fecha</label>
                <input
                  className="form-control w-100 text-body-secondary"
                  type="date"
                  value={fecha}
                  onChange={fechaChange}
                />
              </div>
              <div className="d-flex align-items-center">
                <label className="col-4 fw-bold fs-5">Categoria</label>
                <select
                  className="form-select w-100 text-body-secondary"
                  value={categoria}
                  onChange={categoriaChange}
                >
                  <option>Servicios</option>
                  <option>Alimentación</option>
                  <option>Ocio</option>
                  <option>Comida</option>
                  <option>Transporte</option>
                  <option>Salud</option>
                  <option>Entretenimiento</option>
                  <option>Estudio</option>
                  <option>Regalo</option>
                </select>
              </div>
              <div className="d-flex align-items-center">
                <label className="col-4 fw-bold fs-5">Recurrente</label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={recurrente}
                  onChange={recurrenteChange}
                />
              </div>
              <div className="d-flex align-items-center">
                <label className="col-4 fw-bold fs-5">Monto</label>
                <input
                  className="form-control w-100 text-body-secondary"
                  type="number"
                  value={monto}
                  onChange={montoChange}
                />
              </div>
              <div className="d-flex align-items-start mt-2">
                <label className="col-4 fw-bold fs-5">Descripcion</label>
                <textarea
                  className="form-control flex-grow-1"
                  rows={4}
                  placeholder="Escriba aquí el detalle"
                  value={descripcion}
                  onChange={descripcionChange}
                />
              </div>
              <div className="d-flex justify-content-between mt-3 mx-5">
                <button
                  style={{ width: "45%" }}
                  type="button"
                  className="btn btn-secondary px-4 fw-semibold"
                  onClick={() => {
                    props.closeModal()
                    setFecha("")
                    setCategoria("Servicios")
                    setRecurrente(false)
                    setMonto("")
                    setDescripcion("")
                  }}
                >
                  Cancelar
                </button>
                <button
                  style={{ width: "45%" }}
                  type="button"
                  className="btn btn-primary px-4 fw-semibold"
                  onClick={aceptarClick}
                >
                  Aceptar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAddGasto
