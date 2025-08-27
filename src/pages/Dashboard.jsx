import { useEffect, useState } from "react";
import { useAuth } from "../store/AuthContext";
import * as dash from "../services/dashboardService.js";
import {
  Users, MapPin, Ticket, DollarSign, UserPlus, PieChart, CheckCircle, Clock, List, MessageSquare, ClipboardList, TrendingUp
} from "lucide-react";

import AdminDashboard from "../components/dashboards/AdminDashboard.jsx";
import ManagerDashboard from "../components/dashboards/ManagerDashboard.jsx";
import StaffDashboard from "../components/dashboards/StaffDashboard.jsx";

const icons = {
  admin: {
    totalRevenue: <DollarSign size={24} />,
    totalBookings: <Ticket size={24} />,
    activeTurfs: <MapPin size={24} />,
    newUsers: <UserPlus size={24} />,
  },
  manager: {
    monthlyRevenue: <DollarSign size={24} />,
    monthlyBookings: <Ticket size={24} />,
    occupancyRate: <PieChart size={24} />,
    pendingApprovals: <Clock size={24} />,
  },
  staff: {
    upcomingBookings: <List size={24} />,
    checkinsToday: <ClipboardList size={24} />,
    pendingTasks: <MessageSquare size={24} />,
  },
};

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase() || "staff";

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dash.getDashboardData(role).then((data) => {
      setDashboardData(data);
      setLoading(false);
    }).catch(err => {
      console.error("Failed to load dashboard data", err);
      setLoading(false);
    });
  }, [role]);

  const renderDashboard = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (!dashboardData) {
        return <p>Could not load dashboard data.</p>
    }
    
    switch (role) {
      case "admin":
        return <AdminDashboard data={dashboardData} icons={icons.admin} />;
      case "manager":
        return <ManagerDashboard data={dashboardData} icons={icons.manager} />;
      case "staff":
        return <StaffDashboard data={dashboardData} icons={icons.staff} />;
      default:
        return <p>No dashboard available for your role.</p>;
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="page-header">
        <h3>Dashboard</h3>
        <p className="text-muted">Welcome back! Here's a summary of platform activity.</p>
      </div>
      {renderDashboard()}
    </div>
  );
}
