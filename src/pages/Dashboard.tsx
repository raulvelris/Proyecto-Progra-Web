import React from "react";
import ExpenseCharts from "../components/ExpenseCharts";

const Dashboard: React.FC = () => {
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <ExpenseCharts />
    </div>
  );
};

export default Dashboard;

