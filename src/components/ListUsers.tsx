import React, {useState, useMemo, useEffect } from "react"
import { Table } from "react-bootstrap"
import { FaEdit, FaTrash, FaFilter, FaPlus } from "react-icons/fa"

import { getUsers, deleteUser } from "../services/userService"
import { User } from "../types/User"
import EditUserModal from "../pages/EditUserModal"
import DeleteUserModal from "../pages/DeleteUserModal"
import FilterUserModal from "../pages/FilterUserModal"
import AddUserModal from "../pages/AddUserModal"

const ListUsers: React.FC = () => {
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [filterRole, setFilterRole] = useState("")
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState<'edit' | 'delete' | 'filter' | 'add'>('edit')

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

    function handleAddUser() {
        const currentUsers = [...getUsers()]
        setAllUsers(currentUsers)
        closeModal()
    }
    
    const openModal = (user: User | null, type: 'edit' | 'delete' | 'filter' | 'add') => {
        setSelectedUser(user)
        setModalType(type)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedUser(null)
        setIsModalOpen(false)
    }

    return (
        <div className="table-section" style={{ minHeight: "80vh" }}>
            <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                <h2 className="table-title m-0">Mis usuarios</h2>
                <div>
                    <button onClick={() => openModal(null, 'filter')} className="btn btn-primary btn-lg me-4">
                        <FaFilter className="me-2" />
                        Filtrar
                    </button>
                    <button onClick={() => openModal(null, 'add')} className="btn btn-primary btn-lg me-4">
                        <FaPlus className="me-2" />
                        Agregar
                    </button>
                </div>
            </div>
            <div className="usertable-title">
                <Table className="custom-table" hover>
                    <thead>
                        <tr>
                            <th className="text-start">Id</th>
                            <th className="text-start">Nombre</th>
                            <th className="text-start">Correo</th>
                            <th className="text-start">Password</th>
                            <th className="text-start">Rol</th>
                            <th className="text-center">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td className="text-start">{String(user.id).padStart(3, '0')}</td>
                                <td className="text-start">{user.name}</td>
                                <td className="text-start">{user.email}</td>
                                <td className="text-start">{user.password}</td>
                                <td className="text-start">{user.role}</td>
                                <td className="text-center">
                                    <button onClick={() => openModal(user, 'edit')} className="btn">
                                        <FaEdit size={25}/>
                                    </button>
                                    <button onClick={() => openModal(user, 'delete')} className="btn">
                                        <FaTrash size={25}/>
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
                </Table>
            </div>
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
            {isModalOpen && modalType === 'add' && (
                <AddUserModal
                    closeModal={closeModal}
                    onSave={handleAddUser}
                />
            )}
        </div>
  )
}

export default ListUsers
