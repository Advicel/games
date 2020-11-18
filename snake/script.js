const field = document.createElement('div');
document.body.appendChild(field);
field.classList.add("field");

for(let i =0; i<100; i++){
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add("excel");
}
const excelPull = document.querySelectorAll(".excel");
let x = 1,
    y = 10;
for (let i = 0; i<excelPull.length;i++){
    if(x>10) {
        x=1;
        y--;
    }
    excelPull[i].setAttribute('posX',x);
    excelPull[i].setAttribute('posY',y);
    x++;
}

//2 часть


let snakeBody = createSnake();
let mouse = createMouse();

function createSnake(){
    function generateHead(){
        const posX = Math.floor(Math.random() * (10 - 3)) + 3;
        const posY = Math.floor(Math.random() * (10 - 1)) + 1;
        return [posX,posY];
    }
    let coordinatesHead = generateHead();
    
    let snakeBody = [document.querySelector('[posX = "' + coordinatesHead[0]+'"][posY = "' + coordinatesHead[1]+'"'),
        document.querySelector('[posX = "' +(+ coordinatesHead[0] - 1)+'"][posY = "' + coordinatesHead[1]+'"'),
        document.querySelector('[posX = "' +(+ coordinatesHead[0] - 2)+'"][posY = "' + coordinatesHead[1]+'"')];
    for(let i = 1;i<snakeBody.length;i++){
        snakeBody[i].classList.add("snakeBody");
    }
    snakeBody[0].classList.add("snakeHead");
    return snakeBody;
}
function createMouse(){
    function generateMouse(){
        const posX = Math.floor(Math.random() * (10 - 1)) + 1;
        const posY = Math.floor(Math.random() * (10 - 1)) + 1;
        return [posX,posY];
    }
    let mouseCoordinates = generateMouse();
    let mouse = document.querySelector('[posX = "' + mouseCoordinates[0]+'"][posY = "' + mouseCoordinates[1]+'"');
    while(mouse.classList.contains("snakeBody")){
        mouseCoordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCoordinates[0]+'"][posY = "' + mouseCoordinates[1]+'"');
    }
    mouse.classList.add("mouse");
    return mouse;
}

let steps = true;
let direction = "right";


function move(){
    let headCoordinates = [snakeBody[0].getAttribute('posx'),snakeBody[0].getAttribute('posy')]
    snakeBody[0].classList.remove("snakeHead");
    snakeBody[snakeBody.length-1].classList.remove("snakeBody");
    switch(direction){
        case "right":
            if(headCoordinates[0]<10){
                snakeBody.unshift(document.querySelector('[posX = "' + (+headCoordinates[0]+1)+'"][posY = "' + headCoordinates[1]+'"'));
            }else{
                snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + headCoordinates[1]+'"'));  
            }
            break;
        case "left":
            if(headCoordinates[0]>1){
                snakeBody.unshift(document.querySelector('[posX = "' + (+headCoordinates[0]-1)+'"][posY = "' + headCoordinates[1]+'"'));
            }else{
                snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + headCoordinates[1]+'"'));  
            }
            break;
        case "up":
            if(headCoordinates[1]<10){
                snakeBody.unshift(document.querySelector('[posX = "' + headCoordinates[0]+'"][posY = "' + (+headCoordinates[1]+1)+'"'));
            }else{
                snakeBody.unshift(document.querySelector('[posX = "' + headCoordinates[0]+'"][posY = "1"'));  
            }    
            break;
        case "down":
            if(headCoordinates[1]>1){
                snakeBody.unshift(document.querySelector('[posX = "' + headCoordinates[0]+'"][posY = "' + (+headCoordinates[1]-1)+'"'));
            }else{
                snakeBody.unshift(document.querySelector('[posX = "' + headCoordinates[0]+'"][posY = "10"'));  
            }
            break;
            
        
    }
    if(snakeBody[0].getAttribute('posx')===mouse.getAttribute('posx') &&snakeBody[0].getAttribute('posy')===mouse.getAttribute('posy')){
        mouse.classList.remove("mouse");
        mouse = createMouse();
        console.log("true");
    }else snakeBody.pop();

    if(snakeBody[0].classList.contains("snakeBody")){
        setTimeout(()=>{
            alert("end");
        },200);
        clearInterval(interval);
    }



    for(let i = 1; i<snakeBody.length;i++){
        snakeBody[i].classList.add("snakeBody");
    }
    snakeBody[0].classList.add("snakeHead");
    steps = true;
}


let interval = setInterval(move,300);

window.addEventListener('keydown',function(e){
    
    if(steps == true){
        switch(true){
        case e.code== "ArrowRight" && direction!="left":
            direction = "right";
            steps = false;
            break;
        case e.code== "ArrowLeft" && direction!="right":
            direction = "left";
            steps = false;
            break;
        case e.code== "ArrowDown" && direction!="up":
            direction = "down";
            steps = false;
            break;
        case e.code== "ArrowUp" && direction!="down":
            direction = "up";
            steps = false;
            break;
        }
    }
})