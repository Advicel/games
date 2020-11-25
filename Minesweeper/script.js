let matrix = null;
let running = null;
let size =  10;
let mine = 10;
init(size,mine)
update();

const difficult = document.querySelector(".difficult");

difficult.addEventListener("change",()=>{

    switch (difficult.value){
        case "easy":
            size = 10;
            mine = 10;
            break;
        case "medium":
            size = 15;
            mine = 30;
            break;
        case "hard":
            size = 20;
            mine = 80;
            break;
    }
    init()

} );



function init(){
    matrix = createMatrix(size,size);
    console.log(matrix)
    running = true;

    for (let i = 0; i < mine; i++) {
        createMine(matrix); 
    }
    update();

}


function update(){
    if(!running) return;
    const gameBoard = matrixToHtml(matrix);
    const app = document.querySelector("#app");
    app.innerHTML="";
    app.appendChild(gameBoard);

    document.querySelectorAll("img").forEach(imgEllement => {
        imgEllement.addEventListener("mousedown",mouseDownListener);
        imgEllement.addEventListener("mouseup",mouseUpListener);
        imgEllement.addEventListener("pointerdown",pointerDownListener);
        imgEllement.addEventListener("mouseleave", mouseLeaveListener)

    })

    if(isLose(matrix)){
        alert("Вы проиграли((")
        running = false;
    }
    if(isWin(matrix)){
        alert("Вы выйграли))")
        running = false;
    }

}

function pointerDownListener(event){
    if(event.isPrimary) return;
    const {left, right, cell} = getInfo(event);
    rightClickHandler(cell);
    update();
}
function mouseLeaveListener(event){
    const {left, right, cell} = getInfo(event);
    cell.left = false;
    cell.right = false;
    update();
}

function mouseDownListener(event){
    const {left, right, cell} = getInfo(event);

    if(left){
        cell.left = true;
    }
    if(right){
        cell.right = true;
    }
    if(cell.left && cell.right){
        bothClickHandler(cell);
    }

    update();
}

function mouseUpListener(event){
    const {left, right, cell} = getInfo(event);
    const both = cell.left && cell.right &&(left||right);
    if(!both && left && cell.left) leftClickHandler(cell)
    else if(!both && right && cell.right) rightClickHandler(cell);

    if(both){
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                matrix[i][j].poten = false;
            }
        }
    }

    if(left){
        cell.left = false;
    }
    if(right){
        cell.right = false;
    }
    update();
}

function leftClickHandler(cell){
    if(cell.show || cell.flag) return
    cell.show = true;
    showSpread(matrix, cell.x,cell.y);
}

function rightClickHandler(cell){
    if(cell.show) return
    cell.flag = !cell.flag;
}
function bothClickHandler(cell){
    if(!cell.show || !cell.number||(cell.show && cell.mine)) return;

    const cells = getArroundCells(matrix,cell);
    const flags = cells.filter(x=>x.flag);

    if(cell.number === flags.length){
        cells
            .filter(x=>!x.flag && !x.show)
            .forEach(cell => {
                showSpread(matrix, cell.x,cell.y)
                cell.show = true
            });
    }
    else { 
        cells
            .filter(x=>!x.flag && !x.show)
            .forEach(cell => cell.poten = true);
    }
}


function getInfo(event){
    const cellId = event.target.getAttribute("cell_id");
    const cell = getCellById(matrix,cellId);
    return {
        left: event.which===1,
        right:event.which===3,
        cell
    }
}

function showSpread(matrix, x,y){
    const cell = getCell(matrix,x,y);
    if(cell.number||cell.mine||cell.flag) return;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j]._marked = false;
        }
    }

    cell._marked = true;
    let flag = true;
    while(flag){
        flag = false;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                const cell = matrix[i][j];
                
                if(!cell._marked || cell.number){
                    continue
                }

                const cells = getArroundCells(matrix, cell);
                for(const cell1 of cells){
                    if(cell1._marked) continue;
                    if(!cell1.flag && !cell1.mine){
                        cell1._marked = true;
                        flag = true;
                    }
                } 
            }
        }
    }
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j]._marked) matrix[i][j].show = true;
            delete matrix[i][j]._marked;
        }
    }
}

function isWin(matrix){
        let mines = [];
        let flags = [];
        matrix.forEach(cell => {
            if(cell.flag){
                flags.push(cell);
            }
            if(cell.mine){
                mines.push(cell)
            }
        });

        if(mines.length!==flags.length) return false;

        for(const cell of mines){
            if(!cell.flag) return false;
        }
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if(!matrix[i][j].mine && !matrix[i][j].show) return false;   
            }
        }
        return true;
}
function isLose(matrix){
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j].mine && matrix[i][j].show)
                return true;
        }
        
    }
    return false;
}

function info(){
    alert(
        "Для игры на ПК: \n левая кнопка - открыть ячейку\n правая кнопка мыши - флажок\n две зажатые кнопки мыши показывают(или открывают) соседние ячейки \n Для игры на смартфоне \n тап двумя палцьами устанавливает флажок \n обынчый тап открывает ячейку "


    )
}