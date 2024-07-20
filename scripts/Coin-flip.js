let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  losses: 0
};

let computerMove = '';
let randomNumber;

function pickComputerMove() {
  randomNumber = Math.random();
  if (randomNumber <= 0.5) {
    computerMove = 'Head';
  } else {
    computerMove = 'Tail';
  }
}

document.querySelector('.head').addEventListener('click', () => {
  playGame('Head');
});

document.querySelector('.tile').addEventListener('click', () => {
  playGame('Tail');
});

function pickPlayerMove(guess) {
  let result = '';
  if (guess === 'Head') {
    result = randomNumber <= 0.5 ? 'You Win!' : 'You Lose!';
  } else if (guess === 'Tail') {
    result = randomNumber > 0.5 ? 'You Win!' : 'You Lose!';
  }

  if (result === 'You Win!') {
    score.win += 1;
  } else {
    score.losses += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  
  setTimeout(() => {
  displayResult(guess, result);
  }, 800);
}

function playGame(guess) {
  pickComputerMove();
  pickPlayerMove(guess);
  flipping();
}

function displayResult(guess, result) {
  const results = document.querySelector('.js-result');
  results.textContent = `${result}`;

  const resultpick = document.querySelector('.js-pick');
  resultpick.textContent = `You picked ${guess}, Computer picked ${computerMove}`;

  const resultscore = document.querySelector('.js-score');
  resultscore.textContent = `Wins: ${score.win}, Losses: ${score.losses}`;
}

function resetScore() {
  localStorage.removeItem('score');
  score = { win: 0, losses: 0 };
  localStorage.setItem('score', JSON.stringify(score));
  const resultscore = document.querySelector('.js-score');
  resultscore.textContent = `Wins: 0, Losses: 0`;
  const resultpick = document.querySelector('.js-pick');
  resultpick.textContent = ``;
  const results = document.querySelector('.js-result');
  results.textContent = ``;
}

document.querySelector('.reset-score').addEventListener('click', resetScore);

function flipping() {
  const flippingContainer = document.querySelector('.js-flipping');
  if (computerMove === 'Head') {
    flippingContainer.innerHTML = '<img class="result" src="images/r-head.png" alt="Flipping Head">';
  } else if (computerMove === 'Tail') {
    flippingContainer.innerHTML = '<img class="result" src="images/r-tail.png" alt="Flipping Tail">';
  }
}


