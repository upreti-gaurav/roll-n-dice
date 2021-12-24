"use strict";

// getting the elements
const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");

const playerOneScore = document.querySelector("#score--0");
const playerTwoScore = document.querySelector("#score--1");
const diceElement = document.querySelector(".dice");
const buttonRoll = document.querySelector(".btn--roll");
const buttonNew = document.querySelector(".btn--new");
const buttonHold = document.querySelector(".btn--hold");

let playerOneCurrentScore = document.querySelector("#current--0");
let playerTwoCurrentScore = document.querySelector("#current--1");

// setting the elements
playerOneScore.textContent = "0";
playerTwoScore.textContent = "0";

let scores, currentScore, currentPlayer, playing;

// initial state
function initialValues() {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  playing = true;

  playerOneScore.textContent = 0;
  playerTwoScore.textContent = 0;
  playerOneCurrentScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;

  diceElement.classList.add("hidden");
  playerOne.classList.remove("player--winner");
  playerTwo.classList.remove("player--winner");
  playerOne.classList.add("player--active");
  playerTwo.classList.remove("player--active");
}

initialValues();

// switching the player
function switchPlayer() {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  playerOne.classList.toggle("player--active");
  playerTwo.classList.toggle("player--active");
}

// listening to the dice-roll button
buttonRoll.addEventListener("click", function () {
  if (playing) {
    // generate the random roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);

    // display the roll
    diceElement.classList.remove("hidden");
    diceElement.setAttribute("src", `dice-${dice}.png`);

    // check if it is 1, if 1 then switch the player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

buttonHold.addEventListener("click", function () {
  if (playing) {
    // add current scores to the active player score
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    // check the total-score if it is 100
    if (scores[currentPlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove("player--active");
    }

    //switch to the other player
    switchPlayer();
  }
});

buttonNew.addEventListener("click", function () {
  initialValues();
});
