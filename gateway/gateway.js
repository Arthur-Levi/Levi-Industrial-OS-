const axios = require("axios");

function gerarDadosMaquina() {
  const status =
    Math.random() > 0.15
      ? "PRODUZINDO"
      : "PARADA";

  return {
    machineId: "EXT-04",

    planta: "PLANTA 02",

    temperatura:
      Math.floor(Math.random() * 35) + 70,

    velocidade:
      status === "PARADA"
        ? 0
        : Math.floor(Math.random() * 120) + 80,

    corrente:
      status === "PARADA"
        ? 0
        : Math.floor(Math.random() * 25) + 15,

    status,

    qualidade:
      Math.random() > 0.10
        ? "OK"
        : "BOLHA",

    oee:
      Math.floor(Math.random() * 20) + 75,

    timestamp: new Date(),
  };
}

async function enviarDados() {
  const dados = gerarDadosMaquina();

  try {
    await axios.post(
      "http://localhost:5000/api/telemetry",
      dados
    );

    console.log(
      "📡 Dados enviados:",
      dados
    );
  } catch (error) {
    console.log(
      "❌ Erro ao enviar dados"
    );
  }
}

console.log(
  "🚀 Gateway industrial iniciado..."
);

setInterval(enviarDados, 3000);