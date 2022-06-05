





//Create a gameboardState module
const gameboardState = (() => {
  //create an 2d array gameboardMap for the gameboard
  let gameboardMap = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]

  resetMap = () => {
    gameboardMap = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
    displayGame.whipeMap()
  }

  //create a setLocationMark function with an x, y cordinate and a playermark
  setLocationMark = (x, y, playermark) => {
    //assign the playermark to the array
    gameboardMap[x][y] = playermark;
  }

  //create a getLocationMark with an x, y
  getLocationMark = (x, y) => {
    //return a string at location x,y
    return gameboardMap[x][y];
  }

  getBoard = () => { return gameboardMap }
  //return an object that has the edit function within
  return {
    setLocationMark,
    getLocationMark,
    getBoard,
    resetMap
  }
})();


//create a player function factory with playermark and name
const playerFunctionFactory = (pName, pMark) => {
  //create a varible playerMark
  let mark = pMark;
  //create a name varibles
  let name = pName;
  //create a function that gets playermark
  getPlayerMark = () => { return mark }

  //return a object that conatins the getters and setters
  return { name, getPlayerMark }
}

//create a module for controlling the display
const displayGame = (() => {
  const tileList = document.querySelectorAll('.tile');
  const currentPlayerDiv = document.querySelector('.currentPlayer');
  let clickLocation = null;

  tileList.forEach(item => {
    item.addEventListener('click', () => {
      clickLocation = item.classList[1].split('');
      clickLocation.splice(0, 1);
      gameController.getMove();
    })
  })

  whipeMap = () => {
    tileList.forEach(tile => {
      tile.textContent = "";
    })
  }

  updateMap = () => {
    tileList.forEach(tile => {
      tileLocation = tile.classList[1].split('')
      tileLocation.splice(0, 1);
      board = gameboardState.getBoard();
      if (tile.textContent !== board[tileLocation[0]][tileLocation[1]]) {
        tile.textContent = board[tileLocation[0]][tileLocation[1]]
      }
    })
  }

  updatePlayer = (name) => {
    currentPlayerDiv.textContent = name;
  }
  updateWinner = (win, player) => {
    if (win == 'tie') {
      currentPlayerDiv.textContent = `the game was a ${win}`;
    } else {
      currentPlayerDiv.textContent = `${player.name} is the winner!`;
    }
  }

  hideControl = () => {
    document.querySelector('.playerNameContainer').classList.toggle('hide');
    document.querySelector('.boardContainer').classList.toggle('hide');
    document.querySelector('.playButton').classList.toggle('hide');
    document.querySelector('.restartButton').classList.toggle('hide');
  }

  getClickLocation = () => { return clickLocation };
  //create a varible that takes a nodelist of divs items for the grid
  //create a function updateGameDisplay, updating visuals taking player.mark
  //create two loops going over the 2d arrays
  //create a varible for DOM query (ID 11, 12, 12, 21, 22, 23, etc)
  //change varible.inntertext to player mark

  return { getClickLocation, updateMap, whipeMap, updatePlayer, updateWinner, hideControl }
})();

//create a game module for controling gamestates
const gameController = (() => {
  //create currentPlayer value
  playButton = document.querySelector('.playButton')
  playButton.addEventListener('click', () => {
    startGame();
  })
  restartButton = document.querySelector('.restartButton')
  restartButton.addEventListener('click', () => {
    restartGame();
  })
  function setPlayers() {//create playerOne with player factor function
    playerOneInput = document.querySelector(".playerOneName")
    playerOne = playerFunctionFactory(playerOneInput.value, "X")
    //Do this again with playerTwo
    playerTwoInput = document.querySelector(".playerTwoName")
    playerTwo = playerFunctionFactory(playerTwoInput.value, "O")
    if (playerOne.name == playerTwo.name) {
      playerTwo.name += "2";
    }
  }
  let playerOne;
  let playerTwo;
  let currentPlayer;

  //assign currentPlayer to playerOne

  let gameStart = false;


  function startGame() {
    setPlayers();
    displayGame.hideControl();
    gameStart = true;
    currentPlayer = playerOne;
    displayGame.updatePlayer(currentPlayer.name);
  }
  function restartGame() {
    setPlayers();
    displayGame.hideControl();
    gameboardState.resetMap();
    gameStart = false
    displayGame.updatePlayer("");
  }

  function checkWin(board) {
    board
    //Checking horizontal
    for (let y = 0; y < board.length; y++) {
      if (!(board[y][0] == "" || board[y][1] == "" || board[y][2] == "")) {
        if ((board[y][0] === board[y][1]) && (board[y][2] === board[y][1])) {
          return board[y][0];
        }
      }
    }
    // cheacking vertical
    for (let x = 0; x < board.length; x++) {
      if (!(board[0][x] == "" || board[1][x] == "" || board[2][x] == "")) {
        if ((board[0][x] === board[1][x]) && (board[1][x] === board[2][x])) {
          return board[0][x];
        }
      }
    }
    //checking diagnal
    if (!(board[0][0] == "" || board[1][1] == "" || board[2][2] == "")) {
      if ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2])) {
        return board[1][1];
      }
    }
    if (!(board[0][2] == "" || board[1][1] == "" || board[2][0] == "")) {
      if ((board[0][2] == board[1][1]) && (board[1][1] == board[2][0])) {
        return board[1][1];
      }
    }
    //checking for full board
    let tie = 0;
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board.length; y++) {
        if (!(board[y][0] == "" || board[y][1] == "" || board[y][2] == "")) {
          if (board[x][y] !== "") {
            tie += 1
          }
        }
      }
    }
    if (tie === 9) {
      return "tie"
    }
    return false;
  }
  //create a getMove function the uses selection and player.mark
  getMove = () => {
    if (!gameStart) {
      console.log("Game not started");
      return;
    }
    clickLocation = displayGame.getClickLocation();
    if ((currentPlayer.name).toLowerCase() == 'ai' || (currentPlayer.name).toLowerCase() == 'ai2') {
      let aiMove = getAiMove()
      if (aiMove) {
        gameboardState.setLocationMark(aiMove[0], aiMove[1], currentPlayer.getPlayerMark())
      }
    } else {
      //check if mark as been made at this location alreay
      if (gameboardState.getLocationMark(clickLocation[0], clickLocation[1]) === "") {
        //call a setter for gameboard module to update the map
        gameboardState.setLocationMark(clickLocation[0], clickLocation[1], currentPlayer.getPlayerMark())
      }
    }
    //call a display function to update the DOM
    displayGame.updateMap();

    //check if game is won or tied
    win = checkWin(gameboardState.getBoard());
    if (win) {
      displayGame.updateWinner(win, currentPlayer)
      gameStart = false;
    } else {
      if (playerOne === currentPlayer) {
        currentPlayer = playerTwo;
      }
      else { currentPlayer = playerOne }
      displayGame.updatePlayer(currentPlayer.name);
    }
  }
  function getAiMove() {
    board = gameboardState.getBoard();
    let boardCopy = [Array.from(board[0]), Array.from(board[1]), Array.from(board[2])]
    //Checking for winning move
    for (let x = 0; x < boardCopy.length; x++) {
      for (let y = 0; y < boardCopy[x].length; y++) {
        boardCopy = [Array.from(board[0]), Array.from(board[1]), Array.from(board[2])]
        if (boardCopy[x][y] === "") {
          boardCopy[x][y] = currentPlayer.getPlayerMark()
          if (checkWin(boardCopy)) {
            return [x, y]
          }
        }
      }
    }
    //Checking for player win
    for (let x = 0; x < boardCopy.length; x++) {
      for (let y = 0; y < boardCopy[x].length; y++) {
        boardCopy = [Array.from(board[0]), Array.from(board[1]), Array.from(board[2])]
        if (boardCopy[x][y] === "") {
          if (currentPlayer.getPlayerMark() === "X") {
            boardCopy[x][y] = "O"
          } else {
            boardCopy[x][y] = "X"
          }
          if (checkWin(boardCopy)) {
            return [x, y]
          }
        }
      }
    }
    //Checking for random corner
    let corners = [[0, 0], [0, 2], [2, 0], [2, 2]]
    shuffle(corners);
    for (let i = 0; i < 4; i++) {
      corner = corners[i]
      if (boardCopy[corner[0]][corner[1]] == "") {
        return corners[i];
      }
    }
    //check center
    if (boardCopy[1][1] === "") {
      return [1, 1]
    }
    //check sides
    for (let i = 0; i < 4; i++) {
      let sides = [[0, 1], [1, 2], [2, 1], [1, 0]]
      let side = sides[i]
      if (boardCopy[side[0]][side[1]] == "") {
        return sides[i];
      }
    }
  }

  return { getMove, gameStart, startGame }
})();



function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
