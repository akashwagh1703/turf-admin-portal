import KPI from "../KPI.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ManagerDashboard({ overview, extra }) {
  return (
    <>
      {/* KPIs */}
      <div className="row g-3">
        <div className="col-md-4">
          <KPI title="Turf Occupancy" value={overview.turfOccupancy ?? "..."} />
        </div>
        <div className="col-md-4">
          <KPI title="Bookings Today" value={overview.bookingsToday ?? "..."} />
        </div>
        <div className="col-md-4">
          <KPI
            title="Pending Approvals"
            value={overview.pendingApprovals ?? "..."}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-white">
          <strong>Booking Trend</strong>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={extra.charts?.bookingTrend?.map((val, i) => ({
                day: `D${i + 1}`,
                bookings: val,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-white">
          <strong>Upcoming Bookings</strong>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {extra.upcomingBookings?.map((b) => (
              <li
                className="list-group-item d-flex justify-content-between"
                key={b.id}
              >
                <span>{b.customer}</span>
                <span>
                  {b.turf} - {b.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
