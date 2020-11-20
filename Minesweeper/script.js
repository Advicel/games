let matrix = createMatrix(10,10);
for (let i = 0; i < 10; i++) {
    createMine(matrix); 
}
console.log(matrix);


let gameBoard = matrixToHtml(matrix);
document.querySelector("#app").appendChild(gameBoard);