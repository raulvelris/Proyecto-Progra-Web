import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { getExpenses } from "../services/expenseService";
import { Expense } from "../types/Expense";

function getMonthIndex(dmy: string): number {
  const [day, month, year] = dmy.split("-");
  return parseInt(month) - 1;
}

const ExpenseCharts: React.FC = () => {
  const expenses = getExpenses();

  const monthlyData = useMemo(() => {
    const monthMap: Record<string, number> = {
      Ene: 0, Feb: 0, Mar: 0, Abr: 0, May: 0, Jun: 0,
      Jul: 0, Ago: 0, Sep: 0, Oct: 0, Nov: 0, Dic: 0
    };
    const monthNames = Object.keys(monthMap);

    expenses.forEach((exp: Expense) => {
      const idx = getMonthIndex(exp.date);
      const mName = monthNames[idx] || "?";
      monthMap[mName] += exp.amount;
    });

    return {
      labels: Object.keys(monthMap),
      datasets: [
        {
          label: "Gastos mensuales",
          data: Object.values(monthMap),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    };
  }, [expenses]);

  const categoryData = useMemo(() => {
    const catMap: Record<string, number> = {};
    expenses.forEach((exp) => {
      catMap[exp.category] = (catMap[exp.category] || 0) + exp.amount;
    });
    return {
      labels: Object.keys(catMap),
      datasets: [
        {
          label: "Gastos por categoría",
          data: Object.values(catMap),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
      ],
    };
  }, [expenses]);

  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <div className="p-3 border rounded">
          <h4 className="text-center">Gastos mensuales</h4>
          <Bar data={monthlyData} />
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <div className="p-3 border rounded">
          <h4 className="text-center">Gastos por categoría</h4>
          <Bar data={categoryData} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseCharts;
