import React, { useMemo } from "react"
import { Bar } from "react-chartjs-2"
import "chart.js/auto"
import { getExpenses } from "../services/expenseService"

function ExpenseCharts() {
  const expenses = getExpenses()

  const monthlyData = useMemo(() => {
    const monthMap: Record<string, number> = {
      Ene: 0, Feb: 0, Mar: 0, Abr: 0, May: 0, Jun: 0,
      Jul: 0, Ago: 0, Sep: 0, Oct: 0, Nov: 0, Dic: 0
    }
    const monthNames = Object.keys(monthMap)
    expenses.forEach(e => {
      const idx = new Date(e.date).getMonth()
      const mName = monthNames[idx] || "?"
      monthMap[mName] += e.amount
    })
    return {
      labels: Object.keys(monthMap),
      datasets: [
        {
          label: "Gastos mensuales",
          data: Object.values(monthMap),
          backgroundColor: "rgba(54, 162, 235, 0.6)"
        }
      ]
    }
  }, [expenses])

  const categoryData = useMemo(() => {
    const catMap: Record<string, number> = {}
    expenses.forEach(e => {
      catMap[e.category] = (catMap[e.category] || 0) + e.amount
    })
    return {
      labels: Object.keys(catMap),
      datasets: [
        {
          label: "Gastos por categoría",
          data: Object.values(catMap),
          backgroundColor: "rgba(255, 99, 132, 0.6)"
        }
      ]
    }
  }, [expenses])

  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <div className="p-3 border rounded">
          <h4 className="text-center">Gastos mensuales</h4>
          <Bar data={monthlyData} />
        </div>
      </div>
      <div className="col-md-6 mb-3">
        <div className="p-3 border rounded">
          <h4 className="text-center">Gastos por categoría</h4>
          <Bar data={categoryData} />
        </div>
      </div>
    </div>
  )
}

export default ExpenseCharts
