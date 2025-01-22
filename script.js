"use strict";

// variables
let player_1_score = 0;
let player_2_score = 0;
let player_1_current_total = 0;
let player_2_current_total = 0;
const winning_score = 100;

// generate random number
let randomNumber = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

// buttons
const newGameButton = document.querySelector(".btn--new");
const rollDiceButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");

// other selector
let dice = document.querySelector(".dice");
let player_1_current = document.querySelector("#current--0");
let player_2_current = document.querySelector("#current--1");
let active_player = document.querySelector(".player--active");
const player_1 = document.querySelector(".player--0");
const player_2 = document.querySelector(".player--1");
let player_1_game_score = document.querySelector("#score--0");
let player_2_game_score = document.querySelector("#score--1");

// functions
function getProperDice(dice_num) {
  let get_dice = (dice.src = `dice-${dice_num}.png`);
  return get_dice;
}

// current score tracker
function addCurrentValue(value) {
  if (player_1.classList.contains("player--active")) {
    player_1_current_total += value;
    return player_1_current_total;
  } else {
    player_2_current_total += value;
    return player_2_current_total;
  }
}

// game over model
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-modal");

function gameOverDisplay() {
  modal.classList.remove("hidden");
}
closeButton.addEventListener("click", function () {
  modal.classList.add("hidden");
});

rollDiceButton.addEventListener("click", function () {
  // show dice
  dice.classList.remove("hidden");
  // generate random number
  let diceNumber = randomNumber();

  // get proper dice image
  getProperDice(diceNumber);

  // track current score and shuffle player
  if (player_1.classList.contains("player--active")) {
    if (diceNumber !== 1) {
      let current_number = addCurrentValue(Number(diceNumber));
      player_1_current.textContent = current_number;
      player_1_current_total = current_number;
    } else {
      player_1_current.textContent = 0;
      player_1_current_total = 0;
      player_1.classList.remove("player--active");
      player_2.classList.add("player--active");
    }
  } else if (player_2.classList.contains("player--active")) {
    if (diceNumber !== 1) {
      let current_number = addCurrentValue(Number(diceNumber));
      player_2_current.textContent = current_number;
      player_2_current_total = current_number;
    } else {
      player_2_current.textContent = 0;
      player_2_current_total = 0;
      player_2.classList.remove("player--active");
      player_1.classList.add("player--active");
    }
  }
});

// set initial game score at 0
player_1_game_score.textContent = 0;
player_2_game_score.textContent = 0;

// game logic
holdButton.addEventListener("click", function () {
  if (player_1.classList.contains("player--active")) {
    if (Number(player_1_score) <= winning_score) {
      player_1_score = player_1_score + player_1_current_total;
      player_1_game_score.textContent = player_1_score;
      player_1_current_total = 0;
      player_1_current.textContent = 0;
      player_1.classList.remove("player--active");
      player_2.classList.add("player--active");
    } else {
      gameOverDisplay();
    }
  } else if (player_2.classList.contains("player--active")) {
    if (Number(player_2_score) <= winning_score) {
      player_2_score = player_2_score + player_2_current_total;
      player_2_game_score.textContent = player_2_score;
      player_2_current_total = 0;
      player_2_current.textContent = 0;
      player_2.classList.remove("player--active");
      player_1.classList.add("player--active");
    } else {
      gameOverDisplay();
    }
  }
});

// reset for new game
newGameButton.addEventListener("click", function () {
  player_1_score = 0;
  player_2_score = 0;
  player_1_current_total = 0;
  player_2_current_total = 0;
  player_1_current.textContent = 0;
  player_2_current.textContent = 0;
  player_1_game_score.textContent = 0;
  player_2_game_score.textContent = 0;
  // hide dice
  dice.classList.add("hidden");
});
