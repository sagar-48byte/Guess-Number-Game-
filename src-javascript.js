let randomNUM = parseInt((Math.random()*100) + 1);

const userInput = document.getElementById('guessField')
const submit = document.getElementById('subt')
const guessSlot = document.querySelector('#guessList')
const remaining = document.querySelector('#guessCount')
const res = document.querySelector('.result')
const startOver = document.querySelector('.resultpara')

const p = document.createElement('p')

let prevGuess = []
let subCount = 1

let playGame = true;

if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        console.log(guess);
        validateGuess(guess);
    })
}


function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number')
    }
    else if(guess < 1 || guess > 100){
        alert('Please enter a number between 1 to 100')
    }
    else{
        prevGuess.push(guess);
        if(subCount === 10){
            displayGuess(guess)
            message(`Game Over. Random number was ${randomNUM}`)
            endGame();
        }
        else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess === randomNUM){
        message(`You guessed it right, You've Won!!`);
        endGame();
    }
    else if(guess < randomNUM){
        message(`Your guess is too low`);
    }
    else if(guess > randomNUM){
        message(`Your guess is too high`);
    }
}

function displayGuess(guess){
    userInput.value = ''
    guessSlot.innerHTML += `${guess},  `;
    subCount++;

    remaining.innerHTML = `${ 11 - subCount} `
}

function message(mes){
    res.innerHTML = `<h3> ${mes} </h3>`
}

function endGame(){
    userInput.value = ''
    userInput.setAttribute('disabled', '')
    p.classList.add('button');
    p.innerHTML= `<h2  id="newgame"> Start New Game </h2>`;
    startOver.appendChild(p);

    playGame = false;
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#newgame');
    newGameButton.addEventListener('click', function(e){
        randomNUM = parseInt((Math.random()*100) + 1);
        prevGuess = [];
        subCount = 1;
        guessSlot.innerHTML = ''
        res.innerHTML = ''
        remaining.innerHTML = `${11-subCount}`;

        userInput.removeAttribute('disabled');
        startOver.removeChild(p);

        playGame = true;
    });
    
}