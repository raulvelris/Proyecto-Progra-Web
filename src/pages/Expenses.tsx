import React, { useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import { getExpenses, deleteExpense } from "../services/expenseService"
import { Expense } from "../types/Expense"
import ExpenseFilter from "../components/ExpenseFilter"

function Expenses() {
  const [allExpenses, setAllExpenses] = useState<Expense[]>([])
  const [filterCategory, setFilterCategory] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [filterAmount, setFilterAmount] = useState<number | null>(null)

  useEffect(() => {
    setAllExpenses(getExpenses())
  }, [])

  const filteredExpenses = useMemo(() => {
    return allExpenses.filter(e => {
      const catOk = !filterCategory || e.category === filterCategory
      const dateOk = !filterDate || e.date === filterDate
      const amountOk = filterAmount === null || e.amount === filterAmount
      return catOk && dateOk && amountOk
    })
  }, [allExpenses, filterCategory, filterDate, filterAmount])

  function handleDelete(id: number) {
    if (window.confirm("¿Eliminar este egreso?")) {
      deleteExpense(id)
      setAllExpenses(getExpenses())
    }
  }

  return (
    <div className="container mt-4">
      <h2>Mis Gastos</h2>
      <div className="d-flex justify-content-between align-items-center my-3">
        <ExpenseFilter
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          filterAmount={filterAmount}
          setFilterAmount={setFilterAmount}
        />
        <button className="btn btn-primary">+ Agregar</button>
      </div>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map(e => (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td>{e.amount}</td>
              <td>{e.category}</td>
              <td>{e.description}</td>
              <td>
                <Link to={`/app/expenses/edit/${e.id}`} className="btn btn-warning btn-sm me-2">
                  &#9998;
                </Link>
                <button onClick={() => handleDelete(e.id)} className="btn btn-danger btn-sm">
                  &#128465;
                </button>
              </td>
            </tr>
          ))}
          {filteredExpenses.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">No hay registros</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Expenses
