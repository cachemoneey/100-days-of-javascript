const inputs = document.querySelector(".word");
const hintTag = document.querySelector(".hint span");
const guessesLeft = document.querySelector(".guess span");
const mistakes = document.querySelector(".wrong span");

const resetBtn = document.querySelector(".reset");
const showHintBtn = document.querySelector(".showhint");
const hintElement = document.querySelector(".hint");
const typeInput = document.querySelector(".type-input");

// Intializing game variables
let word;
let correctLetters = [];
let incorrectLetters = [];
let maxGuesses;

// select random word from word list sand setup game
function startNewGame(){
    alert("New game has started!");
    // hide hint element
    hintElement.style.display = "none";
    hintElement.style.opacity = "0";

    // choose random word from db and setup game
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    word = randomWord.word;
    // if word chars >= 5 then max guess = 8 else max guess = 6
    maxGuesses = word.length >= 5 ? 8 : 6;
    incorrectLetters = [];
    correctLetters = [];
    hintTag.innerText = randomWord.hint;  // Corrected line
    guessesLeft.innerText = maxGuesses;
    mistakes.innerText = incorrectLetters;
    // create input for each letter of word
    inputs.innerHTML = "";
    for(let i = 0; i < word.length; i++){
        const input = document.createElement("input");
        input.type = "text";
        input.disabled = true;
        inputs.appendChild(input);
    }
}


// handle user input and update game stats
function handleInput(e){
    // Ignore non-letters input and letters that have already guessed
    const key = e.target.value.toLowerCase();
    if (key.match(/^[a-z]+$/i) && !incorrectLetters.includes(`${key}`) && !correctLetters.includes(`${key}`)) {
        // Check if the letter is in word
        if (word.includes(key)) {
            // Update correct guess
            for (let i = 0; i < word.length; i++){
                if(word[i] === key){
                    inputs.querySelectorAll("input")[i].value += key;
                }
            }
            correctLetters += key;
        } else {
            // update incorrect guess
            maxGuesses--;
            incorrectLetters.push(`${key}`);
            mistakes.innerText = incorrectLetters;
        }
    }

    // Update remain guess and check for win lose conditions
    guessesLeft.innerText = maxGuesses;
    if (correctLetters.length === word.length){
        alert(`You guessed the word! It was ${word.toUpperCase()}`)
        startNewGame();
    } else if (maxGuesses < 1){
        alert("Unlucky! You are out of guesses! Try again");
        for(let i = 0; i < word.length; i++){
            // Fill inputs with correct words
            inputs.querySelectorAll("input")[i].value += word[i];
        }
    }   
    // clear input fields
    typeInput.value = "";
}

// show hint element
function showHintElement(){
    hintElement.style.display = "block";
    hintElement.style.opacity = "1";
}

// Setup event listeners
resetBtn.addEventListener("click", startNewGame);
showHintBtn.addEventListener("click", showHintElement);

typeInput.addEventListener("input", handleInput);

inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

startNewGame();