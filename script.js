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
    idn.style.backgroundColor = 'rgb(31, 54, 65)';
  }
}
reset();

for (let n = 1; n < 10; n++) {
  let idn = document.getElementById(`i${n}`);
  idn.onclick = function cor() {
    let linha = Math.floor((n - 1) / 3);
    let coluna = (n - 1) % 3;

    if (idn.style.backgroundImage == "url('')") {
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
        }, 1e3);
      }
    }
  };
}
