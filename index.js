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

let boardGen = Board.generateBoard();
boardGen.renderCells();

function test() {
    const myNode = document.getElementById("board");
    myNode.innerHTML = '';
    boardGen.solveBoard();
    boardGen.renderCells();
}

function generateBoard() {
    const myNode = document.getElementById("board");
    myNode.innerHTML = '';
    boardGen = Board.generateBoard();
    boardGen.renderCells();
}