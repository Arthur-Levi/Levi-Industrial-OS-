import { useEffect, useState } from "react";

export function useIndustrialSocket() {
  const [connected, setConnected] = useState(true);

  const [machines, setMachines] = useState([
    {
      id: 1,
      name: "Extrusora 04",
      type: "Extrusora",
      line: "Linha A",
      status: "RUNNING",
      operatorName: "Carlos",
      telemetry: {
        rpm: 1840,
        temperature: 87.4,
        energyKw: 52.1,
        vibration: 1.8,
        tensionNewtons: 220,
        productionRatePerHour: 1450,
      },
      oee: {
        overall: 91,
        availability: 95,
        performance: 89,
        quality: 98,
        lossPerMinute: 4.5,
        lossThisShift: 320,
      },
      shift: {
        runningMinutes: 320,
        stoppedMinutes: 15,
        idleMinutes: 8,
        goodMeters: 12450,
        scrapMeters: 120,
        alarmCount: 2,
      },
    },
  ]);

  const [alarms, setAlarms] = useState([
    {
      id: 1,
      severity: "HIGH",
      machineName: "Extrusora 04",
      message: "Temperatura acima do limite ideal",
      createdAt: new Date(),
      status: "ACTIVE",
    },
  ]);

  const [metrics] = useState({
    totalOEE: 89,
  });

  const [plantOEE] = useState({
    plantOEE: 89,
    totalLossPerMinute: 12.5,
  });

  const [lastUpdate] = useState(new Date());

  const acknowledgeAlarm = (id) => {
    setAlarms((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "ACKNOWLEDGED" } : a
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMachines((prev) =>
        prev.map((m) => ({
          ...m,
          telemetry: {
            ...m.telemetry,
            rpm: m.telemetry.rpm + (Math.random() * 40 - 20),
            temperature: m.telemetry.temperature + (Math.random() * 2 - 1),
            energyKw: m.telemetry.energyKw + (Math.random() * 2 - 1),
          },
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    connected,
    machines,
    alarms,
    metrics,
    plantOEE,
    lastUpdate,
    acknowledgeAlarm,
  };
}