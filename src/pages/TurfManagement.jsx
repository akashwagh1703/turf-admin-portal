import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import TurfTable from "../components/turfs/TurfTable";
import TurfForm from "../components/turfs/TurfForm";
import TurfAnalytics from "../components/turfs/TurfAnalytics";
import {
  getTurfs,
  addTurf,
  updateTurf,
  toggleStatus,
  approveTurf,
} from "../services/turfService";
import { useAuth } from "../store/AuthContext";

const TurfManagement = () => {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase() || "staff";
  const [turfs, setTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getTurfs(user).then(setTurfs);
  }, [user]);

  const handleSave = async (turf) => {
    if (turf.id) {
      const updated = await updateTurf(turf.id, turf);
      setTurfs(turfs.map((t) => (t.id === turf.id ? updated : t)));
    } else {
      const added = await addTurf(turf);
      setTurfs([...turfs, added]);
    }
    setShowForm(false);
    setSelectedTurf(null);
  };

  const handleToggle = async (id, status) => {
    await toggleStatus(id, status);
    setTurfs(turfs.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const handleApprove = async (id, approved) => {
    await approveTurf(id, approved);
    setTurfs(turfs.map((t) => (t.id === id ? { ...t, approved } : t)));
  };

  return (
    <Container className="py-3">
      <h2>Turf Management</h2>
      <Button className="mb-3" onClick={() => setShowForm(true)}>
        + Add Turf
      </Button>

      <TurfTable
        turfs={turfs}
        onEdit={(t) => {
          setSelectedTurf(t);
          setShowForm(true);
        }}
        onToggle={handleToggle}
        onApprove={handleApprove}
      />

      {selectedTurf && <TurfAnalytics turf={selectedTurf} />}

      <TurfForm
        show={showForm}
        handleClose={() => {
          setShowForm(false);
          setSelectedTurf(null);
        }}
        onSave={handleSave}
        turf={selectedTurf}
      />
    </Container>
  );
};

export default TurfManagement;
