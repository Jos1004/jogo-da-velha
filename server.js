const http = require('http');
const WebSocket = require('ws');

// 1. Criamos um servidor HTTP básico para o Render conseguir monitorar o app
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor WebSocket do Jogo da Velha rodando com sucesso!');
});

// 2. Vinculamos o WebSocket ao servidor HTTP em vez de travar na porta 8080
const wss = new WebSocket.Server({ server });

let jogadores = 0;
let vez = 'X';

// 3. OBRIGATÓRIO PARA O RENDER: Usar a porta dinâmica fornecida pela plataforma
const PORT = process.env.PORT || 8080;

function enviarParaTodos(mensagem) {
  wss.clients.forEach(function (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(mensagem));
    }
  });
}

wss.on('connection', function (socket) {
  jogadores++;
  let simbolo = jogadores === 1 ? 'X' : 'O';

  console.log('Jogador conectado:', simbolo);
  console.log('Jogadores:', jogadores);

  socket.send(
    JSON.stringify({
      tipo: 'jogador',
      jogador: simbolo,
    }),
  );

  socket.on('message', function (message) {
    const mensagem = JSON.parse(message.toString());

    if (mensagem.tipo === 'reset') {
      console.log('Reset solicitado');
      vez = 'X';
      enviarParaTodos({ tipo: 'reset' });
      enviarParaTodos({ tipo: 'vez', joker: vez });
      return;
    }

    if (mensagem.tipo === 'jogada') {
      console.log('Jogada:', mensagem);
      if (mensagem.jogador !== vez) {
        console.log('Não é a vez desse jogador');
        return;
      }

      enviarParaTodos({
        tipo: 'jogada',
        jogador: mensagem.jogador,
        posicao: mensagem.posicao,
      });

      vez = vez === 'X' ? 'O' : 'X';
      enviarParaTodos({ tipo: 'vez', jogador: vez });
      console.log('Nova vez:', vez);
    }
  });

  socket.on('close', function () {
    jogadores--;
    console.log('Jogador desconectado. Jogadores restantes:', jogadores);
    if (jogadores <= 0) {
      jogadores = 0;
      vez = 'X';
    }
  });
});

// Inicializa o servidor unificado na porta do Render
server.listen(PORT, () => {
  console.log(`Servidor iniciado com sucesso na porta ${PORT}`);
});
