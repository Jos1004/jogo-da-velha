let jogador = 1;
let jogo = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let jogo1 = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

function reset() {
  for (let n = 1; n < 10; n++) {
    let idn = document.getElementById(`i${n}`);
    idn.style.backgroundImage = '';
    idn.style.backgroundRepeat = '';
    idn.style.backgroundPosition = '';
  }
  for (let linha = 0; linha < 3; linha++) {
    for (let coluna = 0; coluna < 3; coluna++) {
      jogo[linha][coluna] = '';
      jogo1[linha][coluna] = '';
    }
  }
}
reset();

for (let n = 1; n < 10; n++) {
  let idn = document.getElementById(`i${n}`);
  idn.onclick = function cor() {
    let linha = Math.floor((n - 1) / 3);
    let coluna = (n - 1) % 3;

    if (idn.style.backgroundImage == '') {
      if (jogador % 2 == 0) {
        idn.style.backgroundImage = "url('images/o.svg')";
        idn.style.backgroundRepeat = 'no-repeat';
        idn.style.backgroundPosition = 'center';
        jogo1[linha][coluna] = 'O';
        console.log(jogo1);
      } else {
        idn.style.backgroundImage = "url('images/x.svg')";
        idn.style.backgroundRepeat = 'no-repeat';
        idn.style.backgroundPosition = 'center';
        jogo[linha][coluna] = 'X';
        console.log(jogo);
      }
      jogador++;

      if (
        (jogo[0][0] == 'X' && jogo[0][1] == 'X' && jogo[0][2] == 'X') ||
        (jogo[1][0] == 'X' && jogo[1][1] == 'X' && jogo[1][2] == 'X') ||
        (jogo[2][0] == 'X' && jogo[2][1] == 'X' && jogo[2][2] == 'X') ||
        (jogo[0][0] == 'X' && jogo[1][1] == 'X' && jogo[2][2] == 'X') ||
        (jogo[0][2] == 'X' && jogo[1][1] == 'X' && jogo[2][0] == 'X') ||
        (jogo[0][0] == 'X' && jogo[1][0] == 'X' && jogo[2][0] == 'X') ||
        (jogo[0][1] == 'X' && jogo[1][1] == 'X' && jogo[2][1] == 'X') ||
        (jogo[0][2] == 'X' && jogo[1][2] == 'X' && jogo[2][2] == 'X') ||
        (jogo1[0][0] == 'O' && jogo1[0][1] == 'O' && jogo1[0][2] == 'O') ||
        (jogo1[1][0] == 'O' && jogo1[1][1] == 'O' && jogo1[1][2] == 'O') ||
        (jogo1[2][0] == 'O' && jogo1[2][1] == 'O' && jogo1[2][2] == 'O') ||
        (jogo1[0][0] == 'O' && jogo1[1][1] == 'O' && jogo1[2][2] == 'O') ||
        (jogo1[0][2] == 'O' && jogo1[1][1] == 'O' && jogo1[2][0] == 'O') ||
        (jogo1[0][0] == 'O' && jogo1[1][0] == 'O' && jogo1[2][0] == 'O') ||
        (jogo1[0][1] == 'O' && jogo1[1][1] == 'O' && jogo1[2][1] == 'O') ||
        (jogo1[0][2] == 'O' && jogo1[1][2] == 'O' && jogo1[2][2] == 'O')
      ) {
        setTimeout(() => {
          alert('you win');
        }, 500);
        reset();
      }
    }
  };
}

const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function () {
  console.log('Conectado ao servidor!');
};
