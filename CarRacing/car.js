export default class Car{
    position;
    coordinates = [];
    playerCar;
    constructor(playerCar){
        if(playerCar){
            this.position = "left";
            this.playerCar = true;
            this.coordinates = [
                {y: 19,x: 2},
                {y: 19,x: 4},
                {y: 18,x:3},
                {y: 17,x:2},
                {y: 17,x:3},
                {y: 17,x:4},
                {y: 16,x:3}
            ]
        } else {
            this.position = Math.floor(Math.random()*2) === 1? "right":"left";
            this.playerCar = false
            if(this.position ==="left"){
                this.coordinates = [
                    {y: -2,x: 2},
                    {y: -2,x: 4},
                    {y: -3,x:3},
                    {y: -4,x:2},
                    {y: -4,x:3},
                    {y: -4,x:4},
                    {y: -5,x:3}
                ]
            } else if(this.position ==="right"){
                this.coordinates = [
                    {y: -2,x: 5},
                    {y: -2,x: 7},
                    {y: -3,x:6},
                    {y: -4,x:5},
                    {y: -4,x:6},
                    {y: -4,x:7},
                    {y: -5,x:6}
                ]
            }
        }
    }
    move(){
        if(!this.playerCar){
            this.coordinates.forEach(element => {
                element.y +=1;
            });
        } else if(this.position==="left"){
            this.coordinates.forEach(element => {
                element.x +=3;
            });
            this.position="right";
            let audio = new Audio("./audio/move.mp3");
            audio.play();
        } else if(this.position==="right") {
            this.coordinates.forEach(element => {
                element.x -=3;
            });
            this.position="left";
            let audio = new Audio("./audio/move.mp3");
            audio.play();
        }
    }

}
