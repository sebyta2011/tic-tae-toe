const playerCreator = (name, weapon) => {
  const fieldedWeapons = {};
  return { name, weapon, fieldedWeapons };
};

//create grid
const gameBoard = (function () {
  for (i = 1; i < 10; ++i) {
    const square = document.createElement("div");
    const grid = document.getElementById("grid");

    square.classList.add(`square-${i}`);
    square.setAttribute("value", "");
    grid.appendChild(square);
  }
})();

const player1 = playerCreator("plater1", "X");
const player2 = playerCreator("player2", "O");
