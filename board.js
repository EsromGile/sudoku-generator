const GRID_SIZE = 9;
const GIVEN_NUM = 25;

class Coord {
    constructor(val, given) {
        this.val = val;
        this.given = given;
    }
}

class Board {

    constructor(givens) {
        this.board = givens;
    }

    isNumberInRow(row, value) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (this.board[row][col].val == value) 
                return true;
        }
        return false;
    }

    isNumberInCol(col, value) {
        for (let row = 0; row < GRID_SIZE; row++) {
            if (this.board[row][col].val == value) 
                return true;
        }
        return false;
    }

    isNumberInSquare(row, col, value) {
        let localRow = row - row % 3;
        let localCol = col - col % 3;

        for (let rowIndex = localRow; rowIndex < (localRow + 3); rowIndex++) {
            for (let colIndex = localCol; colIndex < (localCol + 3); colIndex++) {
                if (this.board[rowIndex][colIndex].val == value)
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
                if (this.board[row][col].val == 0) {
                    for (let tryNum = 1; tryNum <= GRID_SIZE; tryNum++) {
                        if (this.isValidPlacement(row, col, tryNum)) {

                            this.board[row][col].val = tryNum;
                            if (this.solveBoard()) {
                                return true;
                            } else {
                                this.board[row][col].val = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    renderSolved() {
        const output = document.getElementById("board");
        const outputGroup = document.createDocumentFragment();

        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++){

                let oldCell = document.getElementById('row'+row+'-col'+col);
                let cell = document.createElement('div');
                if (this.board[row][col].given) {
                    cell.classList.add('given');
                } 

                cell.textContent = oldCell.value;
                cell.id = 'row' + row + '-col' + col;
                cell.classList.add('grid-item');

                this.addBoarders(cell, row, col);

                if (this.board[row][col].given) { /* do nothing */ }
                else if (this.board[row][col].val != cell.textContent) {
                    cell.classList.add('wrong-answer');
                    cell.classList.add('fade-in');
                    cell.classList.add('g'+ (row + col));
                } else {
                    cell.classList.add('right-answer');
                }
                cell.textContent = this.board[row][col].val;
                outputGroup.appendChild(cell);
            }
        }
        output.innerHTML = '';
        output.appendChild(outputGroup);
    }

    renderGenerated() {
        const output = document.getElementById("board");
        const outputGroup = document.createDocumentFragment();

        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++){

                let cell;
                if (this.board[row][col].given) {
                    cell = document.createElement('div');
                    cell.classList.add('given');
                } else {
                    cell = document.createElement('input');
                    cell.min = '1';
                    cell.max = '9';
                }
                cell.classList.add('fade-in');
                cell.classList.add('g'+ (row + col));

                cell.id = 'row' + row + '-col' + col;
                cell.classList.add('grid-item');

                this.addBoarders(cell, row, col);

                if (this.board[row][col].val != 0) {
                    cell.textContent = this.board[row][col].val;
                }
                outputGroup.appendChild(cell);
            }
        }
        output.innerHTML = '';
        output.appendChild(outputGroup);
    }

    renderCleared() {
        const output = document.getElementById("board");
        const outputGroup = document.createDocumentFragment();

        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++){

                let oldCell = document.getElementById('row'+row+'-col'+col);
                let cell = document.createElement('input');

                if (oldCell != null) {
                    cell.placeholder = oldCell.innerHTML;
                }
                cell.min = '1';
                cell.max = '9';
                cell.classList.add('clear');
                cell.classList.add('g'+ (row + col));

                cell.id = 'row' + row + '-col' + col;
                cell.classList.add('grid-item');

                this.addBoarders(cell, row, col);
                outputGroup.appendChild(cell);
            }
        }
        output.innerHTML = '';
        output.appendChild(outputGroup);
    }

    addBoarders(cell, row, col) {
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
    }

	static generateBoard() {
		// create board object & initialize values to 0
		let givens = new Array(GRID_SIZE);
		for (let row = 0; row < GRID_SIZE; row++) {
            
			givens[row] = new Array(GRID_SIZE);
			for (let col = 0; col < GRID_SIZE; col++) {
				givens[row][col] = new Coord(0, false);
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
					givens[row][col].val = array.splice(rand, 1);
				}
			}
		}
	   
	    // try and solve the board
		let board = new Board(givens);
		board.solveBoard();
	
        let count = 81 - GIVEN_NUM;
        while (count != 0) {
            
            let row = Math.floor(Math.random() * GRID_SIZE);
            let col = Math.floor(Math.random() * GRID_SIZE);
        
            if (board.board[row][col].val != 0) {
                count--;
                board.board[row][col].val = 0;
            }

        }

        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (board.board[row][col].val != 0) {
                    board.board[row][col].given = true;
                }
            }
        }
        return board;
	}
}