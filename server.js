const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('Servidor WebSocket iniciado na porta 8080');

wss.on('connection', function (socket) {
  console.log('Um jogador entrou!');
});
