function reset(){
    for(let n = 1; n < 10; n++){
       let idn = document.getElementById(`i${n}`)
       idn.style.backgroundColor = "rgb(31, 54, 65)"
    }
}
reset()

let jogador = 1

for(let n = 1; n < 10; n++){
    let idn = document.getElementById(`i${n}`)
       idn.onclick = function cor(){
           if(idn.style.backgroundColor == "rgb(31, 54, 65)"){
             
            if(jogador % 2 == 0){
              idn.style.backgroundColor = 'purple'
            }else{
              idn.style.backgroundColor = 'teal'  
            }
               jogador ++

            let jogo = [
                ["","",""],
                ["","",""],
                ["","",""]
            ]

            let linha = Math.floor((n - 1) / 3)
            let coluna = (n - 1 % 3)

           jogo[linha][coluna] = "X"

           console.log(jogo)

            if(
                jogo[0][0] == "X" &&
                jogo[0][1] == "X" &&
                jogo[0][2] == "X"
                ||
                jogo[1][0] == "X" &&
                jogo[1][1] == "X" &&
                jogo[1][2] == "X"
                ||
                jogo[2][0] == "X" &&
                jogo[2][1] == "X" &&
                jogo[2][2] == "X"
            ){
                alert('You Win')
            }
       }       
    } 
}     




/* ||
jogo[0][0] == i1 &&
jogo[1][0] == i4 &&
jogo[2][0] == i7
||
jogo[0][1] == 'X' &&
jogo[1][1] == 'X' &&
jogo[2][1] == 'X'
||
jogo[0][2] == 'X' &&
jogo[1][2] == 'X' &&
jogo[2][2] == 'X'
||
jogo[0][2] == 'X' &&
jogo[1][1] == 'X' &&
jogo[2][0] == 'X' */