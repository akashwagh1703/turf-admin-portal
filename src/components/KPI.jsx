export default function KPI({ title, value, footer }) {
  return (
    <div className="card card-kpi shadow-sm">
      <div className="card-body">
        <div className="text-muted">{title}</div>
        <div className="value">{value}</div>
        {footer && <div className="small text-muted">{footer}</div>}
      </div>
    </div>
  )
}
