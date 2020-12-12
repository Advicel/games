"use strict"
import GameBoard from "./entities/board.js"
import Car from "./entities/car.js"

let board = new GameBoard();
let myCar = new Car(true);
let isPlaying = false;
let space;
let enemyCars = [];
let interval;
let speed;
let boost;
let score;

let highScore = localStorage.getItem("record") || 0;
document.querySelector(".highScore").textContent = highScore;

board.addCar(myCar)

createHtmlFromMatrix(board.matrix);
addCellClasses(board.matrix)

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

    interval= setTimeout(function gameSpeed() {
        if(isPlaying){
            update();
            interval = setTimeout(gameSpeed, speed);
        }
      }, speed);

    enemyCars = [];
    enemyCars.push(new Car(false))
    document.querySelector("button").disabled = true;
}

function update(){
    clearBoard();

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
        }
    board.moveBorder();

    board.addCar(myCar);
    addCellClasses(board.matrix)

    if(isLosing(enemyCars,myCar)) {
        loseHandler()
    }
    space++;
}

function updateOnMove(){
    clearBoard();
    board.addCar(myCar);
    addCellClasses(board.matrix)
    
    if(isLosing(enemyCars,myCar)) {
        loseHandler()
    }
}

function loseHandler(){
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
        speed/=0.6;
        boost=false;
    }
})
document.addEventListener("keydown",event=>{
    if(event.key === "ArrowRight" || event.key === "ArrowLeft" ||event.key === "ArrowUp"||event.key === "ArrowDown"){
        event.preventDefault();
        if (!isPlaying) return
    }
    if(event.key === "ArrowUp" && !boost ){
        boost = true;
        speed*=0.6;
    }
    if((event.key === "ArrowRight" && myCar.position==="left")||
       (event.key === "ArrowLeft" && myCar.position==="right")){
        board.removeCar(myCar);
        myCar.move()
        updateOnMove();
    }
})

function createHtmlFromMatrix(matrix){
    const field = document.querySelector(".gameBoard");
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
            cell.appendChild(cellInner);
            row.appendChild(cell);
        }
        field.appendChild(row);
    }
}

function clearBoard(){
    document.querySelectorAll(".cell").forEach(cell=>{
        cell.classList.remove("car","border")
    })
}

function addCellClasses(matrix){
    document.querySelectorAll(".cell").forEach(cell=>{
        const x = cell.getAttribute("x");
        const y = cell.getAttribute("y");
        if(matrix[y][x].car) 
            cell.classList.add("car")
        if(matrix[y][x].border) 
            cell.classList.add("border")
    })
}