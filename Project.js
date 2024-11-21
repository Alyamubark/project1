//Letters
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Get Array from lettres
let lettresArray= Array.from(letters);

let lettresContainer = document.querySelector(".letters");

const successAudio = document.getElementById("success");
const failAudio = document.getElementById("fail");

function playSuccess() {
    successAudio.play();
}

function playFail() {
    failAudio.play();
}

lettresArray.forEach(letters => {

  let span = document.createElement("span");

  let theletter = document.createTextNode(letters);
span.appendChild(theletter);
span.className = 'letter-box';

lettresContainer.appendChild(span);

});

const words = {
    movies :["Brave", "Monster" , " Wish","Frozen", "Shrek" , "luca", "Tangled " , "Chupa"],
    foods :["Steak", "Pie", "","Soup" , "Becon" ,"lamb" , "bread" , "Rice" , "corn"],
    countries: ["Iraq", "Iran","Brazil","China","Germany","Turkey","Mexico"],
    sports : ["Judo","Racing","Jumping","Track","Hockey","Rugby","Golf","Boxing"]
    
    }
    const parts = [".the-stand" , ".the-hang" , ".the-rope" , ".head" , ".body",".hands", ".legs"];
    parts.forEach(part=> document.querySelector(part).style.display="none");
    

let allKeys = Object.keys(words);


let randomPropNumber = Math.floor(Math.random() *allKeys.length);

let randomPropName = allKeys[randomPropNumber];

let randomPropValue =words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

document . querySelector(".game-info .category span") .innerHTML =randomPropName ;

let lettersGuesscontainer = document.querySelector(".letters-guess");

let lettersAndSpace = Array .from(randomValueValue);

lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement("span");
    if (letter === " ") {
        emptySpan.className = 'has-space';
    } else {
        emptySpan.className = 'letter-box';
    }
    lettersGuesscontainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");




let theDraw =document.querySelector(".hangman-draw");

let wrongAttempts = 0;

document.addEventListener("click", (e) => {
    let theStatus = false ;

    if (e.target.classList.contains("letter-box")) {
        e.target.classList.add("clicked");

        let theClickedletter = e.target.innerHTML.toLowerCase()

        let  theChosenWord = Array.from(randomValueValue.toLowerCase());
        
        theChosenWord.forEach((wordletter,wordIndex) => {
 
     if (theClickedletter == wordletter) {

       let theStatus = true ; 

guessSpans.forEach( (span , spanIndex) => {

    if (wordIndex === spanIndex) {
        span.innerHTML = theClickedletter;
    }

});


     }
        });
      
    
        if (theStatus !== true){
            document.querySelector(parts[wrongAttempts]).style.display="block"
wrongAttempts++;


theDraw.classList.add(`wrong-${wrongAttempts}`);

document.getElementById("fail").play();
        }else { 

       
            document.getElementById("success").play();


        }
    


    }
});