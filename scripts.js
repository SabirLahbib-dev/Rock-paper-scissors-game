let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};

updateScoreElement();

// function confirmation
function showConfirmation() {
  const message = document.querySelector(".js-confirmation-message");

  message.innerHTML = `
    <p>Are you sure you want to reset the score</p>
    <button class="js-confirm-yes">Yes</button>
    <button class="js-confirm-no">No</button>
  `;

  // event Yes
  document.querySelector(".js-confirm-yes").addEventListener("click", () => {
    reset();
    message.innerHTML = "";
  });

  // event No
  document.querySelector(".js-confirm-no").addEventListener("click", () => {
    message.innerHTML = "";
  });
}

//reset button
document
  .querySelector(".js-reset-button")
  .addEventListener("click", showConfirmation);

// keyboard (Backspace)
document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    showConfirmation();
  }
});

// reset function
const reset = () => {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
};

let isAutoPlaying = false;
let intervalId;

document.querySelector(".js-autoplaying").addEventListener("click", autoplay);
document.addEventListener("keydown", (event) => {
  if (event.key === "a" || event.key === "A") {
    autoplay();
  }
});
//const autoPlay = () => {};
// here regular function is better because of : it's easier to read and hoisting

function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".js-autoplaying").innerHTML = "Stop auto playing";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".js-autoplaying").innerHTML = "Auto Playing";
  }
}
document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});
document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});
document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "P" || event.key === "p") {
    playGame("paper");
  } else if (event.key === "r" || event.key === "R") {
    playGame("rock");
  } else if (event.key === "s" || event.key === "S") {
    playGame("scissors");
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "scissors") {
      result = "Tie.";
    } else if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You won.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "rock") {
      result = "You won.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You won.";
    }
  }

  if (result === "You won.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.loses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();

  document.querySelector(".js-result").innerHTML = `${result}`;
  document.querySelector(".js-moves").innerHTML =
    `You <img src="images/${playerMove}-emoji.png" class="Move"><img src="images/${computerMove}-emoji.png" class="Move"> Computer`;
}
function updateScoreElement() {
  document.querySelector(".js-score").innerHTML =
    `Wins: ${score.wins}, Loses : ${score.loses}, Ties : ${score.ties}`;
}

function pickComputerMove() {
  let computerMove = "";
  let randomNumber1 = Math.random();
  if (randomNumber1 >= 0 && randomNumber1 < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber1 >= 1 / 3 && randomNumber1 < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber1 >= 2 / 3 && randomNumber1 < 1) {
    computerMove = "scissors";
  }

  return computerMove; //return value
}
