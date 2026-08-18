const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let jogadores = 0;
let vez = 'X';

console.log('Servidor WebSocket iniciado na porta 8080');

function enviarParaTodos(mensagem) {
  wss.clients.forEach(function (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(mensagem));
    }
  });
}

wss.on('connection', function (socket) {
  jogadores++;

  let simbolo;

  if (jogadores === 1) {
    simbolo = 'X';
  } else {
    simbolo = 'O';
  }

  console.log('Jogador conectado:', simbolo);
  console.log('Jogadores:', jogadores);

  // Informa ao jogador se ele é X ou O
  socket.send(
    JSON.stringify({
      tipo: 'jogador',
      jogador: simbolo,
    }),
  );

  socket.on('message', function (message) {
    const mensagem = JSON.parse(message.toString());

    // =========================
    // RESET
    // =========================

    if (mensagem.tipo === 'reset') {
      console.log('Reset solicitado');

      vez = 'X';

      enviarParaTodos({
        tipo: 'reset',
      });

      enviarParaTodos({
        tipo: 'vez',
        jogador: vez,
      });

      return;
    }

    // =========================
    // JOGADA
    // =========================

    if (mensagem.tipo === 'jogada') {
      console.log('Jogada:', mensagem);
      console.log('Vez atual:', vez);

      // Não deixa jogar fora da vez
      if (mensagem.jogador !== vez) {
        console.log('Não é a vez desse jogador');
        return;
      }

      // Envia a jogada para os dois jogadores
      enviarParaTodos({
        tipo: 'jogada',
        jogador: mensagem.jogador,
        posicao: mensagem.posicao,
      });

      // Troca a vez
      if (vez === 'X') {
        vez = 'O';
      } else {
        vez = 'X';
      }

      enviarParaTodos({
        tipo: 'vez',
        jogador: vez,
      });

      console.log('Nova vez:', vez);
    }
  });

  socket.on('close', function () {
    jogadores--;

    console.log('Jogador desconectado');
    console.log('Jogadores:', jogadores);

    if (jogadores <= 0) {
      jogadores = 0;
      vez = 'X';
    }
  });
});
