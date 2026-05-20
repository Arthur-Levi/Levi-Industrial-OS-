export default function KPIBox({ title, value }) {
  return (
    <div className="kpi-box">
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}