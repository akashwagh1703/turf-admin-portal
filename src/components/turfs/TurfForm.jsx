import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const TurfForm = ({ show, handleClose, onSave, turf }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: { state: "", city: "", village: "", latitude: "", longitude: "" },
    pricePerHour: { weekdays: 0, weekends: 0 },
    media: { photos: [], videos: [], gifs: [], documents: [] },
    amenities: {
      lighting: false,
      parking: false,
      seating: false,
      refreshments: false,
    },
    status: "active",
  });

  useEffect(() => {
    if (turf) setFormData(turf);
  }, [turf]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["state", "city", "village", "latitude", "longitude"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else if (["weekdays", "weekends"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        pricePerHour: { ...prev.pricePerHour, [name]: Number(value) },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      amenities: { ...prev.amenities, [name]: checked },
    }));
  };

  const handleFileChange = (e, type) => {
    setFormData((prev) => ({
      ...prev,
      media: { ...prev.media, [type]: Array.from(e.target.files) },
    }));
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{turf ? "Edit Turf" : "Add New Turf"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-2">
            <Col md={4}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Col>
            <Col md={4}>
              <Form.Label>State</Form.Label>
              <Form.Control
                name="state"
                value={formData.location.state}
                onChange={handleChange}
              />
            </Col>
            <Col md={4}>
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={formData.location.city}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={4}>
              <Form.Label>Village</Form.Label>
              <Form.Control
                name="village"
                value={formData.location.village}
                onChange={handleChange}
              />
            </Col>
            <Col md={4}>
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                name="latitude"
                value={formData.location.latitude}
                onChange={handleChange}
                type="number"
              />
            </Col>
            <Col md={4}>
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                name="longitude"
                value={formData.location.longitude}
                onChange={handleChange}
                type="number"
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={6}>
              <Form.Label>Weekday Price</Form.Label>
              <Form.Control
                name="weekdays"
                value={formData.pricePerHour.weekdays}
                onChange={handleChange}
                type="number"
              />
            </Col>
            <Col md={6}>
              <Form.Label>Weekend Price</Form.Label>
              <Form.Control
                name="weekends"
                value={formData.pricePerHour.weekends}
                onChange={handleChange}
                type="number"
              />
            </Col>
          </Row>
          <Form.Group className="mb-2">
            <Form.Label>Amenities</Form.Label>
            <div className="d-flex flex-wrap">
              {Object.keys(formData.amenities).map((a) => (
                <Form.Check
                  key={a}
                  type="checkbox"
                  label={a.charAt(0).toUpperCase() + a.slice(1)}
                  name={a}
                  checked={formData.amenities[a]}
                  onChange={handleAmenityChange}
                  className="me-3"
                />
              ))}
            </div>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Photos</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, "photos")}
              accept="image/*"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Videos</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, "videos")}
              accept="video/*"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>GIFs</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, "gifs")}
              accept="image/gif"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Documents</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, "documents")}
              accept=".pdf,.doc,.docx"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSave(formData)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TurfForm;
