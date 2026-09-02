let meuJogador = '';

let jogo = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const socket = new WebSocket('https://jogo-da-velha-hvm7.onrender.com');

// ======================================
// RESET LOCAL
// ======================================

function resetTabuleiro() {
  // Limpa as 9 casas visualmente
  for (let n = 1; n <= 9; n++) {
    const casa = document.getElementById(`i${n}`);

    if (casa) {
      casa.style.backgroundImage = '';
      casa.style.backgroundRepeat = '';
      casa.style.backgroundPosition = '';
    }
  }

  // Limpa a matriz
  for (let linha = 0; linha < 3; linha++) {
    for (let coluna = 0; coluna < 3; coluna++) {
      jogo[linha][coluna] = '';
    }
  }

  console.log('Tabuleiro resetado!');
}

// ======================================
// WEBSOCKET
// ======================================

socket.onopen = function () {
  console.log('Conectado ao servidor!');
};

socket.onclose = function () {
  console.log('WebSocket fechado');
};

socket.onerror = function (erro) {
  console.log('Erro no WebSocket:', erro);
};

// ======================================
// VERIFICAR VITÓRIA
// ======================================

function verificarVitoria() {
  const combinacoes = [
    // Linhas
    [jogo[0][0], jogo[0][1], jogo[0][2]],
    [jogo[1][0], jogo[1][1], jogo[1][2]],
    [jogo[2][0], jogo[2][1], jogo[2][2]],

    // Colunas
    [jogo[0][0], jogo[1][0], jogo[2][0]],
    [jogo[0][1], jogo[1][1], jogo[2][1]],
    [jogo[0][2], jogo[1][2], jogo[2][2]],

    // Diagonais
    [jogo[0][0], jogo[1][1], jogo[2][2]],
    [jogo[0][2], jogo[1][1], jogo[2][0]],
  ];

  for (const combinacao of combinacoes) {
    if (
      combinacao[0] !== '' &&
      combinacao[0] === combinacao[1] &&
      combinacao[1] === combinacao[2]
    ) {
      return combinacao[0];
    }
  }

  return null;
}

// ======================================
// CLIQUE NAS CASAS
// ======================================

for (let n = 1; n <= 9; n++) {
  const casa = document.getElementById(`i${n}`);

  casa.onclick = function () {
    // Ainda não recebeu X ou O
    if (meuJogador === '') {
      console.log('Aguardando jogador...');
      return;
    }

    // WebSocket não conectado
    if (socket.readyState !== WebSocket.OPEN) {
      console.log('WebSocket não está conectado');
      return;
    }

    // Casa já ocupada
    if (casa.style.backgroundImage !== '') {
      return;
    }

    // Descobre linha e coluna
    const linha = Math.floor((n - 1) / 3);
    const coluna = (n - 1) % 3;

    // Envia a jogada para o servidor
    const jogada = {
      tipo: 'jogada',
      jogador: meuJogador,
      posicao: n,
    };

    socket.send(JSON.stringify(jogada));
  };
}

// ======================================
// RECEBER MENSAGENS DO SERVIDOR
// ======================================

socket.onmessage = function (event) {
  const mensagem = JSON.parse(event.data);

  console.log('Mensagem recebida:', mensagem);

  // ====================================
  // SERVIDOR INFORMOU MEU JOGADOR
  // ====================================

  if (mensagem.tipo === 'jogador') {
    meuJogador = mensagem.jogador;

    console.log('Meu jogador', meuJogador);

    return;
  }

  // ====================================
  // RESET
  // ====================================

  if (mensagem.tipo === 'reset') {
    console.log('Recebi comando de RESET');

    resetTabuleiro();

    return;
  }

  // ====================================
  // MUDANÇA DE VEZ
  // ====================================

  if (mensagem.tipo === 'vez') {
    console.log('Agora é a vez de:', mensagem.jogador);
    resposta.innerHTML = 'vez do ' + mensagem.jogador;
    return;
  }

  // ====================================
  // JOGADA
  // ====================================

  if (mensagem.tipo === 'jogada') {
    const jogador = mensagem.jogador;
    const posicao = mensagem.posicao;

    const casa = document.getElementById(`i${posicao}`);

    if (!casa) {
      console.log('Casa não encontrada:', posicao);
      return;
    }

    const linha = Math.floor((posicao - 1) / 3);
    const coluna = (posicao - 1) % 3;

    // ==================================
    // X
    // ==================================

    if (jogador === 'X') {
      casa.style.backgroundImage = "url('images/x.svg')";
      casa.style.backgroundRepeat = 'no-repeat';
      casa.style.backgroundPosition = 'center';

      jogo[linha][coluna] = 'X';
    }

    // ==================================
    // O
    // ==================================

    if (jogador === 'O') {
      casa.style.backgroundImage = "url('images/o.svg')";
      casa.style.backgroundRepeat = 'no-repeat';
      casa.style.backgroundPosition = 'center';

      jogo[linha][coluna] = 'O';
    }

    console.log('Tabuleiro:', jogo);

    // ==================================
    // VERIFICA VITÓRIA
    // ==================================

    const vencedor = verificarVitoria();

    if (vencedor) {
      setTimeout(function () {
        let resposta = document.querySelector('#resposta');
        let modal = document.querySelector('#modalOverlay');

        if (vencedor === meuJogador) {
          resposta.innerText = 'Você ganhou';
        } else {
          resposta.innerText = 'Você perdeu';
        }
      }, 100);

      // Depois da mensagem, manda reset para os dois
      setTimeout(function () {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              tipo: 'reset',
            }),
          );
        }
      }, 8000);
    }
  }
};

const botaoReset = document.getElementById('reset');

botaoReset.onclick = function () {
  if (socket.readyState !== WebSocket.OPEN) {
    console.log('WebSocket não conectado');
    return;
  }

  socket.send(
    JSON.stringify({
      tipo: 'reset',
    }),
  );
};
