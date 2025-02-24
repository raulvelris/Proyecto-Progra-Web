// src/services/GastoService.ts
import { GastoTipo } from "../types/GastoTipo";

const API_URL = "http://localhost:5000/expenses"; // Ajusta al puerto de tu backend

export async function obtenerGastos(): Promise<GastoTipo[]> {
  const userStr = localStorage.getItem("user");
  let token = "";
  if (userStr) {
    token = JSON.parse(userStr).token;
  }
  const resp = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await resp.json();
  return data.gastos || [];
}

export async function crearGasto(nuevo: Partial<GastoTipo>): Promise<void> {
  const userStr = localStorage.getItem("user");
  let token = "";
  if (userStr) {
    token = JSON.parse(userStr).token;
  }
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(nuevo)
  });
}

export async function actualizarGasto(g: GastoTipo): Promise<void> {
  const userStr = localStorage.getItem("user");
  let token = "";
  if (userStr) {
    token = JSON.parse(userStr).token;
  }
  await fetch(`${API_URL}/${g.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(g)
  });
}

export async function eliminarGasto(id: number): Promise<void> {
  const userStr = localStorage.getItem("user");
  let token = "";
  if (userStr) {
    token = JSON.parse(userStr).token;
  }
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
