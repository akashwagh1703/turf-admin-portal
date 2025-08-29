import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Trash2 } from "lucide-react";

const PlanModal = ({ show, handleClose, onSave, plan }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(plan || { name: '', commissionPercent: 0, subscriptionFee: 0, billingCycle: 'Monthly', features: [] });
    }, [plan]);

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({...formData, features: newFeatures});
    }

    const addFeature = () => setFormData({...formData, features: [...formData.features, '']});
    const removeFeature = (index) => setFormData({...formData, features: formData.features.filter((_, i) => i !== index)});
    
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton><Modal.Title>{plan ? 'Edit Plan' : 'Add New Plan'}</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3"><Form.Label>Plan Name</Form.Label><Form.Control value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></Form.Group>
                    <Row>
                        <Col><Form.Group className="mb-3"><Form.Label>Subscription Fee (₹)</Form.Label><Form.Control type="number" value={formData.subscriptionFee || 0} onChange={e => setFormData({...formData, subscriptionFee: Number(e.target.value)})} /></Form.Group></Col>
                        <Col><Form.Group className="mb-3"><Form.Label>Commission (%)</Form.Label><Form.Control type="number" value={formData.commissionPercent || 0} onChange={e => setFormData({...formData, commissionPercent: Number(e.target.value)})} /></Form.Group></Col>
                    </Row>
                    <Form.Group className="mb-3"><Form.Label>Billing Cycle</Form.Label><Form.Select value={formData.billingCycle} onChange={e => setFormData({...formData, billingCycle: e.target.value})}><option>Per Booking</option><option>Monthly</option><option>Yearly</option></Form.Select></Form.Group>
                    <Form.Group className="mb-3"><Form.Label>Features</Form.Label>
                        {formData.features?.map((f, i) => (
                            <div key={i} className="d-flex gap-2 mb-2">
                                <Form.Control value={f} onChange={e => handleFeatureChange(i, e.target.value)} />
                                <Button variant="outline-danger" onClick={() => removeFeature(i)}><Trash2 size={16} /></Button>
                            </div>
                        ))}
                        <Button variant="outline-secondary" size="sm" onClick={addFeature}>Add Feature</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={() => onSave(formData)}>Save Plan</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PlanModal;
