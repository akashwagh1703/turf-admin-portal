import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const PromoCodeModal = ({ show, handleClose, onSave, promo, plans }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(promo || {
      code: "",
      discountPercent: 10,
      expiry: "",
      maxUsage: 100,
      used: 0,
      applicablePlans: [],
      newUsersOnly: false,
    });
  }, [promo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handlePlanChange = (planId) => {
    const newPlans = formData.applicablePlans.includes(planId)
      ? formData.applicablePlans.filter(id => id !== planId)
      : [...formData.applicablePlans, planId];
    setFormData(prev => ({ ...prev, applicablePlans: newPlans }));
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{promo ? "Edit Promo Code" : "Add New Promo Code"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Promo Code</Form.Label>
                <Form.Control name="code" value={formData.code || ''} onChange={handleChange} placeholder="e.g., WELCOME10" disabled={!!promo} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Discount (%)</Form.Label>
                <Form.Control name="discountPercent" type="number" value={formData.discountPercent || 0} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control name="expiry" type="date" value={formData.expiry || ''} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Max Usage</Form.Label>
                <Form.Control name="maxUsage" type="number" value={formData.maxUsage || 0} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Applicable Plans</Form.Label>
                <div className="d-flex flex-wrap gap-3">
                  {plans.map(p => (
                    <Form.Check key={p.id} type="checkbox" id={`plan-${p.id}`} label={p.name} checked={formData.applicablePlans?.includes(p.id)} onChange={() => handlePlanChange(p.id)} />
                  ))}
                </div>
              </Form.Group>
            </Col>
             <Col xs={12}>
                <Form.Check type="switch" id="new-users-only" label="For New Users Only" name="newUsersOnly" checked={formData.newUsersOnly} onChange={handleChange} />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={() => onSave(formData)}>Save Promo Code</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PromoCodeModal;
