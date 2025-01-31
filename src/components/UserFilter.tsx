interface Props {
    filterRole: string
    setFilterRole: (val: string) => void
}

function UserFilter({
    filterRole,
    setFilterRole
}: Props) {

  return (
    <div className="row gx-2 gy-1">
      <div className="mb-3 d-flex align-items-center">
        <label className="form-label me-3 ms-2" style={{ minWidth: "120px" }}><strong>Rol</strong></label>
        <select
          className="form-select form-select-sm"
          style={{ width: "200px" }}
          value={filterRole}
          onChange={u => setFilterRole(u.target.value)}
        >
          <option value="">Todos</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
    </div>
  )
}

export default UserFilter
