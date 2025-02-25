// src/services/CategoryService.ts
export interface CategoriaTipo {
  id: number;
  name: string;
}

export async function obtenerCategorias(): Promise<CategoriaTipo[]> {
  const resp = await fetch("http://localhost:5000/categorias"); // Ajusta URL
  const data = await resp.json();
  return data.categorias || [];
}
