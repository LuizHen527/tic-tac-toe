function Player(name, mark) {
  let points = 0;
  let markString = mark;

  function resetPoints() {
    points = 0;
  }

  function addPoint() {
    points = +1;
  }

  function getPoints() {
    return points;
  }

  function getMark() {
    return markString;
  }

  return { name, resetPoints, addPoint, getPoints, getMark };
}

function AI(name, mark) {
  let player = Player(name, mark);

  function makeMove(board, winCombinations) {
    return (
      makeWinMove(board, winCombinations) ||
      makeBlockMove(board, winCombinations) ||
      makeCenterMove(board, winCombinations) ||
      makeCornerMove(board, winCombinations) ||
      makeMiddleCornerMove(board, winCombinations)
    );
  }

  function makeCornerMove(board, winCombinations) {}

  function makeMiddleCornerMove(board, winCombinations) {

  }

  function makeCenterMove(board, winCombinations) {
    if (board[1][1] === null) {
      return { x: 1, y: 1};
    }

    return false
  }

  function makeBlockMove(board, winCombinations) {
    let freeCordinate;
    let aiMarksOnLine;

    for (const combinationArray of winCombinations) {
      freeCordinate = null;
      aiMarksOnLine = 0;
      console.log(board);

      console.log("---------------");

      for (const cordenate of combinationArray) {
        console.log(board[cordenate.x][cordenate.y]);

        if (board[cordenate.x][cordenate.y] === "x") {
          aiMarksOnLine++;
        } else if (board[cordenate.x][cordenate.y] === null) {
          freeCordinate = cordenate;
        }

        if (aiMarksOnLine === 2 && freeCordinate !== null) {
          return freeCordinate;
        }
      }
    }

    return false;
  }

  function makeWinMove(board, winCombinations) {
    let freeCordinate;
    let aiMarksOnLine;

    for (const combinationArray of winCombinations) {
      freeCordinate = null;
      aiMarksOnLine = 0;

      for (const cordenate of combinationArray) {
        console.log(board[cordenate.x][cordenate.y]);

        if (board[cordenate.x][cordenate.y] === "o") {
          aiMarksOnLine++;
        } else if (board[cordenate.x][cordenate.y] === null) {
          freeCordinate = cordenate;
        }

        if (aiMarksOnLine === 2 && freeCordinate !== null) {
          return freeCordinate;
        }
      }
    }

    return false;
  }

  return { ...player, makeMove };
}

function Gameboard() {
  let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  let winCordinates = [
    [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ],
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
    [
      { x: 0, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ],
  ];

  function getBoard() {
    return board;
  }

  function resetBoard() {
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  function putMark(player, placeX, placeY) {
    board[placeX][placeY] = player.getMark();
  }

  function putMarkAI(player, board, winCombinations) {
    cordenates = player.makeMove(board, winCombinations);

    console.log("Ai cordinates: " + cordenates);

    board[cordenates.x][cordenates.y] = "o";
  }

  function checkForWinner() {
    for (const combinationArray of winCordinates) {
      let allEqualX = true;
      let allEqualO = true;

      for (const cordenate of combinationArray) {
        if (board[cordenate.x][cordenate.y] !== "x") {
          allEqualX = false;
          break;
        }
      }

      for (const cordenate of combinationArray) {
        if (board[cordenate.x][cordenate.y] !== "o") {
          allEqualO = false;
          break;
        }
      }

      if (allEqualX) {
        return "player_one won";
      }

      if (allEqualO) {
        return "player_two won";
      }
    }

    return false;
  }

  function toString() {
    return `${board[0]}\n${board[1]}\n${board[2]}`;
  }

  return {
    getBoard,
    resetBoard,
    putMark,
    toString,
    checkForWinner,
    winCordinates,
    putMarkAI,
  };
}

const Program = (() => {
  let playerOne = Player("player_one", "x");
  let playerTwo = AI("player_two", "o");

  let board = Gameboard();

  function checkGame() {
    //Check board
    //Check player points
    let winner = board.checkForWinner();

    if (winner === "player_one won") {
      console.log("player_one won");

      playerOne.addPoint();

      board.resetBoard();
    } else if (winner === "player_two won") {
      console.log("player_two won");

      playerTwo.addPoint();

      board.resetBoard();
    }
  }

  function gameLoop() {
    let marks = [
      { x: 0, y: 0, player: "player_one" },
    ];

    console.log("-----------------");
    console.log(board + "");

    for (const mark of marks) {
      if (mark.player == "player_one") {
        board.putMark(playerOne, mark.x, mark.y);
      } else {
        board.putMark(playerTwo, mark.x, mark.y);
      }

      console.log("-----------------");
      console.log(board + "");

      checkGame();
    }

    board.putMarkAI(playerTwo, board.getBoard(), board.winCordinates);

    console.log("-----------------");
    console.log(board + "");

    // while (true) {
    //     board.putMark(playerOne, 0, 0);
    //     console.log(board.getBoard());
    // }
  }

  return gameLoop();
})();
