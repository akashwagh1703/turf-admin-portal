import { useEffect, useState } from "react";
import * as userService from "../services/userService.js";

// Role Filter Component
function RoleFilter({ filterRole, setFilterRole }) {
  return (
    <div className="mb-2">
      <select
        className="form-select w-auto"
        value={filterRole}
        onChange={(e) => setFilterRole(e.target.value)}
      >
        <option value="All">All Roles</option>
        <option value="Super Admin">Super Admin</option>
        <option value="Turf Owner">Turf Owner</option>
        <option value="Support">Support</option>
      </select>
    </div>
  );
}

// Users Table Component
function UsersTable({ users, onEdit, toggleStatus, resetPassword }) {
  return (
    <div className="card shadow-sm">
      <div className="table-responsive">
        <table className="table mb-0 align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} onDoubleClick={() => onEdit(u)}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className="badge bg-primary">{u.role}</span>
                </td>
                <td>
                  {u.status === "Active" ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-danger">Inactive</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => toggleStatus(u.id)}
                  >
                    {u.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    className="btn btn-sm btn-secondary me-2"
                    onClick={() => resetPassword(u.id)}
                  >
                    Reset Password
                  </button>
                  <button className="btn btn-sm btn-info">Logs</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserModal({ show, handleClose, user, setUser, onSave }) {
  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      aria-hidden={!show}
      style={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {user?.id ? "Edit User" : "Create New User"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            {/* Name */}
            <div className="mb-2">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            {/* Phone */}
            <div className="mb-2">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>

            {/* Role */}
            <div className="mb-2">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Turf Owner">Turf Owner</option>
                <option value="Support">Support</option>
              </select>
            </div>

            {/* Conditional fields */}
            {user.role === "Turf Owner" && (
              <div className="mb-2">
                <label className="form-label">Turf Name</label>
                <input
                  className="form-control"
                  value={user.turfName}
                  onChange={(e) =>
                    setUser({ ...user, turfName: e.target.value })
                  }
                />
              </div>
            )}

            {user.role === "Support" && (
              <div className="mb-2">
                <label className="form-label">Permissions</label>
                <select
                  className="form-select"
                  multiple
                  value={user.permissions}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      permissions: Array.from(
                        e.target.selectedOptions,
                        (opt) => opt.value
                      ),
                    })
                  }
                >
                  <option value="View Tickets">View Tickets</option>
                  <option value="Resolve Tickets">Resolve Tickets</option>
                  <option value="Escalate Issues">Escalate Issues</option>
                </select>
                <small className="text-muted">
                  Hold Ctrl (Windows) or Cmd (Mac) to select multiple.
                </small>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onSave}>
              {user?.id ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Users Component
export default function Users() {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formUser, setFormUser] = useState({
    name: "",
    email: "",
    role: "Turf Owner",
    phone: "",
    turfName: "",
    permissions: [],
  });

  useEffect(() => {
    userService.listUsers().then(setUsers);
  }, []);

  const filteredUsers =
    filterRole === "All" ? users : users.filter((u) => u.role === filterRole);

  const openForm = (user = null) => {
    setEditingUser(user);
    setFormUser(
      user || {
        name: "",
        email: "",
        role: "Turf Owner",
        phone: "",
        turfName: "",
        permissions: [],
      }
    );
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
    setFormUser({
      name: "",
      email: "",
      role: "Turf Owner",
      phone: "",
      turfName: "",
      permissions: [],
    });
  };

  const handleSaveUser = () => {
    if (editingUser) {
      userService.updateUser(editingUser.id, formUser).then((updated) => {
        setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
        handleCloseForm();
      });
    } else {
      userService.createUser(formUser).then((newU) => {
        setUsers([...users, newU]);
        handleCloseForm();
      });
    }
  };

  const toggleStatus = (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const newStatus = user.status === "Active" ? "Inactive" : "Active";
    userService.updateUser(id, { status: newStatus }).then((updated) => {
      setUsers(users.map((u) => (u.id === id ? updated : u)));
    });
  };

  const resetPassword = (id) => {
    userService.resetPassword(id).then((res) => alert(res.message));
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Users Management</h5>
        <button className="btn btn-primary btn-sm" onClick={() => openForm()}>
          + New User
        </button>
      </div>

      <RoleFilter filterRole={filterRole} setFilterRole={setFilterRole} />

      <UsersTable
        users={filteredUsers}
        onEdit={openForm}
        toggleStatus={toggleStatus}
        resetPassword={resetPassword}
      />

      <UserModal
        show={showForm}
        handleClose={handleCloseForm}
        user={formUser}
        setUser={setFormUser}
        onSave={handleSaveUser}
      />
    </div>
  );
}
