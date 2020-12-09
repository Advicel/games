class GameBoard{
    width = 10;
    height = 20;
    matrix=[];
    border=[];
    id = 0;
    constructor(){
        let borderCount =1;
        for (let i =0; i<this.height;i++){
            let row = [];
            for(let j = 0; j<this.width;j++){
                let cell = {
                    car:false,
                    border:false,
                    x:j,
                    y:i,
                    id:this.id++
                }
                if(j ===0 || j=== this.width-1){
                    if (borderCount<3) {
                        this.border.push([i,j])
                        cell.border=true;
                    }
                    if (j=== this.width-1) borderCount++;
                    if (j=== this.width-1 && borderCount>3) borderCount=0;  
                }
                row.push(cell)
            }
            this.matrix.push(row);
        }
    }
    moveBorder(){
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                this.matrix[i][j].border = false  
            }
        }
        this.border.forEach(element=>{
            element[0] = element[0]===19 ? 0 : element[0]+1; 
            this.matrix[element[0]][element[1]].border = true;
        })
    }
    
    removePlayerCar(){
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                this.matrix[i][j].car = false  
            }
        }
    }
    addPlayerCar(car){
        car.coordinates.forEach(element => {
            this.matrix[element.y][element.x].car = true;
        });
    }
}