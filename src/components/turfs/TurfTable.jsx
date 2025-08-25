import React from "react";
import { Button, Table, Form } from "react-bootstrap";

const TurfTable = ({ turfs, onEdit, onToggle, onApprove }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Location</th>
          <th>Price (₹/hr)</th>
          <th>Status</th>
          <th>Approved</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {turfs.map((t, i) => (
          <tr key={t.id}>
            <td>{i + 1}</td>
            <td>{t.name}</td>
            <td>{`${t.location.state}, ${t.location.city}, ${t.location.village}`}</td>
            <td>{`Weekdays: ₹${t.pricePerHour.weekdays}, Weekends: ₹${t.pricePerHour.weekends}`}</td>
            <td>
              <Form.Check
                type="switch"
                id={`status-${t.id}`}
                label={t.status === "active" ? "Active" : "Inactive"}
                checked={t.status === "active"}
                onChange={() =>
                  onToggle(t.id, t.status === "active" ? "inactive" : "active")
                }
              />
            </td>
            <td>
              <Form.Check
                type="switch"
                id={`approve-${t.id}`}
                label={t.approved ? "Approved" : "Pending"}
                checked={t.approved}
                onChange={() => onApprove(t.id, !t.approved)}
              />
            </td>
            <td>
              <Button size="sm" variant="info" onClick={() => onEdit(t)}>
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TurfTable;
