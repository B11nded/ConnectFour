const ROW_COUNT = 6;
const COLUMN_COUNT = 7;
let currentPlayer = 'red';
let board = Array.from({ length: COLUMN_COUNT }, () => Array(ROW_COUNT).fill(null));

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    for (let row = 0; row < ROW_COUNT; row++) {
        for (let col = 0; col < COLUMN_COUNT; col++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-item');
            cell.dataset.column = col.toString();
            cell.dataset.row = row.toString();
            cell.addEventListener('click', () => placePiece(col));
            gameBoard.appendChild(cell);
        }
    }
}

function placePiece(column) {
    const row = getEmptyRow(column);
    if (row === -1) return; // Column is full
    board[column][row] = currentPlayer;
    updateBoard(column, row);
    if (checkForWin(column, row)) {
        alert(`${currentPlayer.toUpperCase()} wins!`);
        resetBoard();
    } else {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        document.getElementById('current-player').textContent = `Current Player: ${currentPlayer.toUpperCase()}`;
    }
}

function getEmptyRow(column) {
    for (let row = ROW_COUNT - 1; row >= 0; row--) {
        if (board[column][row] === null) {
            return row;
        }
    }
    return -1; // Column is full
}

function updateBoard(column, row) {
    const cell = document.querySelector(`[data-column="${column}"][data-row="${row}"]`);
    cell.style.backgroundColor = currentPlayer;
}

function checkForWin(column, row) {
    // Check horizontally
    let count = 1;
    count += checkDirection(column, row, -1, 0); // Check left
    count += checkDirection(column, row, 1, 0); // Check right
    if (count >= 4) return true;

    // Check vertically
    count = 1;
    count += checkDirection(column, row, 0, -1); // Check up
    count += checkDirection(column, row, 0, 1); // Check down
    if (count >= 4) return true;

    // Check diagonally (top-left to bottom-right)
    count = 1;
    count += checkDirection(column, row, -1, -1); // Check top-left
    count += checkDirection(column, row, 1, 1); // Check bottom-right
    if (count >= 4) return true;

    // Check diagonally (top-right to bottom-left)
    count = 1;
    count += checkDirection(column, row, 1, -1); // Check top-right
    count += checkDirection(column, row, -1, 1); // Check bottom-left
    if (count >= 4) return true;

    return false;
}

function checkDirection(column, row, colOffset, rowOffset) {
    let count = 0;
    let currentCol = column + colOffset;
    let currentRow = row + rowOffset;

    while (currentCol >= 0 && currentCol < COLUMN_COUNT && currentRow >= 0 && currentRow < ROW_COUNT && board[currentCol][currentRow] === currentPlayer) {
        count++;
        currentCol += colOffset;
        currentRow += rowOffset;
    }

    return count;
}


function resetBoard() {
    board = Array.from({ length: COLUMN_COUNT }, () => Array(ROW_COUNT).fill(null));
    document.querySelectorAll('.grid-item').forEach(cell => {
        cell.style.backgroundColor = 'lightblue';
    });
    currentPlayer = 'red';
    document.getElementById('current-player').textContent = 'Current Player: Red';
}

function endGame() {
    alert('Goodbye! Thanks for playing.');
    window.close(); // Close the browser window
}


document.getElementById('reset-button').addEventListener('click', resetBoard);
document.getElementById('end-button').addEventListener('click', endGame);

createBoard();