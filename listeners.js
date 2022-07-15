function addListeners() {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            
            let cell = document.querySelector("#row"+row+"-col"+col);
            cell.addEventListener("mouseover", () => {
                // console.log("mouse over cell: " + row + ", " + col);
                for (let iRow = 0; iRow < GRID_SIZE; iRow++) {
                    let rCell = document.getElementById('row'+iRow+'-col'+col);
                    rCell.classList.add('highlighted');
                }
                for (let iCol = 0; iCol < GRID_SIZE; iCol++) {
                    let cCell = document.getElementById('row'+row+'-col'+iCol);
                    cCell.classList.add('highlighted');
                }
                let localRow = row - row % 3;
                let localCol = col - col % 3;
                for (let iRow = localRow; iRow < localRow + 3; iRow++) {
                    for (let iCol = localCol; iCol < localCol + 3; iCol++) {
                        let cCell = document.getElementById('row'+iRow+'-col'+iCol);
                        cCell.classList.add('highlighted');
                    }
                }
            });
            cell.addEventListener("mouseout", () => {
                // console.log("mouse over cell: " + row + ", " + col);
                for (let iRow = 0; iRow < GRID_SIZE; iRow++) {
                    let rCell = document.getElementById('row'+iRow+'-col'+col);
                    rCell.classList.remove('highlighted');
                }
                for (let iCol = 0; iCol < GRID_SIZE; iCol++) {
                    let cCell = document.getElementById('row'+row+'-col'+iCol);
                    cCell.classList.remove('highlighted');
                }
                let localRow = row - row % 3;
                let localCol = col - col % 3;
                for (let iRow = localRow; iRow < localRow + 3; iRow++) {
                    for (let iCol = localCol; iCol < localCol + 3; iCol++) {
                        let cCell = document.getElementById('row'+iRow+'-col'+iCol);
                        cCell.classList.remove('highlighted');
                    }
                }
            });
        }
    }
}
