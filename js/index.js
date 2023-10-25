const tetriminos = {
  I: [[1, 1, 1, 1]],
  J: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  L: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

const board = document.getElementById("game-board");
const boardWidth = 300;
const boardHeight = 500;

let gameBoard = tetriminos.I;

// Función para dibujar un tetrimino en el tablero
function drawTetrimino(shape, x, y) {
  // Elimina todos los tetriminos anteriores en el tablero
  const previousCells = document.querySelectorAll(".tetrimino-cell");
  previousCells.forEach((cell) => cell.remove());

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const cell = document.createElement("div");
        cell.className = "tetrimino-cell";
        cell.style.left = (x + col) * 50 + "px"; // Ajusta el tamaño de la celda según tus necesidades
        cell.style.top = (y + row) * 50 + "px";

        board.appendChild(cell);
      }
    }
  }
}

let posy = 0;
const interval = 1000; // 1000 milisegundos = 1 segundo

let x = 0;
let y = 0;
// Ejemplo de cómo dibujar un tetrimino en una posición específica
drawTetrimino(gameBoard, x, y);
const box = document.querySelector(".tetrimino-cell"); // Cambia de `querySelectorAll` a `querySelector`

// Agregar un event listener para detectar las teclas presionadas
document.addEventListener("keydown", (event) => {
  // Guarda las posiciones anteriores en caso de colisión
  let prevX = x;
  let prevY = y;

  // Detectar la tecla presionada
  switch (event.key) {
    case "ArrowUp":
      y -= 1;
      break;
    case "ArrowDown":
      y += 1;
      break;
    case "ArrowLeft":
      prevX -= 1;
      if (!checkCollisionLeft(prevX, y)) {
        x = prevX;
      }
      break;
    case "ArrowRight":
      prevX += 1;
      if (!checkCollisionRigth(gameBoard, prevX, y)) {
        x = prevX; // Restaura x si hay colisión
      }
      break;
  }

  // Verifica la colisión después de actualizar las posiciones
  if (checkCollisionRigth(gameBoard, x, y)) {
    // Si hay colisión, restaura las posiciones anteriores
    x = prevX;
    y = prevY;
  }

  // Dibuja el tetrimino en la posición (ya sea la original o la restaurada)
  drawTetrimino(gameBoard, x, y);
});

function checkCollisionRigth(tetrimino, xx, yy) {
  const row = tetrimino[0].length;
  const limiteRight = 6;
  const limiteRightMax = limiteRight - row;

  if (xx <= limiteRightMax) {
    return false;
  }
  return true;
}

function checkCollisionLeft(xx, yy) {
  const limiteLeftMax = 0;

  if (xx >= limiteLeftMax) {
    return false;
  }
  return true;
}
