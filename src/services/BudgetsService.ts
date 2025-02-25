import { BudgetsTipo } from "../types/BudgetsTipo";


export async function obtenerPresupuestos(): Promise<BudgetsTipo[]> {
    const userStr = localStorage.getItem("user");
    let token = "";
    if (userStr) {
      token = JSON.parse(userStr).token;
    }
    const resp = await fetch("http://localhost:5000/obtener-Budgets/", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await resp.json();
    return data.monthly_budget || [];
  }
  