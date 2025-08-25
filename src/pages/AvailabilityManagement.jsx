import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import { getTurfs } from "../services/turfService";
import {
  getAvailability,
  updateAvailability,
  toggleSlot,
} from "../services/availabilityService";
import { useAuth } from "../store/AuthContext";

export default function AvailabilityManagement() {
  const { user } = useAuth();
  const [turfs, setTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [slots, setSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [slotData, setSlotData] = useState({
    date: "",
    time: "",
    pricePerHour: 0,
    minBookingHours: 1,
    status: "available",
  });

  useEffect(() => {
    async function fetchData() {
      const turfData = await getTurfs(user);
      setTurfs(turfData);
    }
    fetchData();
  }, [user]);

  const handleSelectTurf = async (turf) => {
    setSelectedTurf(turf);
    const data = await getAvailability(turf.id);
    setSlots(data);
  };

  const handleSaveSlot = async () => {
    const updated = await updateAvailability(selectedTurf.id, slotData);
    setSlots((prev) => {
      const index = prev.findIndex(
        (s) => s.date === updated.date && s.time === updated.time
      );
      if (index >= 0) prev[index] = updated;
      else prev.push(updated);
      return [...prev];
    });
    setShowModal(false);
  };

  const handleToggleSlot = async (slot) => {
    const newStatus = slot.status === "available" ? "blocked" : "available";
    const updated = await toggleSlot(
      selectedTurf.id,
      slot.date,
      slot.time,
      newStatus
    );
    setSlots(
      slots.map((s) =>
        s.date === updated.date && s.time === updated.time ? updated : s
      )
    );
  };

  return (
    <Container className="py-3">
      <h2>Availability & Pricing</h2>

      <Form.Select
        onChange={(e) =>
          handleSelectTurf(turfs.find((t) => t.id === parseInt(e.target.value)))
        }
      >
        <option>Select Turf</option>
        {turfs.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </Form.Select>

      {selectedTurf && (
        <>
          <Button className="my-3" onClick={() => setShowModal(true)}>
            + Add Slot
          </Button>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price/Hour (₹)</th>
                <th>Min Booking Hours</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((s, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{s.date}</td>
                  <td>{s.time}</td>
                  <td>{s.pricePerHour}</td>
                  <td>{s.minBookingHours}</td>
                  <td>{s.status}</td>
                  <td>
                    <Button size="sm" onClick={() => handleToggleSlot(s)}>
                      {s.status === "available" ? "Block" : "Unblock"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add / Edit Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={slotData.date}
                onChange={(e) =>
                  setSlotData({ ...slotData, date: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Time (HH:MM-HH:MM)</Form.Label>
              <Form.Control
                type="text"
                value={slotData.time}
                onChange={(e) =>
                  setSlotData({ ...slotData, time: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Price per Hour (₹)</Form.Label>
              <Form.Control
                type="number"
                value={slotData.pricePerHour}
                onChange={(e) =>
                  setSlotData({
                    ...slotData,
                    pricePerHour: parseInt(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Minimum Booking Hours</Form.Label>
              <Form.Control
                type="number"
                value={slotData.minBookingHours}
                onChange={(e) =>
                  setSlotData({
                    ...slotData,
                    minBookingHours: parseInt(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveSlot}>
            Save Slot
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
