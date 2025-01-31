import React, { useState } from "react"
import UserFilter from '../components/UserFilter'

interface FilterUserModalProps {
  filterRole: string
  setFilterRole: (val: string) => void
  closeModal: () => void
}

const FilterUserModal: React.FC<FilterUserModalProps> =  ({ closeModal, filterRole, setFilterRole }) => {
    const [selectedRole, setSelectedRole] = useState(filterRole)


    function handleApplyFilter() {
        setFilterRole(selectedRole)
        closeModal()
    }
    return (
        <div className="modal fade show d-flex align-items-center justify-content-center"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", minHeight: "100vh" }} aria-modal="true" role="dialog">
            <div className="modal-dialog" style={{ maxWidth: "450px", width: "100%" }}>
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center w-100 border-0">
                        <h4 className="modal-title">Filtrar por rol de usuario</h4>
                    </div>
                    <div className="modal-body text-center">
                        <UserFilter
                            filterRole={selectedRole}
                            setFilterRole={setSelectedRole}
                        />
                    </div>
                    <div className="modal-footer justify-content-center border-0">
                        <button type="button" className="btn btn-secondary mx-3" onClick={closeModal}>Cancelar</button>
                        <button type="button" className="btn btn-primary mx-3" onClick={handleApplyFilter}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterUserModal