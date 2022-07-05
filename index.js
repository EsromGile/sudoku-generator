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

let boardGen = genereateBoard();
boardGen.renderCells();
// boardGen.solveBoard();
// boardGen.updateCells();