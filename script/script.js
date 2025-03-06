let xIsNext = true; 
let history = [Array(9).fill(null)]; 
let currentMove = 0; 
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const movesElement = document.getElementById("moves");

// Function to render the game board based on the current state
function renderBoard() {
    boardElement.innerHTML = "";
    const squares = history[currentMove]; // Current board state
    for (let i = 0; i < 9; i += 3) {
        const row = document.createElement("div");
        row.className = "board-row";
        for (let j = 0; j < 3; j++) {
            const index = i + j;
            const button = document.createElement("div");
            button.className = "square";
            button.textContent = squares[index]; // "X" or "O" in the square
            button.onclick = () => handleClick(index); // click event to handle moves
            row.appendChild(button);
        }
        boardElement.appendChild(row);
    }
}

// Function to handle player moves
function handleClick(i) {
    if (history[currentMove][i] || calculateWinner(history[currentMove])) return; // Ignore if the square is already filled or if there's a winner

    const nextSquares = history[currentMove].slice(); 
    nextSquares[i] = xIsNext ? "X" : "O"; 
    history = [...history.slice(0, currentMove + 1), nextSquares]; 
    currentMove = history.length - 1; 
    xIsNext = !xIsNext; 
    updateGame(); 
}

// Function to update the game state (UI and status)
function updateGame() {
    renderBoard(); // Refresh the board
    const winner = calculateWinner(history[currentMove]); 
    statusElement.textContent = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`; // Update status message
    renderMoves(); 
}

// Function to render the move history and allow jumping to past moves
function renderMoves() {
    movesElement.innerHTML = "";
    history.slice(1).forEach((_, move) => {
        const button = document.createElement("button");
        button.className = "move-btn";
        button.textContent = `Go to move #${move + 1}`;
        button.onclick = () => jumpTo(move + 1); 
        const listItem = document.createElement("li");
        listItem.appendChild(button);
        movesElement.appendChild(listItem);
    });
}

// Function to jump to a specific move in history
function jumpTo(move) {
    currentMove = move;
    xIsNext = move % 2 === 0; 
    updateGame();
}

// Function to reset the game
function resetGame() {
    history = [Array(9).fill(null)]; 
    currentMove = 0; 
    xIsNext = true; 
    updateGame();
}

// Function to determine the winner of the game
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; 
        }
    }
    return null; 
}

// Initialize the game when the script loads
updateGame();
