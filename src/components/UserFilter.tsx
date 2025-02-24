interface UserFilterProps {
    filterRole: number
    setFilterRole: (val: number) => void
}

const UserFilter = (props : UserFilterProps) => {
  return (
    <div className="row gx-2 gy-1">
      <div className="mb-3 d-flex align-items-center">
        <label className="form-label me-3 ms-2" style={{ minWidth: "120px" }}><strong>Rol</strong></label>
        <select
          className="form-select form-select-sm"
          style={{ width: "200px" }}
          value={props.filterRole}
          onChange={u => props.setFilterRole(Number(u.target.value))}
        >
          <option value={0}>Todos</option>
          <option value={1}>User</option>
          <option value={2}>Admin</option>
        </select>
      </div>
    </div>
  )
}

export default UserFilter
