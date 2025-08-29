import { useEffect, useState } from "react";
import * as planService from "../services/planService.js";
import { useAuth } from "../store/AuthContext";
import { Form, Row, Col, Button, Modal, Table } from "react-bootstrap";
import { DollarSign, Tag, Users, Plus, Edit, Trash2, CheckCircle } from "lucide-react";
import StatusBadge from "../components/common/StatusBadge.jsx";
import PlanModal from "../components/plans/PlanModal.jsx";
import PromoCodeModal from "../components/plans/PromoCodeModal.jsx";

// ---------------- Tabs ----------------
function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "Plans", label: "Subscription Plans", icon: <DollarSign size={16} /> },
    { key: "Turf Owners", label: "Owner Subscriptions", icon: <Users size={16} /> },
    { key: "Promo Codes", label: "Promo Codes", icon: <Tag size={16} /> },
  ];
  return (
    <ul className="nav custom-tabs">
      {tabs.map((tab) => (
        <li className="nav-item" key={tab.key}>
          <button
            className={`nav-link d-flex align-items-center gap-2 ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon} {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

// ---------------- Plans Tab ----------------
function PlansTab({ plans, onEdit, onAdd }) {
    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
                <Button onClick={onAdd} className="d-flex align-items-center gap-2"><Plus size={18} /> Add New Plan</Button>
            </div>
            <Row className="g-4">
                {plans.map(plan => (
                    <Col md={6} lg={4} key={plan.id}>
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{plan.name}</h5>
                                <h3 className="mb-3">
                                    {plan.subscriptionFee > 0 ? `₹${plan.subscriptionFee}` : `${plan.commissionPercent}%`}
                                    <span className="fs-6 text-muted">/{plan.billingCycle}</span>
                                </h3>
                                <ul className="list-unstyled mb-4 flex-grow-1">
                                    {plan.features.map(f => <li key={f} className="d-flex align-items-center gap-2 mb-2"><CheckCircle size={16} className="text-success"/> {f}</li>)}
                                </ul>
                                <Button variant="outline-primary" onClick={() => onEdit(plan)}>Edit Plan</Button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

// ---------------- Owners Tab ----------------
function OwnersTab({ owners, plans, onAssign }) {
    return (
        <div className="table-responsive">
            <Table className="mb-0 table-hover">
                <thead>
                    <tr>
                        <th>Owner Name</th>
                        <th>Current Plan</th>
                        <th>Status</th>
                        <th>Joined Date</th>
                        <th>Next Billing</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map(owner => {
                        const plan = plans.find(p => p.id === owner.planId);
                        return (
                            <tr key={owner.id}>
                                <td><strong>{owner.name}</strong></td>
                                <td>{plan ? plan.name : 'N/A'}</td>
                                <td><StatusBadge status={owner.status} /></td>
                                <td>{owner.joinedDate}</td>
                                <td>{owner.nextBillingDate || 'N/A'}</td>
                                <td>
                                    <Form.Select size="sm" onChange={(e) => onAssign(owner.id, parseInt(e.target.value))} defaultValue={owner.planId}>
                                        <option>Change Plan...</option>
                                        {plans.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </Form.Select>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}

// ---------------- Promo Codes Tab ----------------
function PromoCodesTab({ codes, onEdit, onAdd }) {
    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
                <Button onClick={onAdd} className="d-flex align-items-center gap-2"><Plus size={18} /> Add Promo Code</Button>
            </div>
            <div className="table-responsive">
                <Table className="mb-0 table-hover">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Expiry</th>
                            <th>Usage</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {codes.map(code => {
                            const isExpired = new Date(code.expiry) < new Date();
                            const status = isExpired ? 'Expired' : 'Active';
                            return (
                                <tr key={code.code}>
                                    <td><span className="badge bg-primary-subtle text-primary-emphasis p-2 font-monospace">{code.code}</span></td>
                                    <td>{code.discountPercent}%</td>
                                    <td>{code.expiry}</td>
                                    <td>{code.used} / {code.maxUsage}</td>
                                    <td><StatusBadge status={status} /></td>
                                    <td><button className="icon-button" onClick={() => onEdit(code)}><Edit size={16} /></button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

// ---------------- Main RevenuePlans ----------------
export default function RevenuePlans() {
  const { user } = useAuth();
  const role = user?.role.toLowerCase();
  const [plans, setPlans] = useState([]);
  const [turfOwners, setTurfOwners] = useState([]);
  const [promoCodes, setPromoCodes] = useState([]);
  const [activeTab, setActiveTab] = useState("Plans");
  const [loading, setLoading] = useState(true);

  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const [showPromoModal, setShowPromoModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [allPlans, owners, codes] = await Promise.all([
        planService.listPlans(),
        role === "admin" ? planService.listTurfOwners() : [],
        planService.listPromoCodes(),
      ]);
      setPlans(allPlans);
      setTurfOwners(owners);
      setPromoCodes(codes);
      setLoading(false);
    }
    fetchData();
  }, [role, user]);

  const handleOpenPlanModal = (plan = null) => {
    setEditingPlan(plan);
    setShowPlanModal(true);
  }
  
  const handleSavePlan = async (plan) => {
    await planService.savePlan(plan);
    const updatedPlans = await planService.listPlans();
    setPlans(updatedPlans);
    setShowPlanModal(false);
  }

  const handleAssignPlan = async (ownerId, planId) => {
    await planService.assignPlan(ownerId, planId);
    const updatedOwners = await planService.listTurfOwners();
    setTurfOwners(updatedOwners);
    alert('Plan assigned successfully!');
  }
  
  const handleOpenPromoModal = (promo = null) => {
    setEditingPromo(promo);
    setShowPromoModal(true);
  }

  const handleSavePromoCode = async (promo) => {
    await planService.savePromoCode(promo);
    const updatedCodes = await planService.listPromoCodes();
    setPromoCodes(updatedCodes);
    setShowPromoModal(false);
  }

  const renderContent = () => {
    if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary"></div></div>;

    switch(activeTab) {
        case "Plans": return <PlansTab plans={plans} onEdit={handleOpenPlanModal} onAdd={() => handleOpenPlanModal()} />;
        case "Turf Owners": 
            return role === 'admin' ? <OwnersTab owners={turfOwners} plans={plans} onAssign={handleAssignPlan} /> : <p>This section is for Admins only.</p>;
        case "Promo Codes": return <PromoCodesTab codes={promoCodes} onEdit={handleOpenPromoModal} onAdd={() => handleOpenPromoModal()} />;
        default: return null;
    }
  }

  return (
    <div className="container-fluid p-0">
      <div className="page-header">
        <h3>Revenue & Plan Management</h3>
        <p className="text-muted">Manage pricing models, subscriptions, and promotional codes.</p>
      </div>

      {role === 'admin' && <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />}

      <div className="card">
        <div className="card-body">
          {renderContent()}
        </div>
      </div>

      {showPlanModal && (
        <PlanModal 
            show={showPlanModal} 
            handleClose={() => setShowPlanModal(false)}
            onSave={handleSavePlan}
            plan={editingPlan}
        />
      )}

      {showPromoModal && (
        <PromoCodeModal
            show={showPromoModal}
            handleClose={() => setShowPromoModal(false)}
            onSave={handleSavePromoCode}
            promo={editingPromo}
            plans={plans}
        />
      )}
    </div>
  );
}
