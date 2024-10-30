'use strict';

// Selecting elements
const playerElements = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];
const scoreElements = [
  document.querySelector('#score--0'),
  document.querySelector('#score--1'),
];
const currentElements = [
  document.querySelector('#current--0'),
  document.querySelector('#current--1'),
];

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnReset = document.querySelector('.btn--new');

// Constants
const WINNING_SCORE = 10;

// Initial game state variables
let scores, currentScore, activePlayer, playing;

// Initialize game state
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreElements.forEach(scoreEl => (scoreEl.textContent = 0));
  currentElements.forEach(currentEl => (currentEl.textContent = 0));

  diceEl.classList.add('hidden');
  playerElements.forEach(playerEl =>
    playerEl.classList.remove('player--winner')
  );
  playerElements[0].classList.add('player--active');
  playerElements[1].classList.remove('player--active');
};

// Switch active player
const switchPlayer = () => {
  currentElements[activePlayer].textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerElements.forEach(playerEl =>
    playerEl.classList.toggle('player--active')
  );
};

// Rolling dice functionality
const rollDice = () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      currentElements[activePlayer].textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
};

// Hold current score functionality
const holdScore = () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    scoreElements[activePlayer].textContent = scores[activePlayer];

    if (scores[activePlayer] >= WINNING_SCORE) {
      playing = false;
      diceEl.classList.add('hidden');
      playerElements[activePlayer].classList.add('player--winner');
      playerElements[activePlayer].classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
};

// Event listeners
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnReset.addEventListener('click', init);

// Start game on load
init();
