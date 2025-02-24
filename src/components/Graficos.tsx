// src/pages/Graficos.tsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getGastosMensuales, getGastosPorCategoria } from "../services/dashboardService";

// Opcional: puedes definir nombres de meses de forma global.
const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const Graficos: React.FC = () => {
  const [mensuales, setMensuales] = useState<any[]>([]);
  const [porCategoria, setPorCategoria] = useState<any[]>([]);

  useEffect(() => {
    async function cargarReportes() {
      const datosMensuales = await getGastosMensuales();
      const datosCategoria = await getGastosPorCategoria();
      setMensuales(datosMensuales);
      setPorCategoria(datosCategoria);
    }
    cargarReportes();
  }, []);

  // Construir datos para gráfico de gastos mensuales.
  const datosMes = {
    labels: mensuales.map(item => {
      // item.mes debería ser una fecha (ej. "2025-01-01T00:00:00.000Z")
      const date = new Date(item.mes);
      return monthNames[date.getMonth()];
    }),
    datasets: [
      {
        label: "Gastos mensuales",
        data: mensuales.map(item => Number(item.total)),
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }
    ]
  };

  // Construir datos para gráfico de gastos por categoría.
  const datosCat = {
    labels: porCategoria.map(item => item["category.name"]), // Si usas raw: true, el nombre queda en esta propiedad.
    datasets: [
      {
        label: "Gastos por categoría",
        data: porCategoria.map(item => Number(item.total)),
        backgroundColor: "rgba(255, 99, 132, 0.6)"
      }
    ]
  };

  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <div className="p-3 border rounded">
          <h4 className="text-center">Gastos mensuales</h4>
          <Bar data={datosMes} />
        </div>
      </div>
      <div className="col-md-6 mb-3">
        <div className="p-3 border rounded">
          <h4 className="text-center">Gastos por categoría</h4>
          <Bar data={datosCat} />
        </div>
      </div>
    </div>
  );
};

export default Graficos;