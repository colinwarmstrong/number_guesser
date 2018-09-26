var randomNumber = generateRandomNumber();

var resetButton = document.getElementById('reset-button');
var infoSection = document.getElementById('info-section');
var clearButton = document.getElementById('clear-button');
var guessButton = document.getElementById('guess-button');
var numberField = document.getElementById('number-field');

numberField.focus();

function generateRandomNumber() {
  var randomDecimal = Math.random() * 100;
  return Math.ceil(randomDecimal);
}

function submitGuess(guess) {
  var infoSection = document.getElementById('info-section')
  var displayNumber = document.getElementById('last-guess-number')
  var displayMessage = document.getElementById('guess-response')
  var resetButton = document.getElementById('reset-button')
  displayNumber.innerText = guess
  if (isNaN(guess)) {
    displayNumber.innerText = 'ERROR';
    displayMessage.innerText = 'Please enter a valid number';
  } else if (guess < 1 || guess > 100) {
    displayNumber.innerText = 'ERROR';
    displayMessage.innerText = 'Guess must be between 1 and 100';
  } else if (guess > randomNumber) {
    displayMessage.innerText = 'That is too high';
    console.log(randomNumber);
  } else if (guess < randomNumber) {
    displayMessage.innerText = 'That is too low';
    console.log(randomNumber);
  } else {
    displayMessage.innerText = 'BOOM!';
    console.log(randomNumber);
  }
  infoSection.style.display = 'block';
  numberField.value = '';
  resetButton.disabled = false;
}

document.getElementById('guess-button').addEventListener('click', function() {
  var guess = document.getElementById('number-field').value;
  var userGuess = parseInt(guess);
  submitGuess(userGuess);
  numberField.focus();
  clearButton.disabled = true;
  guessButton.disabled = true;
})

document.getElementById('reset-button').addEventListener('click', function() {
  document.getElementById('number-field').value = '';
  infoSection.style.display = 'none';
  resetButton.disabled = true;
  clearButton.disabled = true;
  guessButton.disabled = true;
  randomNumber = generateRandomNumber();
  numberField.focus();
})

document.getElementById('clear-button').addEventListener('click', function() {
  document.getElementById('number-field').value = '';
  var clearButton = document.getElementById('clear-button');
  clearButton.disabled = true;
  guessButton.disabled = true;
  numberField.focus();
})

numberField.addEventListener('input', function () {
  if (numberField.value === "") {
    clearButton.disabled = true;
    guessButton.disabled = true;
  } else {
    clearButton.disabled = false;
    guessButton.disabled = false;
  }
})
