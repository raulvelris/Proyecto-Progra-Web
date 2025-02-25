// src/services/dashboardService.ts
export async function getGastosMensuales(): Promise<any[]> {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string).token
      : "";
    const response = await fetch("http://localhost:5000/reports/monthly", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return data.data || [];
  }
  
  export async function getGastosPorCategoria(): Promise<any[]> {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string).token
      : "";
    const response = await fetch("http://localhost:5000/reports/category", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return data.data || [];
  }
  