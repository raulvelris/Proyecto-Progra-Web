import React, { useState } from "react"
import { ListUserItem } from "./ListUsers"
import { Role } from "./AddUserModal"

interface EditUserModalProps {
  user: ListUserItem
  roles : Role[]
  closeModal: () => void
  onSave: (user: Omit<ListUserItem, 'id' | 'Role'>) => void;
}

const EditUserModal = (props : EditUserModalProps) => {
    const [userData, setUserData] = useState({
        name: props.user.name,
        email: props.user.email,
        password_hash: props.user.password_hash,
        role_id: props.user.role_id
    })

    function handleChange(u: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = u.target
        setUserData( prev => ({...prev, [name]: value }))
    }

     return (
        <div className="modal fade show d-flex align-items-center justify-content-center"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", minHeight: "100vh" }} aria-modal="true" role="dialog">
            <div className="modal-dialog" style={{ maxWidth: "450px", width: "100%" }}>
                <div className="modal-content rounded-5">
                    <div className="modal-header d-flex justify-content-center w-100 border-0">
                        <h4 className="modal-title">Editar Usuario</h4>
                    </div>
                    <form>
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
                                    name="password_hash"
                                    className="form-control"
                                    style={{ width: "200px" }}
                                    value={userData.password_hash}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 d-flex align-items-center">
                                <label className="form-label me-3 ms-2" style={{ minWidth: "120px" }}><strong>Rol usuario</strong></label>
                                <select
                                    name="role_id"
                                    className="form-select"
                                    style={{ width: "200px" }}
                                    value={userData.role_id}
                                    onChange={handleChange}
                                    >
                                    <option value={0}>----- Seleccionar -----</option>
                                    {
                                        props.roles.map((role : Role) => {
                                            return <option key={String(role.id)} value={role.id}>
                                                {role.name}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-center border-0">
                            <button type="button" className="btn btn-secondary mx-3" onClick={ () => props.closeModal()}>Cancelar</button>
                            <button type="submit" className="btn btn-primary mx-3" onClick={ () => props.onSave(userData)}>Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditUserModal