// Letters
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Get Array from letters
let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

const successAudio = document.getElementById("success");
const failAudio = document.getElementById("fail");

function playSuccess() {
    successAudio.play();
}

function playFail() {
    failAudio.play();
}

lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
});

const words = {
    movies: ["Brave", "Monster", "Wish", "Frozen", "Shrek", "Luca", "Tangled", "Chupa"],
    foods: ["Steak", "Pie", "Soup", "Bacon", "Lamb", "Bread", "Rice", "Corn"],
    countries: ["Iraq", "Iran", "Brazil", "China", "Germany", "Turkey", "Mexico"],
    sports: ["Judo", "Racing", "Jumping", "Track", "Hockey", "Rugby", "Golf", "Boxing"]
};

const parts = [".the-stand", ".the-hang", ".the-rope", ".head", ".body", ".hands", ".legs"];
parts.forEach(part => document.querySelector(part).style.display = "none");

let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

document.querySelector(".game-info .category span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");

let lettersAndSpace = Array.from(randomValueValue);

lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement("span");
    if (letter === " ") {
        emptySpan.className = 'has-space';
    } else {
        emptySpan.className = 'letter-box';
    }
    lettersGuessContainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");

let theDraw = document.querySelector(".hangman-draw");
let wrongAttempts = 0;
let gameOver = false;

document.addEventListener("click", (e) => {
    if (gameOver) return; 

    let theStatus = false;

    if (e.target.classList.contains("letter-box")) {
        e.target.classList.add("clicked");

        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((wordLetter, wordIndex) => {
            if (theClickedLetter === wordLetter) {
                theStatus = true;
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                    }
                });
            }
        });

        if (!theStatus) {
            document.querySelector(parts[wrongAttempts]).style.display = "block";
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            playFail();

            if (wrongAttempts === 7) {
                endGame(`You lost! The word was ${randomValueValue}`);
            }
        } else {
            playSuccess();
        }

       
        checkWinCondition();
    }
});


function checkWinCondition() {
    let allGuessed = true;
    guessSpans.forEach(span => {
        if (span.innerHTML === '') {
            allGuessed = false;
        }
    });

    if (allGuessed) {
        endGame(`Congratulations! You guessed the word ${randomValueValue}!`);
    }
}


function endGame(message) {
    alert(message);
    gameOver = true; 
    lettersContainer.classList.add("finished"); 
}