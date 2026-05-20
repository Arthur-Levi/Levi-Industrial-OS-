
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/*
==================================================
DADOS MOCKADOS DAS MÁQUINAS
==================================================
*/

const machines = [
  // =========================
  // PLANTA 02 - EXTRUSORAS
  // =========================

  {
    id: 1,
    name: "Extrusora 01",
    plant: "Planta 02",
    sector: "Extrusoras",
    status: "running",
    production: 94,
    operator: "Carlos",
    stopReason: null,
    possibleSolution: null,
    quality: "OK"
  },

  {
    id: 2,
    name: "Extrusora 02",
    plant: "Planta 02",
    sector: "Extrusoras",
    status: "stopped",
    production: 0,
    operator: "Marcos",
    stopReason: "Manutenção Mecânica",
    possibleSolution: "Verificar motor principal e sistema de tração",
    quality: "Parado"
  },

  {
    id: 3,
    name: "Extrusora 03",
    plant: "Planta 02",
    sector: "Extrusoras",
    status: "warning",
    production: 62,
    operator: "Juliana",
    stopReason: "Rompimento de Corda",
    possibleSolution: "Revisar tensão e alinhamento do material",
    quality: "Bolha no Cabo"
  },

  // =========================
  // PLANTA 01 - BUNCHER
  // =========================

  {
    id: 4,
    name: "Buncher 01",
    plant: "Planta 01",
    sector: "Buncher",
    status: "running",
    production: 88,
    operator: "Fernanda",
    stopReason: null,
    possibleSolution: null,
    quality: "OK"
  },

  {
    id: 5,
    name: "Buncher 02",
    plant: "Planta 01",
    sector: "Buncher",
    status: "stopped",
    production: 0,
    operator: "Ricardo",
    stopReason: "Troca de Bobinas",
    possibleSolution: "Finalizar setup da nova bobina",
    quality: "Parado"
  },

  {
    id: 6,
    name: "Buncher 03",
    plant: "Planta 01",
    sector: "Buncher",
    status: "warning",
    production: 57,
    operator: "Paulo",
    stopReason: "Falta de Material",
    possibleSolution: "Acionar PCP e almoxarifado",
    quality: "OK"
  },

  // =========================
  // MCA / MCAS
  // =========================

  {
    id: 7,
    name: "MCAS1",
    plant: "Planta 01",
    sector: "MCA",
    status: "stopped",
    production: 0,
    operator: "Aline",
    stopReason: "Terminal Enroscando",
    possibleSolution: "Revisar alinhamento do aplicador",
    quality: "Erro de Terminal"
  },

  {
    id: 8,
    name: "MCAS2",
    plant: "Planta 01",
    sector: "MCA",
    status: "warning",
    production: 49,
    operator: "Roberto",
    stopReason: "Ajuste da Dobra/Ângulo",
    possibleSolution: "Recalibrar braço mecânico",
    quality: "Leve Desalinhamento"
  },

  {
    id: 9,
    name: "MCA 01",
    plant: "Planta 01",
    sector: "MCA",
    status: "running",
    production: 97,
    operator: "Camila",
    stopReason: null,
    possibleSolution: null,
    quality: "OK"
  }
];

/*
==================================================
TELEMETRIA INDUSTRIAL
==================================================
*/

let telemetryData = [];

/*
==================================================
ROTAS PRINCIPAIS
==================================================
*/

app.get("/", (req, res) => {
  res.send("Levi Industrial OS API rodando");
});

/*
==================================================
ROTAS DAS MÁQUINAS
==================================================
*/

// LISTAR TODAS AS MÁQUINAS

app.get("/api/machines", (req, res) => {
  res.json(machines);
});

// BUSCAR MÁQUINA POR ID

app.get("/api/machines/:id", (req, res) => {
  const machine = machines.find(
    (m) => m.id === parseInt(req.params.id)
  );

  if (!machine) {
    return res.status(404).json({
      error: "Máquina não encontrada"
    });
  }

  res.json(machine);
});

// LISTAR APENAS MÁQUINAS PARADAS

app.get("/api/status/stopped", (req, res) => {
  const stoppedMachines = machines.filter(
    (m) => m.status === "stopped"
  );

  res.json(stoppedMachines);
});

// LISTAR APENAS MÁQUINAS RODANDO

app.get("/api/status/running", (req, res) => {
  const runningMachines = machines.filter(
    (m) => m.status === "running"
  );

  res.json(runningMachines);
});

// LISTAR ALERTAS

app.get("/api/alerts", (req, res) => {
  const alerts = machines.filter(
    (m) =>
      m.status === "warning" ||
      m.status === "stopped"
  );

  res.json(alerts);
});

/*
==================================================
MOTIVOS DE PARADA POR PLANTA
==================================================
*/

const stopReasons = {
  extrusoras: [
    "Setup",
    "Manutenção Mecânica",
    "Manutenção Elétrica",
    "Falta de Ferramental",
    "Rompimento de Corda",
    "Outros",
    "Preventiva",
    "Falta de Programação",
    "Falta de Material",
    "Utilidades",
    "Retomada de Máquina",
    "Refeição",
    "5S",
    "Falta de Operador",
    "Emenda",
    "Ponta Perdida"
  ],

  buncher: [
    "Manutenção Mecânica",
    "Manutenção Elétrica",
    "Manutenção Preventiva",
    "Rompimento de Corda",
    "Troca de Bobinas",
    "Solda",
    "Troca de Alimentação",
    "Falta de Alimentação",
    "Falta de Operador",
    "Outros",
    "Falta de Material",
    "Setup"
  ],

  mca: [
    "Ajuste de Altura",
    "Ajuste da Dobra/Ângulo",
    "Quebra Peça Aplicador",
    "Terminal Enroscando",
    "Cortando o Filamento",
    "Terminal Aberto",
    "Troca de Terminal",
    "Troca de Cabo",
    "Limpeza",
    "Liberação de Máquina",
    "Manutenção Elétrica",
    "Ajuste Operacional",
    "Outros",
    "Falta de Material (PCP)",
    "Utilidades",
    "Retomada de Máquina",
    "Manutenção Mecânica"
  ]
};

// ROTA DOS MOTIVOS

app.get("/api/stop-reasons", (req, res) => {
  res.json(stopReasons);
});

/*
==================================================
TELEMETRIA EM TEMPO REAL
==================================================
*/

// RECEBER DADOS DA MÁQUINA

app.post("/api/telemetry", (req, res) => {
  const data = req.body;

  telemetryData.push(data);

  // Mantém apenas os últimos 100 registros
  if (telemetryData.length > 100) {
    telemetryData.shift();
  }

  console.log("Nova telemetria recebida:");
  console.log(data);

  res.json({
    success: true,
    message: "Telemetria recebida com sucesso"
  });
});

// LISTAR TELEMETRIA

app.get("/api/telemetry", (req, res) => {
  res.json(telemetryData);
});

// ÚLTIMO REGISTRO

app.get("/api/telemetry/latest", (req, res) => {
  const latest =
    telemetryData[telemetryData.length - 1];

  if (!latest) {
    return res.status(404).json({
      error: "Nenhuma telemetria encontrada"
    });
  }

  res.json(latest);
});

/*
==================================================
SIMULAÇÃO DE OEE
==================================================
*/

app.get("/api/oee", (req, res) => {
  const availability = 92;
  const performance = 87;
  const quality = 96;

  const oee =
    (
      (availability / 100) *
      (performance / 100) *
      (quality / 100)
    ) * 100;

  res.json({
    availability,
    performance,
    quality,
    oee: oee.toFixed(2)
  });
});

/*
==================================================
SERVIDOR
==================================================
*/

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

