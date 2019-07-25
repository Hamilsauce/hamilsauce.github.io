// global variables

let origBoard; //array to hold game tile values
const huPlayer = 'O';
const aiPlayer = 'x';
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [0, 4, 8],
    [6, 4, 2]
];

const cells = document.querySelectorAll('.cell');        
startGame();


function startGame() {
    document.querySelector('.endgame').style.display = "none";
    document.querySelector('.button-container').style.display = "none";
    origBoard = Array.from(Array(9).keys()),    //assign the variable it's values usin this Array method, where the array, goes through each item and grabs its index
        console.log(origBoard);

    for (let i = 0; i < cells.length; i++) {      //game reset - remove any existing values from  in the tic tac toe board
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].style.color = "rgba(43, 40, 40, 0.781)";
        cells[i].addEventListener('click', turnClick, false);
    }   
}

//Since human and AI turns must be treated differetnyl, their actions get separate functions
//the user actually clicks on its turn so...


function turnClick(square) {
   if (typeof origBoard[square.target.id] == 'number') {
       turn(square.target.id, huPlayer);
       if (!checkTie()) turn(bestSpot(), aiPlayer);         //After user takes their turn, check to see if game is tied (no available tiles to play) before executing AI function
    }
}


function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;

    let gameWon = checkWin(origBoard, player);
    if (gameWon)  gameOver(gameWon);
}

function checkWin(board, player ) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
    
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}


function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
        gameWon.player == huPlayer ? "rgb(75, 172, 252, 0.9)" : "rgba(211, 76, 27, 0.8)";
        document.getElementById(index).style.color =
        gameWon.player == huPlayer ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.8)";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == huPlayer ? "Human Wins" : "Cybernetic Organism Wins");  //declare outcome of game!
}

function declareWinner(who) {
    document.querySelector('.endgame').style.display = "block";
    document.querySelector('.button-container').style.display = "block";
    document.querySelector('.endgame, .text').innerText = who;
   
}


function emptySquares() {                                       //filter the board tile array for numbers only (weeds out any spot with Xs and Os) so AI can move to first availabe
    return origBoard.filter(s => typeof s == 'number');
}



function bestSpot() {
    return emptySquares()[0];
}

function checkTie() {                                   //if no available spaces, then tie game. Color the board and disable user interaction
    if (emptySquares().length == 0) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "rgba(66, 170, 68, 0.7)";
            
            if (cells[i].innerText == 'O') {
                cells[i].style.color = "#3689e2";
            } else {
                cells[i].style.color = "rgba(211, 76, 27, 0.8)";
            }
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner('Tie Game!');
        
        return true;
    } else {
        return false;

    }
}

