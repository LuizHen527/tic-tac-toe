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
      makeCenterMove(board) ||
      makeCornerMove(board, winCombinations) ||
      makeMiddleCornerMove(board, winCombinations)
    );
  }

  function makeMiddleCornerMove(board) {
    let middleCorners = [
      { x: 1, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 1 },
    ];

    for (const place of middleCorners) {
      if (board[place.x][place.y] === null) {
        return place;
      }
    }

    return false;
  }

  function makeCornerMove(board) {
    let middleCorners = [
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 0 },
    ];

    for (const place of middleCorners) {
      if (board[place.x][place.y] === null) {
        return place;
      }
    }

    return false;
  }

  function makeCenterMove(board) {
    if (board[1][1] === null) {
      return { x: 1, y: 1 };
    }

    return false;
  }

  function makeBlockMove(board, winCombinations) {
    let freeCordinate;
    let aiMarksOnLine;

    for (const combinationArray of winCombinations) {
      freeCordinate = null;
      aiMarksOnLine = 0;

      for (const cordenate of combinationArray) {
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
  }

  function checkForWinner() {
    let haveNull = false;

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
      } else if (allEqualO) {
        return "player_two won";
      }
    }

    for (const line of board) {
      for (const cell of line) {
        if (cell === null) {
          haveNull = true;
        }
      }
    }

    if (!haveNull) {
      return "tie";
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

function BoardRender() {
  const grid = [
    document.getElementById("0-0"),
    document.getElementById("0-1"),
    document.getElementById("0-2"),
    document.getElementById("1-0"),
    document.getElementById("1-1"),
    document.getElementById("1-2"),
    document.getElementById("2-0"),
    document.getElementById("2-1"),
    document.getElementById("2-2"),
  ];


  

  function showBoard(board) {
    for (const cell of grid) {
      const cordenates = cell.id.split("-");

      

      if (board[cordenates[0]][cordenates[1]] === "x") {

        for (const node of cell.childNodes) {

          if (node.tagName === "IMG") {
            node.classList = "x-simbol";
            node.src = "./assets/x-simbol.svg";
            
          }
        }

      } else if (board[cordenates[0]][cordenates[1]] === "o") {

        for (const node of cell.childNodes) {

          if (node.tagName === "IMG") {
            node.classList = "x-simbol";
            node.src = "./assets/x-simbol.svg";
            
          }
        }

      }
    }
  }

  return { showBoard, grid };
}

const Program = (() => {
  let playerOne = Player("player_one", "x");
  let playerTwo = AI("player_two", "o");
  let firstPlayer = "player_one";
  let render = BoardRender();

  for (const element of render.grid) {
    
    element.addEventListener("click", () => {
      gameLoop(element.id);

    })
  }


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
    } else if (winner === "tie") {
      console.log("tie");

    }
  }

  function startRound() {
    if (firstPlayer === "player_two") {
      board.putMarkAI(playerTwo, board.getBoard(), board.winCordinates);
    }
  }



  function gameLoop(id) {

    const xPoint = id.split("-")[0]
    const yPoint = id.split("-")[1]
    
    board.putMark(playerOne, xPoint, yPoint);

    render.showBoard(board.getBoard());

    board.putMarkAI(playerTwo, board.getBoard(), board.winCordinates);

    //render.showBoard(board.getBoard());
  }

})();
