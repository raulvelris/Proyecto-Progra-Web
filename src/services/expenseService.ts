import { Expense } from "../types/Expense"

let expensesData: Expense[] = [
  {
    id: 1,
    date: "2025-01-10",
    amount: 500,
    category: "Alimentación",
    description: "Compra supermercado"
  },
  {
    id: 2,
    date: "2025-01-15",
    amount: 2000,
    category: "Servicios",
    description: "Pago de luz"
  },
  {
    id: 3,
    date: "2025-02-02",
    amount: 800,
    category: "Ocio",
    description: "Salida al cine"
  }
]

export function getExpenses(): Expense[] {
  return expensesData
}

export function getExpenseById(id: number): Expense | undefined {
  return expensesData.find(e => e.id === id)
}

export function updateExpense(updated: Expense): void {
  expensesData = expensesData.map(e => e.id === updated.id ? updated : e)
}

export function createExpense(newExpense: Expense): void {
  const newId = expensesData.length > 0 ? Math.max(...expensesData.map(e => e.id)) + 1 : 1
  newExpense.id = newId
  expensesData.push(newExpense)
}

export function deleteExpense(id: number): void {
  expensesData = expensesData.filter(e => e.id !== id)
}
