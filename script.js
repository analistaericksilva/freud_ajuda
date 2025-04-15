const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Configuração do labirinto com base em células
const cellSize = 40; // Tamanho de cada célula do labirinto
const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Configuração do Freud
let freud = { x: 60, y: 60, size: cellSize - 10, speed: 5 };

// Saída do labirinto
const exit = { x: 740, y: 540, size: cellSize };

// Personagens no labirinto
const characters = [
  {
    name: "Paciente 1",
    x: 200,
    y: 200,
    size: 30,
    color: "#FFD700", // Camisa amarela
    hairColor: "#FF4500", // Cabelo laranja
    pose: "doubt",
    problem: "Eu me sinto constantemente ansiosa.",
    options: ["Pratique relaxamento", "Explique o ego", "Concentre-se no presente"],
    correct: 1
  },
  {
    name: "Paciente 2",
    x: 400,
    y: 300,
    size: 30,
    color: "#32CD32", // Camisa verde
    hairColor: "#8B4513", // Cabelo castanho
    pose: "doubt",
    problem: "Eu não consigo parar de me preocupar com o futuro.",
    options: ["Fale sobre o inconsciente", "Explique o superego", "Sugira meditação"],
    correct: 2
  },
  {
    name: "Paciente 3",
    x: 600,
    y: 400,
    size: 30,
    color: "#FF6347", // Camisa vermelha
    hairColor: "#000000", // Cabelo preto
    pose: "doubt",
    problem: "Eu sinto que não sou compreendida.",
    options: ["Fale sobre projeções", "Sugira terapia", "Ignore o problema"],
    correct: 0
  }
];

// Função para desenhar o labirinto
function drawMaze() {
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === 1) {
        ctx.fillStyle = "#34495E"; // Parede
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }
}

// Função para desenhar Freud
function drawFreud() {
  ctx.fillStyle = "#3498DB";
  ctx.fillRect(freud.x, freud.y, freud.size, freud.size);
}

// Função para desenhar a saída
function drawExit() {
  ctx.fillStyle = "#2ECC71";
  ctx.fillRect(exit.x, exit.y, exit.size, exit.size);
}

// Função para desenhar os personagens
function drawCharacters() {
  characters.forEach(character => {
    ctx.fillStyle = character.color;
    ctx.fillRect(character.x, character.y, character.size, character.size);

    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText(character.name, character.x, character.y - 10);
  });
}

// Verifica colisões
function checkCollision(newX, newY) {
  const col = Math.floor(newX / cellSize);
  const row = Math.floor(newY / cellSize);

  // Verifica se a próxima posição é uma parede
  return maze[row] && maze[row][col] === 1;
}

// Verifica vitória
function checkVictory() {
  if (
    freud.x < exit.x + exit.size &&
    freud.x + freud.size > exit.x &&
    freud.y < exit.y + exit.size &&
    freud.y + freud.size > exit.y
  ) {
    // Exibe a mensagem de vitória
    document.getElementById("game-over-box").classList.remove("hidden");
    document.getElementById("game-over-text").innerText = "Parabéns! Agora você é oficialmente um analista!";
  }
}

// Atualiza o jogo
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawFreud();
  drawExit();
  drawCharacters();
  checkVictory(); // Verifica se Freud alcançou a saída
  requestAnimationFrame(updateGame);
}

// Movimentação do Freud
document.addEventListener("keydown", e => {
  const nextX = freud.x + (e.key === "ArrowRight" ? freud.speed : e.key === "ArrowLeft" ? -freud.speed : 0);
  const nextY = freud.y + (e.key === "ArrowDown" ? freud.speed : e.key === "ArrowUp" ? -freud.speed : 0);

  // Verifica colisão antes de mover
  if (!checkCollision(nextX, freud.y)) freud.x = nextX;
  if (!checkCollision(freud.x, nextY)) freud.y = nextY;
});

// Reinicia o jogo
function restartGame() {
  freud = { x: 60, y: 60, size: cellSize - 10, speed: 5 };
  document.getElementById("game-over-box").classList.add("hidden");
  updateGame();
}

// Inicia o jogo
updateGame();