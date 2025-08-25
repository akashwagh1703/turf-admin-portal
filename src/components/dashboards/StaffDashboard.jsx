import KPI from "../KPI.jsx";

export default function StaffDashboard({ overview, extra }) {
  return (
    <>
      {/* KPIs */}
      <div className="row g-3">
        <div className="col-md-4">
          <KPI
            title="Assigned Bookings"
            value={overview.assignedBookings ?? "..."}
          />
        </div>
        <div className="col-md-4">
          <KPI
            title="Check-ins Today"
            value={overview.checkinsToday ?? "..."}
          />
        </div>
        <div className="col-md-4">
          <KPI title="Pending Tasks" value={overview.pendingTasks ?? "..."} />
        </div>
      </div>

      {/* Schedule */}
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-white">
          <strong>Today’s Schedule</strong>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {extra.schedule?.map((t, i) => (
              <li className="list-group-item" key={i}>
                <strong>{t.time}</strong> - {t.task}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Support Requests */}
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-white">
          <strong>Support Requests</strong>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {extra.supportRequests?.map((s) => (
              <li className="list-group-item" key={s.id}>
                {s.customer} - {s.issue}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
