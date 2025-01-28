import React, {useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaEdit, FaTrash, FaFilter } from "react-icons/fa"
import { getUsers, deleteUser } from "../services/userService"
import { User } from "../types/User"
import UserFilter from "../components/UserFilter"

const Users: React.FC = () => {
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [filterRole, setFilterRole] = useState("")

    useEffect(() => {
        setAllUsers(getUsers())
    }, [])

    const filteredUsers = useMemo(() => {
        return allUsers.filter(e => {
            const roleOk = !filterRole || e.role === filterRole
            return roleOk
        })
    }, [allUsers, filterRole])


    function handleDelete(id: number) {
        if (window.confirm("¿Eliminar este usuario?")) {
            deleteUser(id)
            setAllUsers(getUsers())
        }
    }

// const UserTable: React.FC = () => {
  return (
    <div className="container mt-4">
        <h2>Mis usuarios</h2>
        <div className="d-flex justify-content-end my-3">
            <UserFilter
                filterRole={filterRole}
                setFilterRole={setFilterRole}
            />
            <button className="btn btn-primary me-2">
                <FaFilter className="me-2" />
                Filtrar
            </button>
            <button className="btn btn-success">+ Agregar</button>
        </div>
        <table className="table table-bordered">
            <thead className="table-light">
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Password</th>
                    <th>Rol</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.role}</td>
                        <td>
                            <Link to={`/app/users/edit/${user.id}`} className="btn btn-sm btn-warning me-2">
                                <FaEdit />
                            </Link>
                            <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger">
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
                {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">No hay usuarios</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
