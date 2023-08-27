// create array to hold board data

let boardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

//Define game variables

let player = 1;
let gameOver = false;


// Pull in cel
const cellElements = document.querySelectorAll(".cell");

// add event listener

cellElements.forEach((cell, index)  => {
    cell.addEventListener("click", () => {
        placeMarker(index);
    })
})

// create function placeMarker
function placeMarker(index){
    // Determine row and column from index
    let col = index % 3;
    let row = (index - col) / 3;
    //check if current cell is empty
    if (boardData[row][col] == 0 && gameOver == false) {

        boardData[row][col] = player

        console.log(boardData);
        //change player
        player *= -1;
        // update the screen with markers
        drawMarkers();

        // check if somebody win
        checkResult();
    }
}

// create function for drawing markers

function drawMarkers() {
    // itrate rows
    for(let row = 0; row < 3; row ++ ){
        // iterate coluns
        for(let col = 0; col < 3; col ++){
            // check if it is player 1's marker
            if(boardData[row][col] == 1){
                // update cell class  to add cross (x)
                cellElements[(row * 3) + col].classList.add("cross");

            }
            if(boardData[row][col] == -1){
                cellElements[(row * 3) + col].classList.add("circle");
            }
        }
    }
}

function checkResult() {

    // rows and cols
    for(let i = 0; i < 3; i ++){
        let rowsum = boardData[i][0] + boardData[i][1] + boardData[i][2];
        let colsum = boardData[0][i] + boardData[1][i] + boardData[2][i];

        if(colsum == 3 || rowsum == 3){
            endGame(1);
            return;
        }
        if(colsum == -3 || rowsum == -3){
            endGame(2);
            return;
        }
    }

    // check diagonals
    let diagonal1Sum = boardData[0][0] + boardData[1][1] + boardData[2][2];
    let diagonal2Sum = boardData[0][2] + boardData[1][1] + boardData[2][0];

    if (diagonal1Sum == 3 || diagonal2Sum == 3){
        endGame(1);
        return;
    }

    if (diagonal1Sum == -3 || diagonal2Sum == -3){
        endGame(2);
        return;
    }

    // check for a tie

    if( boardData[0].indexOf(0) == -1 &&
        boardData[1].indexOf(0) == -1 &&
        boardData[2].indexOf(0) == -1){

        endGame(0);
        return;
    }
}


// Function to end game and display result

function endGame(winner){
    // trigger game over
    gameOver = true;

    // check if game ended in a tie

    if (winner == 0){
        // console.log("Tie");
        resultElement.innerText = "It is a TIE";
    }

    else{
        // console.log(`Player ${winner} wins!`);
        resultElement.innerText = `Player ${winner} wins!`;
    }
}

const restartButton = document.getElementById("restart");
const resultElement = document.getElementById("result");
// add event listener to restart buttn

restartButton.addEventListener("click", () => {
    // reset game variables

    boardData = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    player = 1;
    gameOver = false;

    // reset GameBoard
    cellElements.forEach(cell => {
        cell.classList.remove("cross", "circle");
    });
    // Reset outcome text

    resultElement.innerText = "";
})

