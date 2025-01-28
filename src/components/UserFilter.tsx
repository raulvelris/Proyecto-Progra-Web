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
      <div className="col-auto">
        <label className="form-label mb-0">Rol:</label>
        <select
          className="form-select form-select-sm"
          value={filterRole}
          onChange={u => setFilterRole(u.target.value)}
        >
          <option value="">Todas</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
    </div>
  )
}

export default UserFilter
