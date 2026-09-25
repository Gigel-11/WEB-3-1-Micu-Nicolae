function calculateSum(a, b) {
  return a + b;
}

console.log(calculateSum(3, 5));
console.log(calculateSum(-2, 10));

const student = {
  name: "micu",
  age: 18,
  grade: 8,
  introduce() {
    console.log(`Sunt ${this.name} si am ${this.age} ani.`);
  }
};

student.introduce();
student.grade = 10;
console.log(student.grade);

const gameScore = {
  player: 0,
  draws: 0,
  computer: 0,
  displayScore() {
    console.log(`Tu: ${this.player} | Egal: ${this.draws} | Calculator: ${this.computer} `);
  }
};

let roundsPlayed = 0;

const btnPiatra = document.getElementById("btnPiatra");
const btnHartia = document.getElementById("btnHartia");
const btnFoarfeca = document.getElementById("btnFoarfeca");
const resetBtn = document.getElementById("resetBtn");
const resultEl = document.getElementById("result");
const roundsInfoEl = document.getElementById("roundsInfo");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const drawScoreEl = document.getElementById("drawScore");

function getComputerChoice() {
  const numarAleator = Math.floor(Math.random() * 3);
  if (numarAleator === 0) return "piatra";
  if (numarAleator === 1) return "hartia";
  return "foarfeca";
}

function getRoundWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "draw";
  const playerWins =
    (playerChoice === "piatra" && computerChoice === "foarfeca") ||
    (playerChoice === "foarfeca" && computerChoice === "hartia") ||
    (playerChoice === "hartia" && computerChoice === "piatra");
  return playerWins ? "player" : "computer";
}

function updateScoreDisplay() {
  playerScoreEl.textContent = gameScore.player;
  computerScoreEl.textContent = gameScore.computer;
  drawScoreEl.textContent = gameScore.draws;
}

function setButtonsDisabled(disabled) {
  btnPiatra.disabled = disabled;
  btnHartia.disabled = disabled;
  btnFoarfeca.disabled = disabled;
}

function checkFinalWinner() {
  if (gameScore.player >= 5) {
    resultEl.textContent = "Ai castigat jocul!";
    setButtonsDisabled(true);
    return true;
  }
  if (gameScore.computer >= 5) {
    resultEl.textContent = "Calculatorul a castigat jocul!";
    setButtonsDisabled(true);
    return true;
  }
  return false;
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const winner = getRoundWinner(playerChoice, computerChoice);

  if (winner === "draw") {
    gameScore.draws++;
    resultEl.textContent = "Egalitate!";
  } else if (winner === "player") {
    gameScore.player++;
    resultEl.textContent = "Ai castigat runda!";
  } else {
    gameScore.computer++;
    resultEl.textContent = "Calculatorul a castigat runda.";
  }

  roundsPlayed++;
  roundsInfoEl.textContent = `Runde jucate: ${roundsPlayed}`;

  updateScoreDisplay();
  gameScore.displayScore();
  checkFinalWinner();
}

function handlePiatraClick() {
  playRound("piatra");
}

function handleHartiaClick() {
  playRound("hartia");
}

function handleFoarfecaClick() {
  playRound("foarfeca");
}

function handleResetClick() {
  gameScore.player = 0;
  gameScore.computer = 0;
  gameScore.draws = 0;
  roundsPlayed = 0;
  updateScoreDisplay();
  roundsInfoEl.textContent = "Runde jucate: 0";
  resultEl.textContent = "Alege o varianta.";
  setButtonsDisabled(false);
}

btnPiatra.addEventListener("click", handlePiatraClick);
btnHartia.addEventListener("click", handleHartiaClick);
btnFoarfeca.addEventListener("click", handleFoarfecaClick);
resetBtn.addEventListener("click", handleResetClick);