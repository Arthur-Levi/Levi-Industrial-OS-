const axios = require("axios");

function gerarDadosMaquina() {
  return {
    machineId: "EXT-04",

    temperatura: Math.floor(Math.random() * 40) + 60,

    velocidade: Math.floor(Math.random() * 120) + 80,

    corrente: Math.floor(Math.random() * 30) + 10,

    status:
      Math.random() > 0.1
        ? "PRODUZINDO"
        : "PARADA",

    qualidade:
      Math.random() > 0.15
        ? "OK"
        : "BOLHA",

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

    console.log("Dados enviados:", dados);
  } catch (error) {
    console.log("Erro ao enviar");
  }
}

setInterval(enviarDados, 3000);