// src/components/dashboards/AdminDashboard.jsx
import KPI from "../KPI.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AdminDashboard({ overview, extra, recent }) {
  // console.log('overview:::', overview.activeTurfManagers)
  return (
    <>
      {/* KPIs */}
      <div className="row g-3">
        <div className="col-md-2 col-sm-6">
          <KPI title="Total Turfs" value={overview.totalTurfs ?? "..."} />
        </div>
        <div className="col-md-2 col-sm-6">
          <KPI title="Total Bookings" value={overview.totalBookings ?? "..."} />
        </div>
        <div className="col-md-2 col-sm-6">
          <KPI title="Revenue (₹)" value={overview.revenueThisMonth ?? "..."} />
        </div>
        <div className="col-md-2 col-sm-6">
          <KPI title="Active Users" value={overview.activeUsers ?? "..."} />
        </div>
        <div className="col-md-2 col-sm-6">
          <KPI title="New Turf Owners" value={overview.newOwners ?? "..."} />
        </div>
        <div className="col-md-2 col-sm-6">
          <KPI title="New Players" value={overview.newPlayers ?? "..."} />
        </div>
      </div>

      {/* Charts */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <strong>Revenue Trend</strong>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={extra.charts?.revenueTrend?.map((val, i) => ({
                    month: `M${i + 1}`,
                    revenue: val,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <strong>Bookings by Turf</strong>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={extra.charts?.bookingsByTurf || []}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {extra.charts?.bookingsByTurf?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Turf Status */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <strong>Turfs Status (Active vs Inactive)</strong>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={extra.charts?.turfStatus || []}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {extra.charts?.turfStatus?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <strong>Alerts & Notifications</strong>
            </div>
            <div className="card-body">
              {extra.alerts?.length ? (
                <ul className="list-group">
                  {extra.alerts.map((a, i) => (
                    <li
                      key={i}
                      className={`list-group-item list-group-item-${a.type}`}
                    >
                      {a.message}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No critical alerts</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-white">
          <strong>Recent Bookings</strong>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Turf</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.customer}</td>
                    <td>{b.turf}</td>
                    <td>{b.date}</td>
                    <td>{b.time}</td>
                    <td>
                      <span
                        className={
                          "badge bg-" +
                          (b.status === "Confirmed"
                            ? "success"
                            : b.status === "Pending"
                            ? "warning text-dark"
                            : "secondary")
                        }
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
