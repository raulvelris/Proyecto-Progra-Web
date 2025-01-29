import React, {useState, useMemo, useEffect } from "react"
import { FaEdit, FaTrash, FaFilter } from "react-icons/fa"
import { getUsers, deleteUser } from "../services/userService"
import { User } from "../types/User"
import EditUserModal from "./EditUserModal"
import DeleteUserModal from "./DeleteUserModal"
import FilterUserModal from "./FilterUserModal"

const Users: React.FC = () => {
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [filterRole, setFilterRole] = useState("")
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState<'edit' | 'delete' | 'filter'>('edit')

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
        deleteUser(id)
        setAllUsers(getUsers())
        closeModal()
    }

    const openModal = (user: User | null, type: 'edit' | 'delete' | 'filter') => {
        setSelectedUser(user)
        setModalType(type)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedUser(null)
        setIsModalOpen(false)
    }

    return (
        <div className="container mt-4">
            <h2>Mis usuarios</h2>
            <div className="d-flex justify-content-end my-3">
                <button onClick={() => openModal(null, 'filter')} className="btn btn-primary me-4">
                    <FaFilter className="me-2" />
                    Filtrar
                </button>
                <button className="btn btn-primary me-2">+ Agregar</button>
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
                                <button onClick={() => openModal(user, 'edit')} className="btn btn-sm btn-warning me-2">
                                    <FaEdit />
                                </button>
                                <button onClick={() => openModal(user, 'delete')} className="btn btn-sm btn-danger">
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
            {isModalOpen && selectedUser && modalType === 'edit' && (
                <EditUserModal
                    user={selectedUser}
                    closeModal={closeModal}
                    onSave={() => {
                        setAllUsers(getUsers())
                        closeModal()
                    }}
                />
            )}
            {isModalOpen && selectedUser && modalType === 'delete' && (
                <DeleteUserModal
                    closeModal={closeModal}
                    onDelete={() => {
                        handleDelete(selectedUser.id)
                        closeModal()
                    }}
                />
            )}
            {isModalOpen && modalType === 'filter' && (
                <FilterUserModal
                    closeModal={closeModal}
                    filterRole={filterRole}
                    setFilterRole={setFilterRole}
                />
            )}
        </div>
  )
}

export default Users
