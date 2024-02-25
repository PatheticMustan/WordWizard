let gameState = {
    isGameOver: false,
    turn: "blue",
    leftHealth: 100,
    rightHealth: 100,
    currentWord: "",
    winner: ""
};

function startGame() {
    gameState.isGameOver = false;
    gameState.turn = "blue";
    gameState.leftHealth = 100;
    gameState.rightHealth = 100;
    gameState.currentWord = "";
    winner = "";
    console.log("Made with love by PatheticMustan.");
    console.log("https://github.com/PatheticMustan/WordWizard");
}

function updateHealth() {
    document.getElementById("WizardLeftHP").value = gameState.leftHealth;
    document.getElementById("WizardRightHP").value = gameState.rightHealth;

    if (gameState.leftHealth <= 0) {
        gameState.winner = "red";
        gameState.isGameOver = true;
    }
    else if (gameState.rightHealth <= 0) {
        gameState.winner = "blue";
        gameState.isGameOver = true;
    }

    if (gameState.isGameOver) alert(`The ${gameState.winner} wizard reigns supreme!!!`);
}

function handleKeypress(key) {
    if (gameState.isGameOver) return alert(`The ${gameState.winner} wizard reigns supreme!!!`);

    document.getElementById("wordbox").innerHTML += `<div class="letter ${gameState.turn}Letter">${key}</div>`;

    // log
    log(`The ${gameState.turn} wizard used ${key}!`);
    
    // swap turn
    switchTurns();

    // add key
    gameState.currentWord += key;
}

function log(message) {
    const logs = document.getElementById("logs")
    logs.innerHTML += `<div class="highlightedBox box">${message}</div>`;

    // autoscroll to bottom
    logs.scrollTo(0, logs.scrollHeight);
}

function help() {
    alert("In Word Wizards, the goal of the game is to force the other person into spelling valid words.");
    alert("You take turns adding one letter at a time.");
    alert("If the opponent makes a valid word, click 'Cast Word!' to do crazy damage!");
    alert("Be careful though; if you click 'Cast!' on an invalid word, you're the one who takes damage.");
    alert("Additionally, if you think no valid words can be created, click 'Cast Doubt!'");
    alert("Have fun!");
}

function cast() {
    if (gameState.isGameOver) return alert(`The ${gameState.winner} wizard reigns supreme!!!`);
    
    if (gameState.currentWord.length <= 3) {
        alert("Words must be longer than 3 letters!");
        return;
    }
    // if it is a valid word...
    if (wordbank.includes(gameState.currentWord.toLowerCase())) {
        // deal 20 points of damage to the other wizard
        if (gameState.turn === "blue") {
            // damage red
            gameState.rightHealth -= 20;
        } else {
            gameState.leftHealth -= 20;
        }
        log(`${gameState.currentWord} was a valid word! 20 points of damage to ${gameState.turn==="blue"? "red" : "blue"}`);
    } else {
        // if the word is invalid though, deal 10 points to the wizard who clicked cast
        if (gameState.turn === "blue") {
            gameState.leftHealth -= 10;
        } else {
            gameState.rightHealth -= 10;
        }
        log(`${gameState.currentWord} was an invalid word... 10 points of damage to ${gameState.turn}.`)
    }

    switchTurns();
    updateHealth();
    clearLetters();
}

// this is the exact opposite of cast
function doubt() {
    if (gameState.isGameOver) return alert(`The ${gameState.winner} wizard reigns supreme!!!`);
    
    if (gameState.currentWord.length <= 1) {
        alert("You can't cast doubt on such a short word...");
        return;
    }

    // first we check if the word can be a possible valid answer
    const lcw = gameState.currentWord.toLowerCase();
    const possibleWords = wordbank.filter(word => word.startsWith(lcw));

    if (possibleWords.length === 0) {
        // deal 20 points of damage to the other wizard
        if (gameState.turn === "blue") {
            // damage red
            gameState.rightHealth -= 30;
        } else {
            gameState.leftHealth -= 30;
        }
        log(`${gameState.currentWord} could not have made any possible words! 30 points of damage to ${gameState.turn==="blue"? "red" : "blue"}`);
    } else {
        // if the word is invalid though, deal 10 points to the wizard who clicked cast
        if (gameState.turn === "blue") {
            gameState.leftHealth -= 30;
        } else {
            gameState.rightHealth -= 30;
        }
        log(`${gameState.currentWord} could have made ${possibleWords.length} different words... 30 points of damage to ${gameState.turn}.`)
    }

    switchTurns();
    updateHealth();
    clearLetters();
}

function switchTurns() {
    gameState.turn = gameState.turn==="blue"? "red" : "blue";
    log(`It's ${gameState.turn}'s turn`);
}

function clearLetters() {
    gameState.currentWord = "";
    document.getElementById("wordbox").innerHTML = "";
}

startGame();
