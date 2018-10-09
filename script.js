var lowerRange = 1;
var upperRange = 100;

var setRangeButton  = document.getElementById('range-button');
var lowerRangeField = document.getElementById('lower-range-field')
var upperRangeField = document.getElementById('upper-range-field')
var guessField      = document.getElementById('guess-field');
var guessButton     = document.getElementById('guess-button');
var clearButton     = document.getElementById('clear-button');
var resetButton     = document.getElementById('reset-button');
var infoSection     = document.getElementById('info-section');
var displayNumber   = document.getElementById('last-guess-number');
var displayMessage  = document.getElementById('guess-response');

var randomNumber = generateRandomNumber();

console.log(lowerRange)
console.log(upperRange)
console.log(randomNumber)

lowerRangeField.placeholder = `Set Minimum (${lowerRange})`;
upperRangeField.placeholder = `Set Maximum (${upperRange})`;

guessField.focus();

function generateRandomNumber() {
  var number =  Math.random() * (upperRange - lowerRange) + lowerRange;
  return Math.round(number)
}

function submitGuess(guess) {
  displayNumber.innerText = guess
  if (isNaN(guess)) {
    displayNumber.innerText = 'ERROR';
    displayMessage.innerText = 'Please enter a valid number';
  } else if (guess < lowerRange || guess > upperRange) {
    displayNumber.innerText = 'ERROR';
    displayMessage.innerText = `Guess must be between ${lowerRange} and ${upperRange}`;
  } else if (guess > randomNumber) {
    displayMessage.innerText = 'That is too high';
  } else if (guess < randomNumber) {
    displayMessage.innerText = 'That is too low';
  } else {
    roundWin();
  }
  infoSection.style.display = 'block';
  guessField.value = '';
  resetButton.disabled = false;
}

function roundWin() {
  lowerRange -= 10;
  upperRange += 10;
  setMinMax();
  resetGame();
  displayMessage.innerText = `BOOM!\nA new random number has been generated between ${lowerRange} and ${upperRange}`;
}

function resetGame() {
  guessField.value = '';
  infoSection.style.display = 'none';
  resetButton.disabled = true;
  randomNumber = generateRandomNumber();
  disableButtons();
}

function setMinMax() {
  guessField.min = lowerRange;
  guessField.max = upperRange;
  lowerRangeField.placeholder = `Set Minimum (${lowerRange})`;
  upperRangeField.placeholder = `Set Maximum (${upperRange})`;
  guessField.placeholder = `Enter a guess between ${lowerRange} and ${upperRange}`;
}

function setRangeButtonEnable() {
  if (lowerRangeField.value === '' || upperRangeField.value === '') {
    setRangeButton.disabled = true;
  } else {
    setRangeButton.disabled = false;
  }
}

function changeRange() {
  lowerRange = parseInt(lowerRangeField.value);
  upperRange = parseInt(upperRangeField.value);
  randomNumber = generateRandomNumber();
  setRangeButton.disabled = true;
  lowerRangeField.value = '';
  upperRangeField.value = '';
  setMinMax();
  resetGame();
}

function guessButtonEnable() {
  if (guessField.value === "") {
    disableButtons();
  } else {
    enableButtons();
  }
}

function clearButtonDisable() {
  guessField.value = '';
  disableButtons();
}

function guessSubmission() {
  var guess = guessField.value;
  var userGuess = parseInt(guess);
  submitGuess(userGuess);
  disableButtons();
}

function enableButtons() {
  guessButton.disabled = false;
  clearButton.disabled = false;
  guessField.focus();
}
function disableButtons() {
  guessButton.disabled = true;
  clearButton.disabled = true;
  guessField.focus();
}

guessButton.addEventListener('click', guessSubmission);
resetButton.addEventListener('click', resetGame);
clearButton.addEventListener('click', clearButtonDisable);
guessField.addEventListener('input', guessButtonEnable);
setRangeButton.addEventListener('click', changeRange);
lowerRangeField.addEventListener('input', setRangeButtonEnable);
upperRangeField.addEventListener('input', setRangeButtonEnable);
