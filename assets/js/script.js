
const words = [
  "PANCAKE",
  "CURRY"
];

const word_area = document.getElementById('word-area');
const keyboard_area = document.getElementById('keyboard-area');
const keyed_guess = document.getElementById("keyed-guess");
const message = document.getElementById("message-area");
const guessed_letters = document.getElementById("guessed-letters");
// const letter = document.getElementById(letter); 
// const keyed_guess = document.getElementById("keyed-guess");
const gallows_img = document.getElementById("gallows-img");
const old_guesses = document.getElementById("guesses-made");
const old_incorrect_guesses = document.getElementById("incorrect-guesses");
const old_letters_found = document.getElementById("letters-found");


// array to hold the random word
let answerArray = [];

/**
 * choose a random word from the words array
 */
function chooseWord() {
    // let words = [
    //     "PANCAKE",
    //     "CURRY"
    // ];
      word = words[Math.floor(Math.random() * words.length)].toUpperCase();    
}


/**
 * display the random word in the word-area as underscores for each letter
 */
function createAnswerArray() {
    // let answerArray = [];
    let wordLength = word.length;
    for (let i = 0; i < wordLength; i++ ) {
      answerArray[i] = ("_ ");
    }
    // document.getElementById('word-area').innerHTML = answerArray.join("");
    word_area.innerHTML = answerArray.join("");
}

/**
 * display the keyboard in the keyboard-area, giving each button an id of their value
 */
function createKeyboard() {
    let html = "";
    for(let i = 65; i < 91; i++) {
        // use  String method to convert numbers to their corresponding letter
        let c = String.fromCharCode(i);
        // on each loop add html to the var...
        html += `<button
                    id = ${c}
                    onclick="btnClicked(id)">` + c +
                `</button>`;
    }
    // document.getElementById('keyboard-area').innerHTML = html;
    keyboard_area.innerHTML = html;
}


/**
 * get the id (which is the same as the button value) when the HTML keyboard is clicked
 * @param {*} id 
 */
function btnClicked(id) {
      let letter = document.getElementById(id).innerHTML;
      checkForDuplicate(letter);
      clearMessage();
  }

/**
 * disable the selected HTML keyboard button
 * @param {*} letter 
 */
function disableLetter(letter) {
  // MAKE THIS GLOBAL?? LETTER NOT YET DEFINED WHEN CURRENTLY RUNS
  document.getElementById(letter).disabled = true;
  // keyboard_letter.disabled = true;
}

// KEYED GUESS


document.onkeydown = function(event) {
  let keyCode = event.keyCode;
  if (keyCode > 64 && keyCode < 91) {
      clearMessage();
      let keyPress = String.fromCharCode(event.keyCode);
      // document.getElementById("keyed-guess")
      keyed_guess.innerHTML = keyPress;
      keyboardHover(keyPress);
  } else if (keyCode === 13) {
    checkKeyedGuess();
  } else if (keyCode === 8) {
    clearGuess();
  }
}


/**
 * add the hover pseudo element to the HTML keyboard when user presses their physical keyboard
 */
function keyboardHover(letter) {
  document.getElementById(letter).classList.add("removeHover"); 
  // letter.classList.add("removeHover"); 
}


/**
 * display a message if enter has been pressed or clicked without a letter selected
 */
function checkKeyedGuess() {
  let keyedLetter = document.getElementById("keyed-guess").innerHTML;
  if (keyedLetter === "") {
    message.innerHTML = "No letter!!";
    // document.getElementById("message-area").innerHTML = "No letter!!";
  } else {
    checkForDuplicate(keyedLetter);
  }
}

/**
 * clear the message-area text
 */
function clearMessage() {
  message.innerHTML = "";
}

// array of guessed letters 
let guessedLetters = [];

/**
 * store guessed letters in the guessedLetters array and display them on screen
 * @param {*} letter 
 */
function updateGuessedLetters(letter) {
  guessedLetters.push(letter);
  for (letter in guessedLetters) {
    // document.getElementById("guessed-letters").innerHTML = guessedLetters.join(" ");
    guessed_letters.innerHTML = guessedLetters.join(" ");
    // document.getElementById("guessed-letters").innerHTML = guessedLetters.join(" ");
  }
} 

/**
 * clear the enter guess area and add shadow back to HTML keyboard
 */
function clearGuess() {
  let letter = document.getElementById("keyed-guess").innerHTML;
  document.getElementById(letter).classList.remove("removeHover");
  // document.getElementById("keyed-guess").innerHTML = "";
  keyed_guess.innerHTML = "";
}

/**
 * check if the selected letter has already been chosen
 * @param {*} letter 
 */
function checkForDuplicate(letter) {
  if (guessedLetters.includes(letter)) {
    message.innerHTML = `${letter} has already been chosen`;
  } else {
    disableLetter(letter);
    updateGuessedLetters(letter);
    checkGuess();
    incrementGuessesMade();
  }
}

/**
 * see if the guessed letter (the last one that's been added) is in the random word and update the word if so
 */
function checkGuess() {
  // SHOULD THIS BE A GLOBAL CONST?????????????
  let lastLetter = guessedLetters.slice(guessedLetters.length - 1);
  let newMatches = 0;
    for (let i = 0; i < word.length; i++) {
      // ??????  WHY WONT === WORK?  ?????????? 
      if (lastLetter == word[i]) {
        answerArray[i] = lastLetter;
        word_area.innerHTML = answerArray.join(" ");
        newMatches++;
        incrementLettersFound();
      }
    }
    if (newMatches === 0) {
      incrementIncorrectGuesses();
      updateGallows();
    }
}

/**
 * update the gallows image, using the number of incorrect guesses
 */
function updateGallows() {
  // let gallows = document.getElementById("gallows-img");
  let incorrectAnswers = document.getElementById("incorrect-guesses").innerText;
  gallows_img.src = `/assets/images/gallows${incorrectAnswers}.jpeg`;
}

function gameWon() {
  alert("U HAVE WON!!!!");
}

function gameLost() {
  alert("U HAVE died, GAME OVER!!!!");
}

/**
 * incrument the number of guesses made
 */
  function incrementGuessesMade() {
    ++old_guesses.innerHTML;
  }
 
/**
 * incrument the number of letters found
 */
  function incrementLettersFound() {
    ++old_letters_found.innerHTML;
    // let oldLettersFound = parseInt(document.getElementById("letters-found").innerText);
    // document.getElementById("letters-found").innerText = ++oldLettersFound;
    // old_letters_found
    if (old_letters_found.innerHTML == word.length) {
      gameWon();
    }
  }
  
/**
 * incrument the number of incorrect guesses made
 */
  function incrementIncorrectGuesses() {
    // let oldIncorrectGuesses = parseInt(document.getElementById("incorrect-guesses").innerText);
    // document.getElementById("incorrect-guesses").innerText = ++oldIncorrectGuesses;
    ++old_incorrect_guesses.innerHTML;

    if (old_incorrect_guesses.innerHTML == 10) {
      gameLost();
    }
  }

  
chooseWord();
createAnswerArray();
createKeyboard();
updateGallows(); 



