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

    renderCells() {

        let inputGroup = document.createDocumentFragment();
        let outputGroup = document.createDocumentFragment();

        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++){

                let cell;
                if (this.board[row][col] == 0) {
                    cell = document.createElement('input');
                    cell.type = 'number';
                    cell.min = '1';
                    cell.max = '9';
                } else {
                    cell = document.createElement('div');
                    cell.classList.add('given');
                }
                cell.id = 'row' + row + '-col' + col;
                cell.classList.add('grid-item');

                if (col % 3 == 0 && col != 0) {
                    cell.classList.add('verticle-space');
                }
                if (row % 3 == 0 && row != 0) {
                    cell.classList.add('horizontal-space');
                }

                if (col == 0 && row == 0) {
                    cell.classList.add('top-left-edge');
                } else if (col == 0 && row == 8) {
                    cell.classList.add('bottom-left-edge');
                } else if (col == 8 && row == 0) {
                    cell.classList.add('top-right-edge');
                } else if (col == 8 && row == 8) {
                    cell.classList.add('bottom-right-edge');
                }

                if (this.board[row][col] != 0) {
                    cell.textContent = this.board[row][col];
                }
                let cellClone = cell.cloneNode(true);
                inputGroup.appendChild(cell);
                outputGroup.appendChild(cellClone);
            }
        }
        document.getElementById('board-input').appendChild(inputGroup);
        document.getElementById('board-output').appendChild(outputGroup);
    }

	static generateBoard() {

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
	   
	    // try and solve the board
		let board = new Board(givens);
		board.solveBoard();
	
		// remove random elements from the board -- once at given num, make sure still solvable
		while (true) {
	
			let count = 81 - GIVEN_NUM;
			while (count != 0) {
				
				let row = Math.floor(Math.random() * GRID_SIZE);
				let col = Math.floor(Math.random() * GRID_SIZE);
			
				if (board.board[row][col] != 0) {
					count--;
					board.board[row][col] = 0;
				}
	
			}
			
			// create temp board
			let matrix = new Array(GRID_SIZE);
			for (let row = 0; row < GRID_SIZE; row++) {
				matrix[row] = new Array(GRID_SIZE);
				for (let col = 0; col < GRID_SIZE; col++) {
					matrix[row][col] = board.board[row][col];
				}
			}
			let testBoard = new Board(matrix);
	
			// test to make sure that the boards are unique enought to solve again
			if (testBoard.solveBoard()) {
				return board;
			}
		}
	}
}