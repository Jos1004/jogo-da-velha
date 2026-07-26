for(let n = 1; n < 10; n++){
    let idn = document.getElementById(`i${n}`)
    idn.style.backgroundColor = "rgb(31, 54, 65)"
    console.log(idn.style.backgroundColor)
}

function reset(){
    for(let n = 1; n < 10; n++){
       let idn = document.getElementById(`i${n}`)
       idn.style.backgroundColor = "rgb(31, 54, 65)"
    }
}

function game(){
    function play(){
      for(let n = 1; n < 9; n++){
           let idn = document.getElementById(`i${n}`)

           for(let i = 1; i < 9; n++){
              if(i % 2 === 0){
                    idn.onclick = function cor(){
                     if(idn.style.backgroundColor == "rgb(31, 54, 65)"){
                         idn.style.backgroundColor = 'purple'
                        }
                    }
                }else{
                     idn.onclick = function cor(){
                     if(idn.style.backgroundColor == "rgb(31, 54, 65)"){
                         idn.style.backgroundColor = 'teal'
                        }
                    }
                }
            }
        }
    }

    play()
}

game()