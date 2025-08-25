import { useEffect, useState } from "react";
import { useAuth } from "../store/AuthContext";
import * as dash from "../services/dashboardService.js";

import AdminDashboard from "../components/dashboards/AdminDashboard.jsx";
import ManagerDashboard from "../components/dashboards/ManagerDashboard.jsx";
import StaffDashboard from "../components/dashboards/StaffDashboard.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase() || "staff";

  const [overview, setOverview] = useState({});
  const [recent, setRecent] = useState([]);
  const [extra, setExtra] = useState({});

  useEffect(() => {
    dash.overview(role).then(setOverview);
    dash.extra(role).then(setExtra);
    dash.recentBookings(5).then(setRecent);
  }, [role]);

  return (
    <div className="container-fluid">
      <h3 className="mb-4">Dashboard ({role})</h3>
      {role === "admin" && (
        <AdminDashboard overview={overview} extra={extra} recent={recent} />
      )}
      {role === "manager" && (
        <ManagerDashboard overview={overview} extra={extra} />
      )}
      {role === "staff" && <StaffDashboard overview={overview} extra={extra} />}
    </div>
  );
}
