function createHtmlFromMatrix(matrix){
    const field = document.createElement('div');
    field.classList.add("gameBoard");
    for(let i = 0;i<matrix.length;i++){
        const row = document.createElement('div');
        row.classList.add("row")
        for(j=0;j<matrix[i].length;j++){
            const cell = document.createElement('div');
            cell.classList.add("cell");
            cell.setAttribute("y",i);
            cell.setAttribute("x",j);
            cell.setAttribute("id",matrix[i][j].id);
            if(matrix[i][j].car) cell.classList.add("car")
            if(matrix[i][j].border) cell.classList.add("border")

            row.appendChild(cell);
        }
        field.appendChild(row);
    }

    document.body.appendChild(field);

}
