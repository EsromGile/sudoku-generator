const GRID_SIZE = 9;

class Board {

    constructor(givens) {
        this.board = givens;
    }

    isNumberInRow(row, val) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (this.board[col][row] == val) 
                return true;
        }
        return false;
    }

    isNumberInCol(col, val) {
        for (let row = 0; row < GRID_SIZE; row++) {
            if (this.board[col][row] == val) 
                return true;
        }
        return false;
    }

    isNumberInSquare(col, row, val) {
        let localRow = row - row % 3;
        let localCol = col - col % 3;

        for (let rowIndex = localRow; rowIndex < localRow + 3; rowIndex++) {
            for (let colIndex = localCol; colIndex < localCol + 3; colIndex++) {
                if (this.board[colIndex][rowIndex] == val)
                    return true;
            }
        }
        return false;
    }

    isValidPlacement(col, row, val) {
        return  !this.isNumberInCol(col, val) &&
                !this.isNumberInRow(row, val) &&
                !this.isNumberInSquare(col, row, val);
    }

    solveBoard() {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (this.board[col][row] == 0) {
                    for (let tryNum = 1; tryNum <= GRID_SIZE; tryNum++) {
                        if (this.isValidPlacement(col, row, tryNum)) {
                            this.board[col][row] = tryNum;
                            if (this.solveBoard()) {
                                return true;
                            } else {
                                this.board[col][row] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    // this works
    updateCells() {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (this.board[col][row] == 0) {
                    console.log("didn't update");
                } else 
                    document.getElementById('c'+col+'r'+row).textContent = this.board[col][row];
            }
        }
    }

    // this works
    renderCells() {
        
        let output = document.createDocumentFragment();
        let input = document.createDocumentFragment();

        for (let col = 0; col < GRID_SIZE; col++){
            for (let row = 0; row < GRID_SIZE; row++) {

                let cellInput = document.createElement('input');
                cellInput.type = 'number';
                cellInput.id = 'input-c' + col + 'r' + row;
                cellInput.classList.add('grid-item');

                let cell = document.createElement('div');
                cell.id = 'c' + col + 'r' + row;
                cell.classList.add('grid-item');

                if (col % 3 == 0 && col != 0) {
                    cell.classList.add('horizontal-space');
                    cellInput.classList.add('horizontal-space');
                }
                if (row % 3 == 0 && row != 0) {
                    cell.classList.add('verticle-space');
                    cellInput.classList.add('verticle-space');
                }

                if (col == 0 && row == 0) {
                    cell.classList.add('top-left-edge');
                    cellInput.classList.add('top-left-edge');
                } else if (col == 0 && row == 8) {
                    cell.classList.add('top-right-edge');
                    cellInput.classList.add('top-right-edge');
                } else if (col == 8 && row == 0) {
                    cell.classList.add('bottom-left-edge');
                    cellInput.classList.add('bottom-left-edge');
                } else if (col == 8 && row == 8) {
                    cell.classList.add('bottom-right-edge');
                    cellInput.classList.add('bottom-right-edge');
                }

                if (this.board[col][row] != 0)
                    cell.textContent = this.board[col][row];
                cellInput.placeholder = this.board[col][row];
                output.appendChild(cell);
                input.appendChild(cellInput);
            }
        }

        let submit = document.createElement('input');
        submit.type = 'submit';
        submit.id = 'submit-button';
        submit.classList.add('submit-btn');
        input.appendChild(submit);

        
        // uncomment when used again
        // document.getElementById('board-input').appendChild(input);
        document.getElementById('board-output').appendChild(output);
    }
}


let givens = [
    [1, 7, 0, 0, 0, 0, 0, 2, 5 ],
    [0, 0, 0, 0, 2, 1, 4, 0, 0 ],
    [8, 0, 2, 0, 6, 0, 0, 1, 0 ],
    [2, 0, 6, 0, 0, 0, 8, 0, 0 ],
    [0, 0, 5, 0, 7, 0, 2, 0, 0 ],
    [0, 0, 0, 1, 0, 0, 3, 0, 9 ],
    [0, 0, 0, 0, 1, 0, 5, 0, 6 ],
    [0, 0, 8, 3, 4, 0, 0, 0, 0 ],
    [7, 5, 0, 0, 0, 0, 0, 4, 3 ]
];


let board = new Board(givens);
board.renderCells();
console.log(board.solveBoard());
board.updateCells();