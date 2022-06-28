const GRID_SIZE = 9;

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Node {
    constructor({coord, value, constant}) {
        this.coord = coord;
        this.value = value;
        this.constant = constant;
    
        let x = this.coord.x % 3;
        let y = this.coord.y % 3;

        switch(x) {
            case 0:
                this.square = y;
                break;
            case 1:
                this.square = 3 + y;
                break;
            case 2:
                this.square = 6 + y;
                break;
        }
    }

    incrementValue() {
        this.value++;
    }
}

class Board {

    constructor() {
        this.board = new Array(GRID_SIZE);
        for (let i = 0; i < GRID_SIZE; i++) {

            let nodeCol = new Array(GRID_SIZE);
            for (let j = 0; j < GRID_SIZE; j++) {

                let rand = Math.floor(Math.random() * 10) % GRID_SIZE + 1;
                nodeCol[j] = new Node({
                    coord: new Coord(i, j),
                    value: rand,
                    constant: false
                });
            }

            this.board[i] = nodeCol;
        }
    }

    updateNode(x, y, value, constant) {
        this.board[x][y].value = value;
        this.board[x][y].contant = constant;
    }

    print() {
        for (let j = 0; j < GRID_SIZE; j++) {
            for (let i = 0; i < GRID_SIZE; i++) {
                console.log(
                    "Coord: (" + 
                    this.board[i][j].coord.x + 
                    ", " + 
                    this.board[i][j].coord.y + 
                    "), Value " +
                    this.board[i][j].value
                );
            }
        }
    }

    isNumberInRow(row, val) {
        for (let i = 0; i < GRID_SIZE; i++) {
            if (this.board[row][i].value == val) 
                return true;
        }
        return false;
    }

    isNumberInCol(col, val) {
        for (let i = 0; i < GRID_SIZE; i++) {
            if (this.board[i][col].value == val) 
                return true;
        }
        return false;
    }

    isNumberInSquare(col, row, val) {
        let localRow = row - row % 3;
        let localCol = col - col % 3;

        for (let j = localRow; j < localRow + 3; j++) {
            for (let i = localCol; i < localCol + 3; i++) {
                if (this.board[i][j].value == val)
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
                if (this.board[col][row].value == 0) {
                    for (let tryNum = 1; tryNum <= GRID_SIZE; tryNum++) {
                        if (this.isValidPlacement(tryNum, col, row)) {
                            this.board[col][row].value = tryNum;
                            if (this.solveBoard()) {
                                return true;
                            } else {
                                this.board[col][row].value = 0;
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
        
        let output = document.createDocumentFragment();
        let input = document.createDocumentFragment();

        for (let i = 0; i < GRID_SIZE; i++){
            for (let j = 0; j < GRID_SIZE; j++) {

                let cellInput = document.createElement('input');
                cellInput.type = 'number';
                cellInput.id = 'input-c' + i + 'r' + j;
                cellInput.min = '1';
                cellInput.max = '9';
                cellInput.classList.add('grid-item');

                let cell = document.createElement('div');
                cell.id = 'output-c' + i + 'r' + j;
                cell.classList.add('grid-item');

                if (i % 3 == 0 && i != 0) {
                    cell.classList.add('horizontal-space');
                    cellInput.classList.add('horizontal-space');
                }
                if (j % 3 == 0 && j != 0) {
                    cell.classList.add('verticle-space');
                    cellInput.classList.add('verticle-space');
                }

                if (i == 0 && j == 0) {
                    cell.classList.add('top-left-edge');
                    cellInput.classList.add('top-left-edge');
                } else if (i == 0 && j == 8) {
                    cell.classList.add('top-right-edge');
                    cellInput.classList.add('top-right-edge');
                } else if (i == 8 && j == 0) {
                    cell.classList.add('bottom-left-edge');
                    cellInput.classList.add('bottom-left-edge');
                } else if (i == 8 && j == 8) {
                    cell.classList.add('bottom-right-edge');
                    cellInput.classList.add('bottom-right-edge');
                }

                cell.textContent = this.board[i][j].value;
                // cellInput.placeholder = this.board[i][j].value;
                output.appendChild(cell);
                input.appendChild(cellInput);
            }
        }

        let submit = document.createElement('input');
        submit.type = 'submit';
        submit.id = 'submit-button';
        submit.classList.add('submit-btn');
        input.appendChild(submit);

        document.getElementById('board-input').appendChild(input);

        // uncomment when used again
        // document.getElementById('board-output').appendChild(output);
    }
}


let board = new Board();
board.renderCells();