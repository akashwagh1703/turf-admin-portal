import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { roleService } from "../services/roleService";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", permissions: [] });

  useEffect(() => {
    roleService.getRoles().then(setRoles);
    roleService.getPermissions().then(setPermissions);
  }, []);

  const handleSave = () => {
    roleService.addRole(form).then((newRole) => {
      setRoles([...roles, newRole]);
      setShowModal(false);
      setForm({ name: "", permissions: [] });
    });
  };

  const handlePermissionChange = (perm) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Role & Permission Management</h3>
        <Button onClick={() => setShowModal(true)}>+ Add Role</Button>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Role</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.permissions.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Permissions</Form.Label>
              {permissions.map((perm) => (
                <Form.Check
                  key={perm}
                  type="checkbox"
                  label={perm}
                  checked={form.permissions.includes(perm)}
                  onChange={() => handlePermissionChange(perm)}
                />
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
