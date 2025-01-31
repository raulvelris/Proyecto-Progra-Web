import React, { useState } from "react"
import { updateUser } from "../services/userService"
import { User } from "../types/User"

interface EditUserModalProps {
  user: User
  closeModal: () => void
  onSave: () => void
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, closeModal, onSave }) => {
  const [userData, setUserData] = useState<User>(user)

  function handleChange(u: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = u.target
    setUserData( prev => ({...prev, [name]: value }))
  }

  function handleSubmit(u: React.FormEvent) {
    u.preventDefault()
    updateUser(userData)
    onSave()
    closeModal()
  }

  return (
    <div className="modal fade show d-flex align-items-center justify-content-center"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", minHeight: "100vh" }} aria-modal="true" role="dialog">
        <div className="modal-dialog" style={{ maxWidth: "450px", width: "100%" }}>
            <div className="modal-content rounded-5">
                <div className="modal-header d-flex justify-content-center w-100 border-0">
                    <h4 className="modal-title">Editar Usuario</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="mb-3 d-flex align-items-center">
                            <label className="form-label me-3 ms-2" style={{ minWidth: "120px" }}><strong>Nombre</strong></label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                style={{ width: "200px" }}
                                value={userData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="form-label me-3 ms-2" style={{ minWidth: "120px" }}><strong>Correo</strong></label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                style={{ width: "200px" }}
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="form-label me-3 ms-2" style={{ minWidth: "120px" }}><strong>Contraseña</strong></label>
                            <input
                                type="text"
                                name="password"
                                className="form-control"
                                style={{ width: "200px" }}
                                value={userData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label className="form-label me-3 ms-2" style={{ minWidth: "120px" }}><strong>Rol usuario</strong></label>
                            <select
                                name="role"
                                className="form-select"
                                style={{ width: "200px" }}
                                value={userData.role}
                                onChange={handleChange}
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer justify-content-center border-0">
                        <button type="button" className="btn btn-secondary mx-3" onClick={closeModal}>Cancelar</button>
                        <button type="submit" className="btn btn-primary mx-3">Aceptar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)
}

export default EditUserModal