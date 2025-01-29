// import React from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Users from "./pages/Users"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="users" element={<Users />} />
        </Routes>
      </div>
    </div>
  )
}

export default App