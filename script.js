// assigng HTML elements to local variables for later use
var lowerRangeField = document.getElementById('lower-range-field')
var upperRangeField = document.getElementById('upper-range-field')
var setRangeButton  = document.getElementById('range-button');
var guessField      = document.getElementById('guess-field');
var guessButton     = document.getElementById('guess-button');
var clearButton     = document.getElementById('clear-button');
var resetButton     = document.getElementById('reset-button');
var infoSection     = document.getElementById('info-section');
var displayNumber   = document.getElementById('last-guess-number');
var displayMessage  = document.getElementById('guess-response');

// assign the three local variables that control the game to their initial values
var lowerRange = 1;
var upperRange = 100;
var randomNumber = generateRandomNumber();

// assign the initial placeholder text of the upper and lower range input fields
lowerRangeField.placeholder = `Set Minimum (${lowerRange})`;
upperRangeField.placeholder = `Set Maximum (${upperRange})`;

// focus the cursor on the guess field on page load
guessField.focus();

// function that generates a random number based on the upper and lower range
function generateRandomNumber() {
  // generates a random decimal using the random number function in the Math library
  // the random decimal is then multiplied so that it is within the specified upper and lower range
  var number =  Math.random() * (upperRange - lowerRange) + lowerRange;
  // rounds the random number the nearest whole number and returns it
  return Math.round(number)
}

// function that accepts a user's guess and displays the appropriate response based on branch logic
function submitGuess(guess) {
  // sets the text in the html file that displays the user's previous guess
  displayNumber.innerText = guess
  // branch logic based on the user's input
  if (isNaN(guess)) {
    // if parseInt() returns NaN, the page will display the appropriate error message
    displayNumber.innerText = 'ERROR';
    displayMessage.innerText = 'Please enter a valid number';
  } else if (guess < lowerRange || guess > upperRange) {
    // if the user inputs a number that is not within the upper and lower range, the page will display the appropriate error message
    displayNumber.innerText = 'ERROR';
    displayMessage.innerText = `Guess must be between ${lowerRange} and ${upperRange}`;
  } else if (guess > randomNumber) {
    // if the user's guess is higher than the random number, the page will let the user know
    displayMessage.innerText = 'That is too high';
  } else if (guess < randomNumber) {
    // if the user's guess is lower than the random number, the page will let the user know
    displayMessage.innerText = 'That is too low';
  } else {
    // if the user correctly guesses the number, the win sequence is executed
    roundWin();
  }
  // reveal the info section on the page
  infoSection.style.display = 'block';
  // reset the value of the guess input field to nothing
  guessField.value = '';
  // enable the reset button
  resetButton.disabled = false;
}

// function that is executed when a user correctly guesses the number
function roundWin() {
  // reduce the lower range by 10
  lowerRange -= 10
  // increase the upper range by 10
  upperRange += 10;
  // executes the setMinMax() function
  setMinMax();
  // executes the resetGame() function
  resetGame();
  // display the appropriate message letting the user know they correctly guessed the number and the range has been adjusted
  displayMessage.innerText = `BOOM!\nA new random number has been generated between ${lowerRange} and ${upperRange}`;
}

// function that resets the game when the user correctly guesses the number or hits the reset button
function resetGame() {
  // resets the guess field value to nothing
  guessField.value = '';
  // hides the info section
  infoSection.style.display = 'none';
  // disable all three buttons related to guessing
  resetButton.disabled = true;
  clearButton.disabled = true;
  guessButton.disabled = true;
  // generate a new random number
  randomNumber = generateRandomNumber();
  // focus the cursor on the guess field
  guessField.focus();
}

//  function that sets the minimum and maximum values
function setMinMax() {
  // adjust the min for the guess field to match the lowerRange
  guessField.min = lowerRange;
  // adjust the max for the guess field to match the upper Range
  guessField.max = upperRange;
  // adjusts the placeholder text of the lower range input field to match the new lowerRange
  lowerRangeField.placeholder = `Set Minimum (${lowerRange})`;
  // adjusts the placeholder text of the upper range input field to match the new upperRange
  upperRangeField.placeholder = `Set Maximum (${upperRange})`;
  // adjust the placeholder text of the guess field so the user knows what the current range is
  guessField.placeholder = `Enter a guess between ${lowerRange} and ${upperRange}`;
}

// adds a click event listener to the guess button
guessButton.addEventListener('click', function() {
  // sets a local variable of the current input value in the guess gield
  var guess = guessField.value;
  // parses the input string into an integer
  var userGuess = parseInt(guess);
  // executes the sumbitGuess() function using the input value
  submitGuess(userGuess);
  // focuses the cursor on the guess field
  guessField.focus();
  // disables the clear button
  clearButton.disabled = true;
  // disables the guess button
  guessButton.disabled = true;
})

// adds a click event listener to the reset button
resetButton.addEventListener('click', function() {
  // executes the reset game function when the reset button is clicked
  resetGame();
})

// adds a click event listener to the clear button
clearButton.addEventListener('click', function() {
  // resets the value of the guess input field to nothing
  guessField.value = '';
  // disables the clear button
  clearButton.disabled = true;
  // disables the guess button
  guessButton.disabled = true;
  // focuses the cursor on the guess field
  guessField.focus();
})

// adds input event listener to the guess input field
guessField.addEventListener('input', function () {
  // branch logic to determine the state of the guess input field
  if (guessField.value === "") {
    // if the guess field is empty, disable the clear and guess buttons
    clearButton.disabled = true;
    guessButton.disabled = true;
  } else {
    // if the guess field is not empty, enable the clear and guess buttons
    clearButton.disabled = false;
    guessButton.disabled = false;
  }
})

// add click event listener to the set range button
setRangeButton.addEventListener('click', function() {
  // sets the lower range based on the value of the lower range input field
  lowerRange = parseInt(lowerRangeField.value);
  // sets the upper range based on the value of the upper range input field
  upperRange = parseInt(upperRangeField.value);
  // generates a new random number
  randomNumber = generateRandomNumber();
  // disables the set range button
  setRangeButton.disabled = true;
  // resets the lower range input field value to nothing
  lowerRangeField.value = '';
  // resets the upper range input field value to nothing
  upperRangeField.value = '';
  // executes the setMinMax() function
  setMinMax();
  // resets the game
  resetGame();
})

// adds input event listener to the lower range field
lowerRangeField.addEventListener('input', function() {
  // branch logic that determines what to do based on whether or not the lower range field is empty
  if (lowerRangeField.value === '' || upperRangeField.value === '') {
    // if either range fields are empty, disable the set range button
    setRangeButton.disabled = true;
  } else {
    // if both range input fields are not empty, enable the set range button
    setRangeButton.disabled = false;
  }
})

// adds input event listener to the upper range field
upperRangeField.addEventListener('input', function() {
  // branch logic that determines what to do based on whether or not the lower range field is empty
  if (lowerRangeField.value === '' || upperRangeField.value === '') {
    // if either range fields are empty, disable the set range button
    setRangeButton.disabled = true;
  } else {
    // if both range input fields are not empty, enable the set range button
    setRangeButton.disabled = false;
  }
})
