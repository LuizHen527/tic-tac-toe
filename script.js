function Player(name, mark, idPointsElement) {
  let points = 0;
  let markString = mark;

  let idElementPoints = idPointsElement;

  function resetPoints() {
    points = 0;
  }

  function addPoint() {
    const pointsElement = document.getElementById(`${idElementPoints}`);

    points += 1;

    pointsElement.textContent = `Points: ${getPoints()}`;
  }

  function getPoints() {
    return points;
  }

  function getMark() {
    return markString;
  }

  return { name, resetPoints, addPoint, getPoints, getMark };
}

function AI(name, mark, idPointsElement) {
  let player = Player(name, mark, idPointsElement);

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

    board[cordenates.x][cordenates.y] = player.getMark();
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
            node.classList = "o-simbol";
            node.src = "./assets/circle.svg";
          }
        }
      } else if (board[cordenates[0]][cordenates[1]] === null) {
        for (const node of cell.childNodes) {
          if (node.tagName === "IMG") {
            node.classList = "";
            node.src = "";
          }
        }
      }
    }
  }

  return { showBoard, grid };
}

const Program = (() => {
  let playerOne = Player("player_one", "x", "points-player");
  let playerTwo = AI("player_two", "o", "points-ai");
  let firstPlayer = "player_one";
  let render = BoardRender();

  for (const element of render.grid) {
    element.addEventListener("click", () => {
      gameLoop(element.id);
    });
  }

  let board = Gameboard();

  async function checkGame() {
    //Check board
    //Check player points
    let winner = board.checkForWinner();

    if (winner === "player_one won") {
      playerOne.addPoint();

      showMessage("You win", "green");

      await delay(2000)

      board.resetBoard();

      render.showBoard(board.getBoard());

      firstPlayer = "player_one";

      showMessage("Your turn...");

      return "player_one won";
    } else if (winner === "player_two won") {
      playerTwo.addPoint();

      showMessage("AI win", "red");

      await delay(2000);

      board.resetBoard();

      render.showBoard(board.getBoard());

      firstPlayer = "player_two";

      showMessage("Your turn...");

      return "player_two won";
    } else if (winner === "tie") {
      board.resetBoard();

      render.showBoard(board.getBoard());

      return "tie";
    }
  }

  function startRound() {
    if (firstPlayer === "player_two") {
      board.putMarkAI(playerTwo, board.getBoard(), board.winCordinates);
    }
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function showMessage(message, color) {
    const statusPara = document.getElementById("game-status");

    statusPara.textContent = message;

    if (color) {
      statusPara.setAttribute("style", `color: ${color};`);
    } else {
      statusPara.setAttribute("style", `color: black;`);
    }
  }

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  async function gameLoop(id) {
    const xPoint = id.split("-")[0];
    const yPoint = id.split("-")[1];
    let gameSituation = "";

    board.putMark(playerOne, xPoint, yPoint);

    render.showBoard(board.getBoard());

    gameSituation = await checkGame();

    if (gameSituation !== "player_one won") {
      showMessage("AI is making a move...");

      await delay(getRandomInt(500, 1500));

      board.putMarkAI(playerTwo, board.getBoard(), board.winCordinates);

      render.showBoard(board.getBoard());

      showMessage("Your turn...");

      checkGame();
    }

    //render.showBoard(board.getBoard());
  }
})();
