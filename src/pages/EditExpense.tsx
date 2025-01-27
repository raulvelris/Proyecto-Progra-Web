// src/pages/EditExpense.tsx

import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getExpenseById, updateExpense } from "../services/expenseService"
import { Expense } from "../types/Expense"

function EditExpense() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [expenseData, setExpenseData] = useState<Expense | null>(null)

  useEffect(() => {
    const parsedId = Number(id)
    if (!parsedId) {
      navigate("/app/expenses")
      return
    }
    const found = getExpenseById(parsedId)
    if (!found) {
      navigate("/app/expenses")
      return
    }
    setExpenseData(found)
  }, [id, navigate])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (!expenseData) return
    let value: string | number = e.target.value
    if (e.target.name === "amount") {
      value = parseFloat(e.target.value) || 0
    }
    setExpenseData({ ...expenseData, [e.target.name]: value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!expenseData) return
    updateExpense(expenseData)
    alert("Egreso actualizado correctamente")
    navigate("/app/expenses")
  }

  if (!expenseData) {
    return <div className="container mt-4">Cargando...</div>
  }

  return (
    <div className="container mt-4">
      <h2>Editar Egreso</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={expenseData.date}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Monto</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            value={expenseData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Categoría</label>
          <select
            name="category"
            className="form-select"
            value={expenseData.category}
            onChange={handleChange}
          >
            <option value="Alimentación">Alimentación</option>
            <option value="Servicios">Servicios</option>
            <option value="Ocio">Ocio</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={expenseData.description}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditExpense
