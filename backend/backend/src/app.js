const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let machines = [
  {
    id: 1,
    name: "Extrusora 01",
    status: "RUNNING",
    rpm: 820,
    temperature: 87,
    energy: 120,
    oee: 94,
    production: 3200,
    stopReason: null,
  },

  {
    id: 2,
    name: "Extrusora 02",
    status: "STOPPED",
    rpm: 0,
    temperature: 42,
    energy: 15,
    oee: 61,
    production: 1800,
    stopReason: "Manutenção elétrica",
  },

  {
    id: 3,
    name: "Buncher 01",
    status: "RUNNING",
    rpm: 640,
    temperature: 71,
    energy: 92,
    oee: 88,
    production: 2500,
    stopReason: null,
  },
];

app.get("/", (req, res) => {
  res.json({
    status: "LEVI OS ONLINE",
  });
});

app.get("/machines", (req, res) => {
  res.json(machines);
});

setInterval(() => {
  machines = machines.map((machine) => {
    if (machine.status === "RUNNING") {
      machine.rpm = Math.floor(Math.random() * 400 + 500);

      machine.temperature = Math.floor(
        Math.random() * 30 + 65
      );

      machine.energy = Math.floor(
        Math.random() * 80 + 70
      );

      machine.production += Math.floor(
        Math.random() * 40
      );

      machine.oee = Math.floor(
        Math.random() * 20 + 80
      );
    }

    return machine;
  });
}, 2000);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});