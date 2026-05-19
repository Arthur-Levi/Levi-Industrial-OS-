const machines = [
  {
    id: 1,
    name: "M-01",
    status: "Rodando",
    production: 120,
    quality: "OK"
  },
  {
    id: 2,
    name: "M-02",
    status: "Parada",
    production: 0,
    quality: "Erro"
  },
  {
    id: 3,
    name: "M-03",
    status: "Alerta",
    production: 80,
    quality: "Bolha"
  }
];

function getMachines(req, res) {
  res.json(machines);
}

module.exports = {
  getMachines
};