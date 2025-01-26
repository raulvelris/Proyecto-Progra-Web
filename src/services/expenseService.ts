import { Expense } from "../types/Expense";

// Datos iniciales con formato dd-mm-yyyy
let expensesData: Expense[] = [
  {
    id: 1,
    date: "10-01-2025",
    amount: 500,
    category: "Alimentación",
    description: "Compra supermercado"
  },
  {
    id: 2,
    date: "15-01-2025",
    amount: 2000,
    category: "Servicios",
    description: "Pago de luz"
  },
  {
    id: 3,
    date: "02-02-2025",
    amount: 800,
    category: "Ocio",
    description: "Salida al cine"
  }
];

export function getExpenses(): Expense[] {
  return expensesData;
}

export function getExpenseById(id: number): Expense | undefined {
  return expensesData.find((exp) => exp.id === id);
}

export function updateExpense(updated: Expense): void {
  expensesData = expensesData.map((exp) =>
    exp.id === updated.id ? updated : exp
  );
}

export function createExpense(newExpense: Expense): void {
  const newId = expensesData.length > 0
    ? Math.max(...expensesData.map((exp) => exp.id)) + 1
    : 1;
  newExpense.id = newId;
  expensesData.push(newExpense);
}

export function deleteExpense(id: number): void {
  expensesData = expensesData.filter((exp) => exp.id !== id);
}
