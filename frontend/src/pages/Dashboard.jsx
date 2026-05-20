import Header from "../components/Header";
import MachineCard from "../components/MachineCard";
import AlertPanel from "../components/AlertPanel";
import ProductionChart from "../components/ProductionChart";

import "../styles/dashboard.css";

function Dashboard() {

  const machines = [
    {
      name: "EXT-01",
      status: "RUNNING",
      oee: 92,
      production: 180,
      temperature: 210,
      energy: 450,
      error: "Nenhum"
    },
    {
      name: "BC-02",
      status: "STOPPED",
      oee: 47,
      production: 0,
      temperature: 80,
      energy: 120,
      error: "Rompimento de corda"
    },
    {
      name: "MCA-01",
      status: "RUNNING",
      oee: 88,
      production: 140,
      temperature: 160,
      energy: 300,
      error: "Nenhum"
    }
  ];

  return (
    <div className="dashboard">

      <Header />

      <div className="grid">
        {machines.map((machine, index) => (
          <MachineCard
            key={index}
            machine={machine}
          />
        ))}
      </div>

      <ProductionChart />

      <AlertPanel />

    </div>
  );
}

export default Dashboard;