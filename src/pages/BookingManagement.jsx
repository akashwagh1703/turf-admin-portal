import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { useAuth } from "../store/AuthContext";
import { getBookings, updateBookingStatus } from "../services/bookingService";
import { getTurfs } from "../services/turfService";

export default function BookingManagement() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Get all turfs first
      const turfData = await getTurfs(user);
      setTurfs(turfData);

      // Get bookings filtered by role/turf
      const bookingData = await getBookings(user, turfData);
      setBookings(bookingData);
    }
    fetchData();
  }, [user]);

  const handleStatusChange = async (id, status) => {
    const updated = await updateBookingStatus(id, status);
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: updated.status } : b))
    );
  };

  return (
    <Container className="py-3">
      <h2>Bookings</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Turf</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            {user.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={b.id}>
              <td>{i + 1}</td>
              <td>{b.customer}</td>
              <td>{b.turf}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>{b.status}</td>
              {user.role === "admin" && (
                <td>
                  <Form.Select
                    value={b.status}
                    onChange={(e) => handleStatusChange(b.id, e.target.value)}
                  >
                    <option>Confirmed</option>
                    <option>Pending</option>
                    <option>Cancelled</option>
                  </Form.Select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
