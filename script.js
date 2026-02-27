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

function Gameboard() {
  let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
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

  function toString() {
    return `${board[0]}\n${board[1]}\n${board[2]}`;
  }

  return {
    getBoard,
    resetBoard,
    putMark,
    toString,
  };
}

const Program = (() => {
  let playerOne = Player("player_one", "x");
  let playerTwo = Player("player_two", "o");

  let board = Gameboard();

  function gameLoop() {
    let marks = [
      { x: 0, y: 0, player: "player_one" },
      { x: 0, y: 1, player: "player_two" },
      { x: 1, y: 1, player: "player_one" },
      { x: 0, y: 2, player: "player_two" },
      { x: 2, y: 2, player: "player_one" },
      { x: 2, y: 0, player: "player_two" },
      { x: 2, y: 1, player: "player_one" },
    ];

    for (const mark of marks) {
      if (mark.player == "player_one") {
        board.putMark(playerOne, mark.x, mark.y);
      } else {
        board.putMark(playerTwo, mark.x, mark.y);
      }
      console.log("-----------------");
      console.log(board + "");
    }

    // while (true) {
    //     board.putMark(playerOne, 0, 0);
    //     console.log(board.getBoard());
    // }
  }

  return gameLoop();
})();
