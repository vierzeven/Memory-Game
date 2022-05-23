// Initialize variables
let winner = null;
let movesMade = 0;
let lastBlockClicked = null;
let waitingForNextMove = true;
let pointsRoshni = 0;
let pointsAura = 0;
let players = ["Roshni", "Aura"];
let flippedCards = [null, null];
let currentPlayer = Math.floor(Math.random() * 2);
showWhatPlayer();
showScore();

// Function for reacting to card-clicks
let reactToCardClick = function() {
    if (this.id !== lastBlockClicked && waitingForNextMove) {
        movesMade++;
        lastBlockClicked = this.id;
        flipCard(this.id);
        if (movesMade === 2) {
            checkForMatch();
            resetVariables();
        }
    }
};

// Function for reacting to nextButton-click
let reactToNextClick = function() {
    let allBlocks = document.getElementsByClassName("item");
    for (let j = 0; j < allBlocks.length ; j++) {
        if (ponyArray[j] !== null) {
            allBlocks[j].style.background = "white";
        }
    }
    nextButton.style.display = 'none';
    movesMade = 0;
    lastBlockClicked = null;
    waitingForNextMove = true;
    switchPlayer();
    showWhatPlayer();
};

// Create shuffled deck
let ponyArray = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
shuffleDeck(ponyArray);
for (var i = 1; i <= 18 ; i++) {
    let block = document.createElement("div");
    block.className = "item";
    block.id = i;
    block.addEventListener('click', reactToCardClick);
    block.style.background = 'white';
    document.getElementById("gridcontainer").appendChild(block);
}

function flipCard(id) {
    let block = document.getElementById(id);
    block.style.background = 'url("img/pony0' + ponyArray[id - 1] + '.png")';
    if (movesMade === 1) {
        flippedCards[0] = ponyArray[id - 1];
    } else {
        flippedCards[1] = ponyArray[id - 1];
    }
    console.log(flippedCards.toString());
}

function shuffleDeck(ponyArray) {
    for (let i = 0; i < ponyArray.length ; i++) {
        let random = Math.floor(Math.random() * ponyArray.length);
        let temp = ponyArray[i];
        ponyArray[i] = ponyArray[random];
        ponyArray[random] = temp;
    }
}

function resetVariables() {
    // Cancel clicking possibility
    waitingForNextMove = false;
    // Show nextButton
    let nextButton = document.getElementById("nextButton");
    if (pointsAura + pointsRoshni < 9) {
        nextButton.style.display = "block";
    } else {
        determineWinner();
    }
    // Make nextButton clickable
    nextButton.addEventListener('click', reactToNextClick);
    // Exmpty flippedCards array
    flippedCards = [null, null];
}

function showWhatPlayer() {
    document.getElementById("beurt").innerHTML = players[currentPlayer];
}

function showScore() {
    document.getElementById("pointsRoshni").innerHTML = pointsRoshni;
    document.getElementById("pointsAura").innerHTML = pointsAura;
}

function checkForMatch() {
    if (flippedCards[0] === flippedCards[1]) {
        let winningPony = flippedCards[0];
        console.log("MATCH with the photoID " + winningPony);
        if (currentPlayer === 0) {
            pointsRoshni++;
        } else {
            pointsAura++;
        }
        // Switch player in anticipation of extra switch (thus avoiding the switch)
        switchPlayer();
        showScore();

        let allBlocks = document.getElementsByClassName("item");
        for (let i = 0; i < ponyArray.length ; i++) {
            if (ponyArray[i] === winningPony) {
                allBlocks[i].removeEventListener("click",reactToCardClick );
                console.log("Removed eventlistener from block " + i);
                ponyArray[i] = null;
            }
        }
    }
}

function switchPlayer() {
    if (currentPlayer === 0) {
        currentPlayer = 1;
    } else {
        currentPlayer = 0;
    }
}

function determineWinner() {
    if (pointsAura > pointsRoshni) {
        winner = "Aura";
    } else {
        winner = "Roshni";
    }
    let nextButton = document.getElementById("nextButton");
    nextButton.innerHTML = winner + " heeft gewonnen!";
    nextButton.style.display = 'block';
}

