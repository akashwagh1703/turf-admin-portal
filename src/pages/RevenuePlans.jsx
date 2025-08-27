import { useEffect, useState } from "react";
import * as planService from "../services/planService.js";
import { useAuth } from "../store/AuthContext";

// ---------------- Plan Form ----------------
function PlanForm({ plan, setPlan, onSave, role }) {
  const handleChange = (key, value) => setPlan({ ...plan, [key]: value });

  return (
    <div className="card p-3 shadow-sm mb-3">
      <h6 className="mb-3">Plan Details</h6>
      <input
        className="form-control mb-2"
        placeholder="Plan Name"
        value={plan.name || ""}
        onChange={(e) => handleChange("name", e.target.value)}
        disabled={role !== "admin"}
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Commission %"
        value={plan.commissionPercent || 0}
        onChange={(e) =>
          handleChange("commissionPercent", Number(e.target.value))
        }
        disabled={role !== "admin"}
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Subscription Fee"
        value={plan.subscriptionFee || 0}
        onChange={(e) =>
          handleChange("subscriptionFee", Number(e.target.value))
        }
        disabled={role !== "admin"}
      />
      <select
        className="form-select mb-2"
        value={plan.billingCycle || ""}
        onChange={(e) => handleChange("billingCycle", e.target.value)}
        disabled={role !== "admin"}
      >
        <option value="">-- Billing Cycle --</option>
        <option value="Per Booking">Per Booking</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
      <textarea
        className="form-control mb-2"
        placeholder="Features (comma separated)"
        value={plan.features?.join(", ") || ""}
        onChange={(e) =>
          handleChange(
            "features",
            e.target.value.split(",").map((f) => f.trim())
          )
        }
        disabled={role !== "admin"}
      />
      {role === "admin" && (
        <button className="btn btn-primary w-100" onClick={() => onSave(plan)}>
          💾 Save Plan
        </button>
      )}
    </div>
  );
}

// ---------------- Turf Owner Plans ----------------
function TurfOwnerPlans({ turfOwners, plans, onAssign, role }) {
  const [selected, setSelected] = useState({});

  const handleChange = (ownerId, planId) =>
    setSelected({ ...selected, [ownerId]: planId });

  return (
    <div>
      {turfOwners.map((t) => (
        <div key={t.id} className="card p-2 mb-2 shadow-sm d-flex flex-row align-items-center justify-content-between">
          <span>
            <strong>{t.name}</strong> ({t.status}) <br />
            <small className="text-muted">
              Next Billing: {t.nextBillingDate || "N/A"}
            </small>
          </span>
          <div className="d-flex align-items-center">
            <select
              className="form-select w-auto"
              value={selected[t.id] || t.planId || ""}
              onChange={(e) => handleChange(t.id, Number(e.target.value))}
              disabled={role !== "admin"}
            >
              <option value="">-- Select Plan --</option>
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {role === "admin" && (
              <button
                className="btn btn-sm btn-primary ms-2"
                onClick={() => onAssign(t.id, selected[t.id])}
              >
                Assign
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------- Promo Codes ----------------
function PromoCodes({ codes, setCodes, onSave, role, plans }) {
  const handleChange = (index, key, value) => {
    const updated = [...codes];
    updated[index][key] = value;
    setCodes(updated);
  };

  const addCode = () =>
    setCodes([
      ...codes,
      {
        code: "",
        discountPercent: 0,
        expiry: "",
        maxUsage: 0,
        used: 0,
        applicablePlans: [],
        newUsersOnly: false
      }
    ]);

  return (
    <div>
      {codes.map((c, i) => (
        <div key={i} className="card p-3 mb-2 shadow-sm">
          <h6 className="mb-2">Promo Code #{i + 1}</h6>
          <div className="d-flex gap-2 flex-wrap">
            <input
              type="text"
              className="form-control"
              placeholder="Code"
              value={c.code}
              onChange={(e) => handleChange(i, "code", e.target.value)}
              disabled={role !== "admin"}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Discount %"
              value={c.discountPercent}
              onChange={(e) =>
                handleChange(i, "discountPercent", Number(e.target.value))
              }
              disabled={role !== "admin"}
            />
            <input
              type="date"
              className="form-control"
              value={c.expiry}
              onChange={(e) => handleChange(i, "expiry", e.target.value)}
              disabled={role !== "admin"}
            />
          </div>
          <div className="d-flex gap-2 flex-wrap mt-2">
            <input
              type="number"
              className="form-control"
              placeholder="Max Usage"
              value={c.maxUsage}
              onChange={(e) =>
                handleChange(i, "maxUsage", Number(e.target.value))
              }
              disabled={role !== "admin"}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Used"
              value={c.used}
              onChange={(e) => handleChange(i, "used", Number(e.target.value))}
              disabled
            />
            <select
              className="form-select"
              multiple
              value={c.applicablePlans}
              onChange={(e) =>
                handleChange(
                  i,
                  "applicablePlans",
                  Array.from(e.target.selectedOptions, (opt) =>
                    Number(opt.value)
                  )
                )
              }
              disabled={role !== "admin"}
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <div className="form-check ms-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={c.newUsersOnly}
                onChange={(e) =>
                  handleChange(i, "newUsersOnly", e.target.checked)
                }
                disabled={role !== "admin"}
              />
              <label className="form-check-label">New Users Only</label>
            </div>
          </div>
        </div>
      ))}
      {role === "admin" && (
        <div className="mt-2">
          <button className="btn btn-sm btn-secondary me-2" onClick={addCode}>
            + Add Promo Code
          </button>
          <button
            className="btn btn-primary"
            onClick={() => codes.forEach(onSave)}
          >
            💾 Save All Codes
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------- Main RevenuePlans ----------------
export default function RevenuePlans() {
  const { user } = useAuth(); // role: "admin" | "manager"
  // console.log('user:::',user.role)
  const role = user?.role.toLowerCase();
  const [plans, setPlans] = useState([]);
  const [turfOwners, setTurfOwners] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [promoCodes, setPromoCodes] = useState([]);
  const [activeTab, setActiveTab] = useState("Plans");

  useEffect(() => {
    async function fetchData() {
      const allPlans = await planService.listPlans();
      setPlans(allPlans);

      if (role === "admin") {
        const owners = await planService.listTurfOwners();
        setTurfOwners(owners);
      } else if (role === "manager") {
        const myPlan = await planService.getManagerPlan(user.id);
        setTurfOwners([{ ...myPlan, name: user.name }]);
      }

      const codes = await planService.listPromoCodes();
      setPromoCodes(codes);
    }
    fetchData();
  }, [role, user]);

  const savePlan = (plan) =>
    planService
      .savePlan(plan)
      .then((res) => setPlans(res.plans));

  const assignPlan = (ownerId, planId) =>
    planService.assignPlan(ownerId, planId).then((res) => setTurfOwners(res.turfOwners));

  const savePromoCode = (code) =>
    planService
      .savePromoCode(code)
      .then((res) => setPromoCodes(res.promoCodes));

  return (
    <div className="container-fluid">
      <h5 className="mb-3">Revenue & Plan Management</h5>
      <p className="text-muted">
        Manage pricing models, subscription plans, commissions, and promotional codes.
      </p>

      <ul className="nav nav-tabs mb-3">
        {["Plans", "Turf Owners", "Promo Codes"].map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <div>
        {activeTab === "Plans" && (
          <PlanForm
            plan={selectedPlan}
            setPlan={setSelectedPlan}
            onSave={savePlan}
            role={role}
          />
        )}
        {activeTab === "Turf Owners" && (
          <TurfOwnerPlans
            turfOwners={turfOwners}
            plans={plans}
            onAssign={assignPlan}
            role={role}
          />
        )}
        {activeTab === "Promo Codes" && (
          <PromoCodes
            codes={promoCodes}
            setCodes={setPromoCodes}
            onSave={savePromoCode}
            role={role}
            plans={plans}
          />
        )}
      </div>
    </div>
  );
}
