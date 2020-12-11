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
                left:false,
                right:false,
                both:false,
                mine:false,
                flag:false,
                show:false,
                poten:false,
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
function getArroundCells(matrix,cell){
    let arroundCells = [];
    for (let i = -1; i <= 1; i++) {
        for( let j = -1; j <= 1; j++ ){
            let cellI = getCell(matrix,cell.x+i,cell.y+j);
            if(j==0 && i==0 ){
                continue
            }
            if(!cellI) continue
            arroundCells.push(cellI);
        }   
    }
    return arroundCells;
}

function createMine(matrix){
    let cell = getFreeRandomCell(matrix);
    cell.mine = true;
    let arroundCells = getArroundCells(matrix, cell);
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
            imgEllement.setAttribute("cell_id",matrix[i][j].id);
            rowEllement.appendChild(imgEllement);
            switch (true){
                case matrix[i][j].flag:
                    imgEllement.src = 'flag.png';
                    break;
                case matrix[i][j].poten:
                    imgEllement.src = "poten.png";
                    break;
                case !matrix[i][j].show:
                    imgEllement.src = ("none.png");
                    break;
                case matrix[i][j].mine:
                    imgEllement.src = 'mine.png';
                    break;
                case matrix[i][j].number>0:
                    imgEllement.src=`number${matrix[i][j].number}.png`
                default:   
                }
        }
        gameBoard.appendChild(rowEllement);
    }
    return gameBoard;
}

function getCellById(matrix, id ){
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j].id===Number(id)) return matrix[i][j];
        }
    }
    return false;
}