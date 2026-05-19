import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    loadMachines();

    const interval = setInterval(() => {
      loadMachines();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  async function loadMachines() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/machines"
      );

      setMachines(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "RUNNING":
        return "#22c55e";

      case "STOPPED":
        return "#ef4444";

      case "ALERT":
        return "#eab308";

      case "SETUP":
        return "#3b82f6";

      default:
        return "#64748b";
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            marginBottom: "10px",
          }}
        >
          LEVI INDUSTRIAL OS
        </h1>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Sistema Inteligente de Monitoramento Industrial
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {machines.map((machine) => (
          <div
            key={machine.id}
            style={{
              background: "#0f172a",
              borderRadius: "18px",
              padding: "24px",
              borderLeft: `8px solid ${getStatusColor(
                machine.status
              )}`,
              boxShadow:
                "0 0 20px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <h2>{machine.name}</h2>

              <div
                style={{
                  background: getStatusColor(
                    machine.status
                  ),
                  padding: "8px 12px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {machine.status}
              </div>
            </div>

            <p>
              <strong>Planta:</strong>{" "}
              {machine.plant}
            </p>

            <p>
              <strong>Motivo:</strong>{" "}
              {machine.reason}
            </p>

            <p>
              <strong>Produção:</strong>{" "}
              {machine.production}%
            </p>

            <p>
              <strong>Qualidade:</strong>{" "}
              {machine.quality}
            </p>

            <p>
              <strong>Tempo parado:</strong>{" "}
              {machine.downtime}
            </p>

            <div
              style={{
                marginTop: "18px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "12px",
                  background: "#1e293b",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${machine.production}%`,
                    height: "100%",
                    background:
                      getStatusColor(machine.status),
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;