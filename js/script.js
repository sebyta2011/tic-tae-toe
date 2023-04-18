//create board
const gridValues = [[], [], []];

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
      square.setAttribute("place", count);

      gridValues[i].push(square);
      grid.appendChild(square);
      count++;
    }
  }
})();

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
//CONDICIONES DE VICTORIA
const winColumn = function (tile) {
  let valor = tile.getAttribute("value");
  let columna = tile.getAttribute("column");
  if (valor != "") {
    if (
      valor == gridValues[0][columna - 1].getAttribute("value") &&
      valor == gridValues[1][columna - 1].getAttribute("value") &&
      valor == gridValues[2][columna - 1].getAttribute("value")
    ) {
      return (currentPlayer.score += 1), reset(), console.log("agano columna");
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
      return (currentPlayer.score += 1), reset(), console.log("agano linea");
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
      return reset(), console.log("empat");
    }
  }
};

const tie = () => {
  let cont = 0;
  tiles.forEach((tile) => {
    if (tile.getAttribute("value") !== "") {
      cont += 1;
    }
  });
  if (cont === 9) {
    return reset(), console.log("empate");
  }
};

function reset() {
  tiles.forEach((element) => {
    element.setAttribute("value", "");
    element.textContent = ``;
  });
}

//TILES GET CLICKED
const tiles = document.querySelectorAll(`div[class="square"]`);
tiles.forEach((tile) => {
  tile.addEventListener("click", (e) => {
    if (tile.getAttribute("value") == "") {
      tile.setAttribute("value", currentPlayer.mark);
      tile.textContent = `${currentPlayer.mark}`;

      winColumn(tile);
      winRow(tile);
      winDiagonal(tile);
      tie();
      nextTurn();
    }
  });
});

/* necesito:
un objeto que contenga los jugadores
un objeto por cada jugador que contenga el nombre, el arma
  y el score del jugador
una array con una referencia al valor de cada grilla
una funcion que cuando se cliquee una casilla, la asigne;
  despues de asignarsela a un jugador, la funcion espera
  a que el otro jugador cliquee otra casilla para 
  asignarsela
una funcion que cuando se cliquee una casilla, chequee si
  alguien gano, empataron o si el juego sigue
  si alguien gano, le suma 1 al score del que gano. 
  Si empataron, muestra empate en la pantalla
*/
