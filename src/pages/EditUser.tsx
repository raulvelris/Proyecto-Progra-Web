import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getUserById, updateUser } from "../services/userService"
import { User } from "../types/User"

function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const parsedId = Number(id)
    if (!parsedId) {
      navigate("/app/users")
      return
    }
    const found = getUserById(parsedId)
    if (!found) {
      navigate("/app/users")
      return
    }
    setUserData(found)
  }, [id, navigate])

  function handleChange(u: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (!userData) return
    let value: string = u.target.value
    setUserData({ ...userData, [u.target.name]: value })
  }

  function handleSubmit(u: React.FormEvent) {
    u.preventDefault()
    if (!userData) return
    updateUser(userData)
    alert("Usuario actualizado correctamente")
    navigate("/app/users")
  }

  if (!userData) {
    return <div className="container mt-4">Cargando...</div>
  }

  return (
    <div className="container mt-4">
      <h2>Editar Usuario</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Correo</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Rol usuario</label>
          <select
            name="role"
            className="form-select"
            value={userData.role}
            onChange={handleChange}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <dialog></dialog>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUser
