const express = require("express");

const router = express.Router();

const machines = [
  {
    id: 1,
    name: "EXTRUSORA-01",
    plant: "PLANTA 02",
    status: "RUNNING",
    reason: "Produzindo normalmente",
    production: 92,
    quality: "OK",
    downtime: "0 min",
  },

  {
    id: 2,
    name: "EXTRUSORA-02",
    plant: "PLANTA 02",
    status: "STOPPED",
    reason: "Rompimento de corda",
    production: 37,
    quality: "ALERTA",
    downtime: "18 min",
  },

  {
    id: 3,
    name: "BUNCHER-01",
    plant: "PLANTA 01",
    status: "SETUP",
    reason: "Troca de bobinas",
    production: 0,
    quality: "OK",
    downtime: "11 min",
  },

  {
    id: 4,
    name: "MCA-01",
    plant: "PLANTA 01",
    status: "ALERT",
    reason: "Terminal enroscando",
    production: 61,
    quality: "REVISAR",
    downtime: "5 min",
  },

  {
    id: 5,
    name: "MCAS1-01",
    plant: "PLANTA 01",
    status: "STOPPED",
    reason: "Quebra peça aplicador",
    production: 0,
    quality: "PARADA",
    downtime: "42 min",
  },

  {
    id: 6,
    name: "MCAS2-02",
    plant: "PLANTA 01",
    status: "RUNNING",
    reason: "Operação normal",
    production: 88,
    quality: "OK",
    downtime: "0 min",
  },
];

router.get("/", (req, res) => {
  res.json(machines);
});

module.exports = router;