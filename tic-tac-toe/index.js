let turn = 'x';
let symbols = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];
// Dodatkowo dodałam zmienną, która przechowuje literę zwycięzcy, aby zablokować możliwość wypełniania
// kolejnych pól po wyłonieniu zwycięzcy. Przy resetowaniu gry wartość tej zmiennej jest resetowana to wartości początkowej.
let winner = '';

const board = document.querySelector('.board');
const tiles = Array.from(document.querySelectorAll('.tile'));

board.addEventListener('click', ({ target }) => {
  if (winner) {
    alert('reset the game');
  } else {
    const classes = Array.from(target.classList);
    if (classes.includes('tile') && classes.length !== 1) return;

    const idx = tiles.indexOf(target);

    target.classList.add(`tile-${turn}`);
    symbols[idx % 3][Math.floor(idx / 3)] = turn;
    turn = turn === 'x' ? 'o' : 'x';

    displayTurn(turn);

    checkWin();
  }
});

function displayTurn(turn) {
  // 1. zmień text elementu h1 z klasą "turn" zależnie od tego, czyja jest aktualnie tura
  document.getElementsByClassName('turn')[0].innerHTML =
    turn.toUpperCase() + ' turn';
}

function checkWin() {
  // 2. sprawdź czy któryś z graczy wygrał pojedynek - jeśli tak wyświetla komunikat (możesz użyć np. funkcji "alert(...)")
  player = turn === 'x' ? 'o' : 'x';
  if (
    (symbols[0][0] === player &&
      symbols[0][1] === player &&
      symbols[0][2] === player) ||
    (symbols[1][0] === player &&
      symbols[1][1] === player &&
      symbols[1][2] === player) ||
    (symbols[2][0] === player &&
      symbols[2][1] === player &&
      symbols[2][2] === player) ||
    (symbols[0][0] === player &&
      symbols[1][0] === player &&
      symbols[2][0] === player) ||
    (symbols[0][1] === player &&
      symbols[1][1] === player &&
      symbols[2][1] === player) ||
    (symbols[0][2] === player &&
      symbols[1][2] === player &&
      symbols[2][2] === player) ||
    (symbols[0][0] === player &&
      symbols[1][1] === player &&
      symbols[1][2] === player) ||
    (symbols[0][2] === player &&
      symbols[1][1] === player &&
      symbols[2][0] === player)
  ) {
    alert(player.toUpperCase() + ' won!');
    winner = player;
  }
}

// 3. dodaj listener pod przycisk z napisaem "reset" tak, aby po jego kliknięciu wywołać funkcję reset
const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', reset);

function reset() {
  // 4. zresetuj stan gry
  symbols = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  for (const tile of tiles) {
    tile.classList.remove(
      tile.classList.contains('tile-x') ? 'tile-x' : 'tile-o'
    );
  }
  turn = 'x';
  displayTurn(turn);
  winner = '';
}
