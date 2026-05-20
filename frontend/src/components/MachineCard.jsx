function MachineCard({ machine }) {
  return (
    <div className="card">

      <div className="machine-header">

        <h2 className="machine-name">
          {machine.name}
        </h2>

        <div
          className={`status ${
            machine.status === "RUNNING"
              ? "running"
              : "stopped"
          }`}
        >
          {machine.status}
        </div>

      </div>

      <div className="metric">
        <span>OEE:</span> {machine.oee}%
      </div>

      <div className="metric">
        <span>Produção:</span> {machine.production} m/min
      </div>

      <div className="metric">
        <span>Temperatura:</span> {machine.temperature}°C
      </div>

      <div className="metric">
        <span>Energia:</span> {machine.energy} kWh
      </div>

      <div className="metric">
        <span>Erro:</span> {machine.error}
      </div>

    </div>
  );
}

export default MachineCard;
