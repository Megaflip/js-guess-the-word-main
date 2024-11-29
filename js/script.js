const listGuessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputGuess = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesDisplay = document.querySelector(".remaining span");
const guessedMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

//Display symbols as placeholders for the chosen word's letters
const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters:push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
  });

  //I was stuck at "Write a function to add placeholders for each letter" at number 2.  I copied it from the answer solution, but don't understand it.