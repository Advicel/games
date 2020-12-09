class PlayerCar{
    constructor(){
        this.position = "left";
        this.coordinates = [
            {y: 19,x: 2},
            {y: 19,x: 4},
            {y:18,x:3},
            {y:17,x:2},
            {y:17,x:3},
            {y:17,x:4},
            {y:16,x:3}
        ]
    }
    move(){
        if(this.position==="left"){
            this.coordinates.forEach(element => {
                element.x +=3;
            });
            this.position="right";
        } else if(this.position==="right") {
            this.coordinates.forEach(element => {
                element.x -=3;
            });
            this.position="left";
        }
    }

}
