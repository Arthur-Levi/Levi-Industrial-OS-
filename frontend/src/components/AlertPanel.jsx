function AlertPanel() {

  const alerts = [
    "EXT-02 temperatura acima do ideal",
    "BC-01 parada por manutenção elétrica",
    "MCA-02 detectou falha no terminal"
  ];

  return (
    <div className="alert-panel">

      <h2>Alertas Críticos</h2>

      {alerts.map((alert, index) => (
        <div key={index} className="alert">
          {alert}
        </div>
      ))}

    </div>
  );
}

export default AlertPanel;
