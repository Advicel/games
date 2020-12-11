"use strict"
import GameBoard from "./matrix.js"
import Car from "./car.js"

let board = new GameBoard();
let myCar = new Car(true);
let isPlaying = false;
let space;
let enemyCars = [];
let interval;
let speed;
let boost;
let delay = false;
let score;
let highScore = localStorage.getItem("record") || 0;

document.querySelector(".highScore").textContent = highScore;
board.addCar(myCar)
createHtmlFromMatrix(board.matrix);

document.querySelector("button").addEventListener("click", start);

function start(){
    isPlaying = true;
    let audio = new Audio("./audio/start.mp3");
    audio.play();
    //audio = new Audio("../byob.mp3")
    //audio.play();
    board = new GameBoard();
    myCar = new Car(true);
    boost = false;
    score = 0;
    space = 0;
    speed = 200;
    interval = setInterval(update,speed)
    enemyCars = [];
    enemyCars.push(new Car(false))
    document.querySelector("button").disabled = true;
}

function update(){
    document.querySelector(".app").innerHTML="";
    if(space===10){
        space=0;
        enemyCars.push(new Car(false));
    }
    enemyCars.forEach(car=>{
        board.removeCar(car);
        car.move();
        board.addCar(car)
    })

    if(enemyCars[0].coordinates[6].y>=board.height) {
        enemyCars.splice(0,1);
        speed*=0.98;
        score++;
        if (score>highScore) {
            document.querySelector(".highScore").textContent = score;
        }
        document.querySelector(".score").textContent = score;
            clearInterval(interval);
            interval = setInterval(update,speed);
        }
    
    board.moveBorder();

    board.addCar(myCar);
    createHtmlFromMatrix(board.matrix);
    //delay = false;
    if(isLosing(enemyCars,myCar)) {
        loseHandler()
    }

    space++;
}

function updateOnMove(){
    document.querySelector(".app").innerHTML="";

    board.addCar(myCar);
    createHtmlFromMatrix(board.matrix);
    if(isLosing(enemyCars,myCar)) {
        loseHandler()
    }
}

function loseHandler(){
    clearInterval(interval)
    document.querySelector("button").disabled=false;
    isPlaying=false;
    let audio = new Audio("./audio/crash.mp3");
    audio.play();

    if(score>highScore) {
        highScore = score;
        localStorage.setItem("record", score);
    }

}
function isLosing(enemyCars,myCar){
   return(enemyCars[0].coordinates[0].y>=myCar.coordinates[6].y && 
          enemyCars[0].position === myCar.position)

}
document.addEventListener("keyup",event=>{
    if(event.key === "ArrowUp" && boost && isPlaying){
        clearInterval(interval);
        speed/=0.6;
        interval = setInterval(update,speed);
        boost=false;
        setTimeout(()=>delay=false, 1000)
    }
})
document.addEventListener("keydown",event=>{
    if(event.key === "ArrowRight" || event.key === "ArrowLeft" ||event.key === "ArrowUp"||event.key === "ArrowDown"){
        event.preventDefault();
        if (!isPlaying) return
    }
    if(event.key === "ArrowUp" && !boost && !delay){
        boost = true;
        clearInterval(interval);
        speed*=0.6;
        interval = setInterval(update,speed);
        delay = true;
    }
    if((event.key === "ArrowRight" && myCar.position==="left")||
       (event.key === "ArrowLeft" && myCar.position==="right")){
        board.removeCar(myCar);
        myCar.move()
        updateOnMove();
    }
})

function createHtmlFromMatrix(matrix){
    const field = document.createElement('div');
    field.classList.add("gameBoard");
    for(let i = 0;i<matrix.length;i++){
        const row = document.createElement('div');
        row.classList.add("row")
        for(let j=0;j<matrix[i].length;j++){
            const cell = document.createElement('div');
            const cellInner = document.createElement('div');
            cell.classList.add("cell");
            cellInner.classList.add("cellInner");
            cell.setAttribute("y",i);
            cell.setAttribute("x",j);
            cell.setAttribute("id",matrix[i][j].id);
            if(matrix[i][j].car) cell.classList.add("car")
            if(matrix[i][j].border) cell.classList.add("border")
            cell.appendChild(cellInner);
            row.appendChild(cell);
        }
        field.appendChild(row);
    }
    document.querySelector(".app").appendChild(field);
}