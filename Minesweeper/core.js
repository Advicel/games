function createMatrix(x,y){
    let matrix = [];
    let id = 1;
    for (let i = 0;i < x;i++){
        let row = [];
        for (let j = 0;j < y;j++){
            row.push({
                id:id++,
                x:i,
                y:j,
                mine:false,
                flag:false,
                show:true,
                number:0
            })
        }
        matrix.push(row);
    }
    return matrix;
}

function getFreeRandomCell(matrix){
    let freeCells = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if(!matrix[i][j].mine){
                freeCells.push(matrix[i][j]);
            }
        }
    }
    
    return freeCells[Math.floor(Math.random()*freeCells.length)];
}
function getCell(matrix,x,y){
    if(!matrix[x]||!matrix[x][y]){
        return false;
    }
    return matrix[x][y];
}
function getArroundCells(matrix,x,y){
    let arroundCells = [];
    for (let i = -1; i <= 1; i++) {
        for( let j = -1; j <= 1; j++ ){
            let cell = getCell(matrix,x+i,y+j);
            if(j==0 && i==0 ){
                continue
            }
            if(!cell) continue
            arroundCells.push(cell);
        }   
    }
    return arroundCells;
}

function createMine(matrix){
    let cell = getFreeRandomCell(matrix);
    cell.mine = true;
    let arroundCells = getArroundCells(matrix, cell.x,cell.y);
    for (let i = 0; i < arroundCells.length; i++) {
        arroundCells[i].number+=1;        
    }
}

function matrixToHtml(matrix){
    const gameBoard = document.createElement('div');
    gameBoard.classList.add("sapper");
    for (let i = 0; i < matrix.length; i++) {
        const rowEllement = document.createElement('div');
        rowEllement.classList.add("row");
        for (let j = 0; j < matrix[i].length; j++) {
            const imgEllement = document.createElement('img');
            imgEllement.draggable=false;
            imgEllement.oncontextmenu =()=>false;
            rowEllement.appendChild(imgEllement);
            switch (true){
                case matrix[i][j].flag:
                    imgEllement.src = 'flag.png';
                    break;
                case matrix[i][j].mine:
                    imgEllement.src = 'mine.png';
                    break;
                case matrix[i][j].number>0:
                    imgEllement.src=`number${matrix[i][j].number}.png`
                default:
                    imgEllement.classList.add("none");
                }
        }
        gameBoard.appendChild(rowEllement);
    }
    return gameBoard;
}