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
      // let ricardo = gridValues[i];
      // let juancho = ricardo[j];

      // juancho = { column: j, row: i + 1, value: "" };
      // gridValues[i] = { column: j, row: i + 1, value: "" };
      // let linea = gridValues[columna];
      // let casillita = linea[columna];

      gridValues[i].push(square);
      grid.appendChild(square);
      count++;
    }
  }
})();

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

function winRow() {
  for (let columna = 0; columna < 1; ++columna) {
    let linea = gridValues[columna];
    let casillita = linea[columna];
    if (
      casillita.getAttribute("value") ==
        linea[columna + 1].getAttribute("value") &&
      casillita.getAttribute("value") ==
        linea[columna + 2].getAttribute("value")
    ) {
      console.log("ricky");
    }
  }
}

// gridValues.getElementByAttribute()
// function winColumn(tiles) {
//   let lugar = tiles.getAttribute("place");
//   let indice = gridValues[g];
//   if()
//   }

//Tiles get clicked
const tiles = document.querySelectorAll(`div[class="square"]`);
tiles.forEach((tiles) => {
  tiles.addEventListener("click", (e) => {
    if (tiles.getAttribute("value") == "") {
      tiles.setAttribute("value", currentPlayer.mark);
      tiles.textContent = `${currentPlayer.mark}`;
      winRow();
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
