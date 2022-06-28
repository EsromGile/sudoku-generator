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
        this.board = new Array(9);
        for (let i = 0; i < 9; i++) {

            let nodeCol = new Array(9);
            for (let j = 0; j < 9; j++) {

                let rand = Math.floor(Math.random() * 10) % 9 + 1;
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
        for (let j = 0; j < 9; j++) {
            for (let i = 0; i < 9; i++) {
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

    checkRow(y) {
        let list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let i = 0; i < 9; i++) {
            if (list.contains(this.board[i][y].value)) {
                list.splice(this.board[i][y].value - 1, 1);
            }
        }

        if (list.length > 0) return list;
    }

    checkCol(x) {
        let list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let i = 0; i < 9; i++) {
            if (list.contains(this.board[x][i].value)) {
                list = list.slice(this.board[x][i].value - 1, 1);
            }
        }

        if (list.length > 0) return list;
    }

    checkSquare(square) {
        /*  0 1 2
            3 4 5
            6 7 8  */

        let list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let xStart = (square % 3) * 3;
        let yStart = square - square % 3;

        for (let i = xStart; i < xStart + 3; i++) {
            for (let j = yStart; j < yStart + 3; j++) {
                if (list.contains(this.board[i][j].value)) {
                    list = list.slice(this.board[i][j].value - 1, 1);
                }
            }
        }

        if (list.length > 0) return list;
    }

    renderCells() {
        
        let output = document.createDocumentFragment();
        let input = document.createDocumentFragment();

        for (let i = 0; i < 9; i++){
            for (let j = 0; j < 9; j++) {

                let cellInput = document.createElement('input');
                cellInput.type = 'text';
                cellInput.id = 'input-c' + i + 'r' + j;
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

        document.getElementById('board-input').appendChild(input);
        document.getElementById('board-output').appendChild(output);
    }
}


let board = new Board();
board.renderCells();