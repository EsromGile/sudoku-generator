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

let boardInput = Board.generateBoard();
boardInput.renderCells();

function test() {
    const input = document.getElementById("board-input");
    const output = document.getElementById("board-output");
    input.innerHTML = '';
    output.innerHTML = '';
    boardInput.solveBoard();
    boardInput.renderCells();
}

function generateBoard() {
    const input = document.getElementById("board-input");
    const output = document.getElementById("board-output");
    input.innerHTML = '';
    output.innerHTML = '';
    boardInput = Board.generateBoard();
    boardInput.renderCells();
}