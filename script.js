//import GameBoard from './matrix.js';
let board = new GameBoard();

let myCar = new PlayerCar();
let interval = setInterval(update,150)

console.log(board.border);

function update(){
    document.body.innerHTML="";
    board.addPlayerCar(myCar);
    board.moveBorder();
    createHtmlFromMatrix(board.matrix);
}
function updateOnMove(){
    document.body.innerHTML="";
    board.addPlayerCar(myCar);
    createHtmlFromMatrix(board.matrix);
}


document.addEventListener("keydown",event=>{
    //event.preventDefault();
    if(event.key === "ArrowRight" && myCar.position==="left") {
        board.removePlayerCar();
        myCar.move()
        updateOnMove();
    } else if(event.key === "ArrowLeft" && myCar.position==="right"){
        board.removePlayerCar();
        myCar.move()
        updateOnMove();
    }
})