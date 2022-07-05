const GRID_SIZE = 9;
const GIVEN_NUM = 20;

class Board {

    constructor(givens) {
        this.board = givens;
    }

    isNumberInRow(row, val) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (this.board[row][col] == val) 
                return true;
        }
        return false;
    }

    isNumberInCol(col, val) {
        for (let row = 0; row < GRID_SIZE; row++) {
            if (this.board[row][col] == val) 
                return true;
        }
        return false;
    }

    isNumberInSquare(row, col, val) {
        let localRow = row - row % 3;
        let localCol = col - col % 3;

        for (let rowIndex = localRow; rowIndex < (localRow + 3); rowIndex++) {
            for (let colIndex = localCol; colIndex < (localCol + 3); colIndex++) {
                if (this.board[rowIndex][colIndex] == val)
                    return true;
            }
        }
        return false;
    }

    isValidPlacement(row, col, val) {
        return  !this.isNumberInCol(col, val) &&
                !this.isNumberInRow(row, val) &&
                !this.isNumberInSquare(row, col, val);
    }

    solveBoard() {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (this.board[row][col] == 0) {
                    for (let tryNum = 1; tryNum <= GRID_SIZE; tryNum++) {
                        if (this.isValidPlacement(row, col, tryNum)) {
                            this.board[row][col] = tryNum;
                            if (this.solveBoard()) {
                                return true;
                            } else {
                                this.board[row][col] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    updateCells() {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (this.board[row][col] == 0) {
                    console.log("didn't update");
                } else 
                    document.getElementById('c'+col+'r'+row).textContent = this.board[row][col];
            }
        }
    }

    // TODO: need to refactor into two functions for simplicity
    renderCells() {
        
        let output = document.createDocumentFragment();
        let input = document.createDocumentFragment();

        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++){

                let cellInput = document.createElement('input');
                cellInput.type = 'number';
                cellInput.id = 'input-c' + col + 'r' + row;
                cellInput.classList.add('grid-item');

                let cell = document.createElement('div');
                cell.id = 'c' + col + 'r' + row;
                cell.classList.add('grid-item');

                if (col % 3 == 0 && col != 0) {
                    cell.classList.add('verticle-space');
                    cellInput.classList.add('verticle-space');
                }
                if (row % 3 == 0 && row != 0) {
                    cell.classList.add('horizontal-space');
                    cellInput.classList.add('horizontal-space');
                }

                if (col == 0 && row == 0) {
                    cell.classList.add('top-left-edge');
                    cellInput.classList.add('top-left-edge');
                } else if (col == 0 && row == 8) {
                    cell.classList.add('bottom-left-edge');
                    cellInput.classList.add('bottom-left-edge');
                } else if (col == 8 && row == 0) {
                    cell.classList.add('top-right-edge');
                    cellInput.classList.add('top-right-edge');
                } else if (col == 8 && row == 8) {
                    cell.classList.add('bottom-right-edge');
                    cellInput.classList.add('bottom-right-edge');
                }

                if (this.board[row][col] != 0)
                    cell.textContent = this.board[row][col];
                cellInput.placeholder = this.board[row][col];
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