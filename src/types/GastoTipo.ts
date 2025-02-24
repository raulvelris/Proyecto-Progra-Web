// src/types/GastoTipo.ts
export interface GastoTipo {
  id: number;
  date: string;         // "2025-01-15"
  amount: number;       // 2000
  description: string;  // "Pago de luz"
  recurring: boolean;   // true / false
  category_id: number;  // 1, 2, etc.
  user_id?: number;     // opcional
  // Si antes usabas "fecha", "monto", "categoria", ajusta los nombres
  // o haz un mapper en el front.
}
