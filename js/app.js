/*-------------------------------- Constants --------------------------------*/
const boardEl = document.querySelector(".board");
const squareEls = document.querySelectorAll('.square');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector("#reset");

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];  

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/
function init() {
    console.log("Game initializing...");
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "X";
    winner = false;
    tie = false;
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((value, index) => {
      squareEls[index].textContent = value;
    });
}

function updateMessage() {
    if (winner) {
      messageEl.textContent = `Congratulations! ${turn} wins!`;
    } else if (tie) {
      messageEl.textContent = "It's a tie!";
    } else {
      messageEl.textContent = `It's ${turn}'s turn!`;
    }
}

function handleClick(event) {
    const square = event.target;
  
    if (!square.classList.contains("square")) 
        return;
  
    const squareIndex = parseInt(square.id); 
  
    if (board[squareIndex] !== "" || winner)
        return;
  
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index) {
    board[index] = turn;
    console.log("Board after move:", board);
}

function checkForWinner() {
    winningCombos.forEach((combo) => {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = true;
      }
    });
    console.log("Winner:", winner);
}

function checkForTie() {
    if (winner)
        return;
    tie = board.every(square => square !== "");
    console.log("Tie:", tie);
}
 
function switchPlayerTurn() {
    if (winner) 
        return;
    turn = turn === "X" ? "O" : "X";
    console.log("Turn:", turn);
}

/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener("click", handleClick);
resetBtnEl.addEventListener("click", init);

init();