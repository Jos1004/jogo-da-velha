const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('Servidor WebSocket iniciado na porta 8080');

wss.on('connection', function (socket) {
  console.log('Jogador conectado');

  socket.on('message', function (message) {
    console.log('RECEBIDO:', message.toString());

    wss.clients.forEach(function (client) {
      client.send(message.toString());
    });
  });
});
