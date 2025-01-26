import React from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import EditExpense from "./pages/EditExpense"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="expenses/edit/:id" element={<EditExpense />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
