const scoreNumber = document.querySelector(".score__number");
let score = 0;

const scoreNumber1 = document.querySelector(".score__number1");
let score1 = 0;



if (localStorage.getItem("score")) {
  score = parseInt(localStorage.getItem("score"));
  scoreNumber.innerText = score;
}

if (localStorage.getItem("score1")) {
  score1 = parseInt(localStorage.getItem("score1"));
  scoreNumber1.innerText = score1;
}

// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);



const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");
const btnNext = document.querySelector(".next-btn");
const modalNext = document.querySelector(".modal1");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const playAgainBtn1 = document.querySelector(".play-again1");



// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choosed(choice);
  });
});

function choosed(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
        `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win against pc";
      resultDivs[0].classList.toggle("winner");
      keepScore(1);
      btnNext.style.display = 'block';

    } else if (aiWins) {
      resultText.innerText = "you lost against pc";
      resultDivs[1].classList.toggle("winner");
      myScore(1);
    } else {
      resultText.innerText = "tie up";
      playAgainBtn.textContent = "replay";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(point) { 
  score1 += point;
  scoreNumber1.innerText = score1;
  localStorage.setItem("score1", score1);

 
}

function myScore(point) {
  score += point;
  scoreNumber.innerText = score;
  localStorage.setItem("score", score);
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
  btnNext.style.display = 'none';
  playAgainBtn.textContent = "play again";

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });


  
  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

btnNext.addEventListener("click", () => {
  modalNext.classList.toggle("show-modal1");
});
// REPLAY
playAgainBtn1.addEventListener("click", () => {
  modalNext.classList.toggle("show-modal1");
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
  btnNext.style.display = 'none';
  playAgainBtn.textContent = "play again";

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });


  
  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});
