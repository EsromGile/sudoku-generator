/* ---------------------------*/
/* ---------- Test -----------*/
/* ---------------------------*/
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

/* ---------------------------*/
/* ---------- Main -----------*/
/* ---------------------------*/
const EXPERT = 18;
const HARD = 24;
const MEDIUM = 30;
const EASY = 35;
const TRIVIAL = 40;

function clearAnimations() {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            let cell = document.getElementById('row'+row+'-col'+col);
            cell.placeholder = "";
            cell.classList.remove('fade-in')
            cell.classList.remove('clear');
        }
    }
}

function clearBoard() {
    board.renderCleared();
    document.getElementById('checkBtn').disabled = true;
    addListeners();
    setTimeout(() => {
        clearAnimations();
    }, 1000);
}

function checkBoard() {
    board.solveBoard();
    board.renderSolved();
    addListeners();
    setTimeout(() => {
        clearAnimations();
    }, 1200);
}

function solveBoard() {
    if (board.getInput())
        checkBoard();
}

function generateBoard() {
    let selectedRadio = document.querySelector('input[name="flexRadioDefault"]:checked');
    let givenNum = selectedRadio.value;
    board = Board.generateBoard(givenNum);
    board.renderGenerated();
    addListeners();
    document.getElementById('checkBtn').disabled = false;
    setTimeout(() => {
        clearAnimations();
    }, 1200);
}

var board = new Board();
clearBoard();