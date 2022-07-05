const GRID_SIZE = 9;

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

    print() {
        for (let row = 0; row < GRID_SIZE; row++) {
            let column = "";
            for (let col = 0; col < GRID_SIZE; col++) {
                if (col % 3 == 0 && col != 0)
                    column += " ";
                column += this.board[row][col];
                // console.log("col: " + col + ", row: " + row + ", value: " + this.board[row][col]);
            }
            console.log(column);
        }
    }
}

class Coord {
    constructor(y, x) {
        this.x = x;
        this.y = y;
    }
}

function genereateBoard() {

    // create board object & initialize values to 0
    let givens = new Array(GRID_SIZE);
    for (let i = 0; i < GRID_SIZE; i++) {
        givens[i] = new Array(GRID_SIZE);
        for (let j = 0; j < GRID_SIZE; j++) {
            givens[i][j] = 0;
        }
    }

    // generate diagonal square elements: squares 0, 4, 8
    for (let i = 0; i < 3; i++) {
        let localCol = i * 3;
        let localRow = i * 3;

        let arrayLength = GRID_SIZE;
        let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let row = localRow; row < localRow + 3; row++) {
            for (let col = localCol; col < localCol + 3; col++) {
                let rand = Math.floor(Math.random() * arrayLength--);
                givens[row][col] = array.splice(rand, 1);
            }
        }
    }

    /*  
    should hava a board something like:
    
    1 | 0 | 0
    ----------
    0 | 1 | 0
    ----------
    0 | 0 | 1
    
    where 1 is a populated unique square and 0 is empty
    */
   
   // try and solve the board
    let board = new Board(givens);
    let solvable = board.solveBoard();''

    // returning to test generation
    if (solvable) {
        return board;
    }

    // TODO: systematically remove elements and return solvable board
        // may need to check solvability after each removal to make sure it is unique

}

/*  ------------------------------------------
    ############### TESTING #################
    ------------------------------------------ */

let testBoard = [
    [7, 0, 2, 0, 5, 0, 6, 0, 0 ],
    [0, 0, 0, 0, 0, 3, 0, 0, 0 ],
    [1, 0, 0, 0, 0, 9, 5, 0, 0 ],
    [8, 0, 0, 0, 0, 0, 0, 9, 0 ],
    [0, 4, 3, 0, 0, 0, 7, 5, 0 ],
    [0, 9, 0, 0, 0, 0, 0, 0, 8 ],
    [0, 0, 9, 7, 0, 0, 0, 0, 5 ],
    [0, 0, 0, 2, 0, 0, 0, 0, 0 ],
    [0, 0, 7, 0, 4, 0, 2, 0, 3 ]
];

// let board = new Board(testBoard);
// board.renderCells();
// board.solveBoard();
// board.updateCells();
let boardGen = genereateBoard();
boardGen.renderCells();