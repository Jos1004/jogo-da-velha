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

function playerOne(){
    for(let n = 1; n < 10; n++){
      let idn = document.getElementById(`i${n}`)
      idn.onclick = function cor(){
           if(idn.style.backgroundColor == "rgb(31, 54, 65)"){
              idn.style.backgroundColor = 'purple'
            }
        }
    }
}

playerOne()