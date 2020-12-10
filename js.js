const statusDisplay = document.querySelector('.game-status');
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningMessage = () => `${currentPlayer.name} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer.name}'s turn`;
const startGame = document.querySelector('.start-game')
let player1Name = document.querySelector('.player1')
let player2Name = document.querySelector('.player2')
let playerSelection = document.querySelector('.player-selection')
const displayWinner = document.querySelector('.display-winner')



const players = [
    player1 = {
    name: '',
    marker: 'X',

},

    player2 = {
    name: '',
    marker: 'O'
}
]

let currentPlayer = player1;

statusDisplay.innerHTML = currentPlayerTurn();

const getPlayers = () => {

        if (!player1Name.value || !player2Name.value) {
            alert('Please Enter a Name')
        } else {
            player1.name = player1Name.value
            player2.name = player2Name.value;
            statusDisplay.innerHTML = currentPlayerTurn();
            playerSelection.style.display = 'none'
            return {player1, player2}
        }
    }

function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer.marker;

}
function handlePlayerChange(){
    currentPlayer = currentPlayer === player1 ? player2 : player1
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation(){
let roundWon = false;
for (let i = 0; i <= 7; i++){
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === ''){
        continue;
    }
    if (a === b && b === c){
        roundWon = true;
        break
    }
}

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        displayWinner.style.visibility = 'visible'
        displayWinner.innerHTML = `What an absolute war! A battle! a barn Burner! ${currentPlayer.name} absolutely tore the house down!`
        gameActive = false;
        return;
}

    let roundDraw = !gameState.includes('');
    if (roundDraw){
        statusDisplay.innerHTML = drawMessage();
        return;
    }
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame(){
    gameActive = true;
    currentPlayer = player1;
    gameState = ['', '', '', '', '', '', '', '', ''];
    displayWinner.style.visibility = 'hidden'
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');

}

document.querySelectorAll('.cell').forEach(cell=>cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);
startGame.addEventListener('click', getPlayers)