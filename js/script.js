/*Step 3: Create global variables to select the following elements:
*/
/*The unordered list where the player’s guessed letters will appear*/
const guessedLettersElement = document.querySelector(".guessed-letters");
/*The button with the text “Guess!” in it*/
const guessLetterButton = document.querySelector(".guess");
/*The text input where the player will guess a letter.*/
const letterInput = document.querySelector(".letter");
/*The empty paragraph where the word in progress will appear.*/
const wordInProgress = document.querySelector(".word-in-progress");
/*The paragraph where the remaining guesses will display.*/
const remainingGuessesElement = document.querySelector(".remaining");
/*The span inside the paragraph where the remaining guesses will display.*/
const remainingGuessesSpan = document.querySelector(".remaining span");
/*The empty paragraph where messages will appear when the player guesses a letter.*/
const message = document.querySelector(".message");
/*The hidden button that will appear prompting the player to play again.*/
const playAgainButton = document.querySelector(".play-again");
/*Step 4: Create another global variable called word and give it the value of "magnolia". Magnolia is your starting word to test out the game until you fetch words from a hosted file in a later step.
*/
const word = "magnolia";

//Display symbols as placeholders for the chosen word's letters
/*Create and name a function "placeholder" to update the paragraph’s innerText for the “words-in-progress” element with circle symbols (●) to represent each letter in the word. The symbols will stay on the screen until the correct letter is guessed (in a future step). Hint: Copy and paste the ● symbol into your code!*/
/*notice there are new variables created in the function*/
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    /*Call the function and pass it the word variable as the argument. You should see 8 circle symbols on the screen, one for each letter in the word “magnolia.” Hint: You’ll need to use an array and then join it back to a string using the .join("") method.*/
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

/*Add an event listener for when a player clicks the Guess button. /*In the callback function, add a parameter for the event: e.*/
guessLetterButton.addEventListener("click", function (e) {
    /*Because you’re working with a form, you want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page. To prevent this reloading behavior, add this line of code at the top of the callback function: e.preventDefault();.*/
    e.preventDefault();
    /*Create and name a variable to capture the value of the input. Log out the value of the variable capturing the input. Then, empty the value of the input. You should see the letter you enter into the input field in the console when the Guess button is clicked. */
    message.innerText = "";
    //Let's grab what was entered in the input
    const guess = letterInput.value;
    //Let's make sure that is a single letter
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        //We've got a letter! Let's guess!
        makeGuess(guess);
    }
    letterInput.value = "";
});

/*Next Page of Challenge Below called step 3: Accept & Validate Player Guesses*/
/*Create a Function to Check Player's Input*/
/*Create and name a function that accepts the input value as a parameter. This function’s purpose is to validate the player’s input.*/
const validateInput = function (input) {
    /*Inside the function, create a variable for the accepted letter sequence: const acceptedLetter = /[a-zA-Z]/. Now your code uses a regular expression to ensure the player inputs a letter!*/
    const acceptedLetter = /[a-zA-Z]/;
    /*Still inside the function, use a conditional block to check for different scenarios. First, check if the input is empty. Then, check if the player has entered more than one letter. Finally, check if they’ve entered a character that doesn’t match the regular expression pattern. Hint: You’ll need the .match() method here. Each condition should have a message directing the player on what to input. */
    if (input.length === 0) {
        // Is the input empty?
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        // Did you type more than one letter?
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        // Did you type a number, a special character or some other non letter thing?
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        // We finally got a single letter, omg yay
        /*If all the other conditions aren’t met, the input is a letter, which is what you’re looking for! Return the input.*/
        return input;
    }
};

/*Validate Input in the Button Even Handler*/
/*Inside the event handler function for the Guess button, empty the text of the message element.*/
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};

/*Display Word & Guessed Letters*/
/* Create and name a function to update the page with the letters the player guesses (see screenshot above). */
const showGuessedLetters = function () {
    /*Empty the innerHTML of the unordered list where the player’s guessed letters will display.*/
    // Clear the list first
    guessedLettersElement.innerHTML = "";
    /*Create a new list item for each letter inside your guessedLetters array (i.e., the global variable) and add it to the unordered list.*/
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
      if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
      } else {
        revealWord.push("●");
      }
    }
    // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
  };
  
  const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
      // womp womp - bad guess, lose a chance
      message.innerText = `Sorry, the word has no ${guess}.`;
      remainingGuesses -= 1;
    } else {
      message.innerText = `Good guess! The word has the letter ${guess}.`;
    }
  
    if (remainingGuesses === 0) {
      message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
      remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
      remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
  };
  
  const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
  };
  const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
  };
  
  playAgainButton.addEventListener("click", function () {
    // reset all original values - grab new word
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    // Grab a new word
    getWord();
  
    // show the right UI elements
    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
  });