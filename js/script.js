//CONSTANTES
const gridValues = [[], [], []];
//JUGADORES

const Player = (name, mark) => {
  let score = 0;
  return { name, mark, score };
};

const players = {
  player1: Player("player1", "X"),
  player2: Player("player2", "O"),
};

let currentPlayer = players.player1;
function nextTurn() {
  if (currentPlayer === players.player1) {
    currentPlayer = players.player2;
  } else {
    currentPlayer = players.player1;
  }
}

//create board
const gameBoard = (function () {
  let count = 1;
  for (i = 0; i <= 2; ++i) {
    for (j = 1; j <= 3; ++j) {
      const square = document.createElement("div");
      const grid = document.getElementById("grid");

      square.classList.add(`square`);
      square.setAttribute("column", j);
      square.setAttribute("row", i + 1);
      square.setAttribute("value", ``);

      gridValues[i].push(square);
      grid.appendChild(square);
    }
  }
})();

//INTERFACE
const interface = (() => {
  const scoresContainer = document.createElement("div");
  const player1Score = document.createElement("div");
  const player2Score = document.createElement("div");
  const speaker = document.createElement("div");
  const grid = document.getElementById("grid");
  const main = document.getElementById("main-container");

  const scoreBoard = (() => {
    scoresContainer.classList.add("scores-container");
    player1Score.classList.add("player1-score");
    player2Score.classList.add("player2-score");
    speaker.classList.add("speaker");

    main.appendChild(scoresContainer);
    main.appendChild(speaker);
    scoresContainer.appendChild(player1Score);
    scoresContainer.appendChild(player2Score);
  })();

  function updateScoreboard(currentPlayer) {
    player1Score.textContent = "Player 1: " + players.player1.score;
    player2Score.textContent = "Player 2: " + players.player2.score;
  }

  return { scoreBoard, updateScoreboard };
})();

interface.updateScoreboard();

//OBJETO FUNCIONES
const functions = (() => {
  const speaker = document.getElementsByClassName("speaker")[0];

  const tie = () => {
    let cont = 0;
    tiles.forEach((tile) => {
      if (tile.getAttribute("value") !== "") {
        cont += 1;
      }
    });
    if (cont === 9) {
      return reset(), turnUpdateTie();
    }
  };

  function reset() {
    tiles.forEach((element) => {
      element.setAttribute("value", "");
      element.textContent = ``;
    });
  }

  const winColumn = function (tile) {
    let valor = tile.getAttribute("value");
    let columna = tile.getAttribute("column");
    if (valor != "") {
      if (
        valor == gridValues[0][columna - 1].getAttribute("value") &&
        valor == gridValues[1][columna - 1].getAttribute("value") &&
        valor == gridValues[2][columna - 1].getAttribute("value")
      ) {
        return (
          (currentPlayer.score += 1),
          interface.updateScoreboard(),
          turnUpdate(),
          reset()
        );
      }
    }
  };

  const winRow = (tile) => {
    let valor = tile.getAttribute("value");
    let fila = tile.getAttribute("row");
    if (valor != "") {
      if (
        valor == gridValues[fila - 1][0].getAttribute("value") &&
        valor == gridValues[fila - 1][1].getAttribute("value") &&
        valor == gridValues[fila - 1][2].getAttribute("value")
      ) {
        return (
          (currentPlayer.score += 1),
          interface.updateScoreboard(),
          turnUpdate(),
          reset(),
          console.log("agano linea")
        );
      }
    }
  };

  const winDiagonal = (tile) => {
    let valor = tile.getAttribute("value");
    if (valor != "") {
      if (
        (valor == gridValues[0][0].getAttribute("value") &&
          valor == gridValues[1][1].getAttribute("value") &&
          valor == gridValues[2][2].getAttribute("value")) ||
        (valor == gridValues[0][2].getAttribute("value") &&
          valor == gridValues[1][1].getAttribute("value") &&
          valor == gridValues[2][0].getAttribute("value"))
      ) {
        return (
          (currentPlayer.score += 1),
          interface.updateScoreboard(),
          turnUpdate(),
          reset(),
          console.log("agano diagonal")
        );
      }
    }
  };

  const turnUpdate = () => {
    speaker.textContent = currentPlayer.name + ` wins the round!`;
  };

  const turnUpdateTie = () => {
    speaker.textContent = "TIE";
  };

  const game = () => {
    if (players.player1.score == 5) {
      return (
        (speaker.textContent = "Player 1 wins the game!"),
        (players.player1.score = 0),
        (players.player2.score = 0),
        interface.updateScoreboard()
      );
    } else if (players.player2.score == 5) {
      return (
        (speaker.textContent = "Player 2 wins the game!"),
        (players.player1.score = 0),
        (players.player2.score = 0),
        interface.updateScoreboard()
      );
    }
  };

  return {
    tie,
    winRow,
    winColumn,
    winDiagonal,
    game,
    turnUpdate,
    turnUpdateTie,
  };
})();

//TILES GET CLICKED
const tiles = document.querySelectorAll(`div[class="square"]`);
tiles.forEach((tile) => {
  tile.addEventListener("click", (e) => {
    if (tile.getAttribute("value") == "") {
      tile.setAttribute("value", currentPlayer.mark);
      tile.textContent = `${currentPlayer.mark}`;

      functions.winColumn(tile);
      functions.winRow(tile);
      functions.winDiagonal(tile);
      functions.tie();
      functions.game();
      nextTurn();
    }
  });
});
