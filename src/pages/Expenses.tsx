import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { getExpenses, deleteExpense } from "../services/expenseService";
import { Expense } from "../types/Expense";
import ExpenseFilter from "../components/ExpenseFilter";

const Expenses: React.FC = () => {
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterAmount, setFilterAmount] = useState<number | null>(null);

  useEffect(() => {
    setAllExpenses(getExpenses());
  }, []);

  const filteredExpenses = useMemo(() => {
    return allExpenses.filter((exp) => {
      const matchCat = !filterCategory || exp.category === filterCategory;
      const matchDate = !filterDate || exp.date === filterDate;
      const matchAmount = filterAmount === null || exp.amount === filterAmount;
      return matchCat && matchDate && matchAmount;
    });
  }, [allExpenses, filterCategory, filterDate, filterAmount]);

  const handleDelete = (id: number) => {
    if (window.confirm("¿Está seguro de eliminar?")) {
      deleteExpense(id);
      setAllExpenses(getExpenses());
    }
  };

  return (
    <div className="container mt-4">
      <h2>Mis Gastos</h2>

      <div className="d-flex justify-content-between align-items-center my-3">
        <ExpenseFilter
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          filterAmount={filterAmount}
          setFilterAmount={setFilterAmount}
        />
        <button className="btn btn-primary">+ Agregar</button>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Fecha</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.date}</td>
              <td>{exp.category}</td>
              <td>{exp.description}</td>
              <td>S/. {exp.amount.toFixed(2)}</td>
              <td>
                <Link
                  to={`/app/expenses/edit/${exp.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  &#9998;
                </Link>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="btn btn-danger btn-sm"
                >
                  &#128465;
                </button>
              </td>
            </tr>
          ))}
          {filteredExpenses.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
