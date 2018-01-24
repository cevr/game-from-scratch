"use strict";
//TODO question 10
//TODO: create div instead of inserting in body
var PLAYER_ONE = [];
var PLAYER_TWO = [];

var playerOneFlag = false;
var playerTwoFlag = false;
var timerSwitch = false;
var gameOver = false;


var TIMER = Math.floor(Math.random() * 7 + 2) * 1000
console.log(TIMER);

var html = document.querySelector('html');
var body = document.querySelector('body');
var app = document.querySelector('.app') 
const bang = new Audio('./sounds/bang.mp3');
const ready = new Audio('./sounds/ready.mp3')
bang.volume = 0.15;
ready.volume = 0.2;

const createButton = (text, className, func, secondFunc) => {
    let button = document.createElement('button');
    button.classList.add(className);
    body.appendChild(button);

    button.innerText = text;
    button.addEventListener('click', e => {

        func();
        secondFunc();
    })
}
const loadGame = () => {
    let button = createButton('Start game!', 'start-button', startGame, clearHTML)

}

const playerOneWins = () => {
    playerOneFlag = true;
    gameOver = true;
    body.innerHTML = "<h1>Player one wins!</h1>"

}

const playerTwoWins = () => {
    playerTwoFlag = true;
    gameOver = true;
    body.innerHTML = "<h1>Player two wins!</h1>"

}
const startGame = () => {
    ready.play();
    body.addEventListener('keydown', event => {
        if (event.keyCode === 81 && timerSwitch === false && playerOneFlag === false) {
            stopAllMusic();
            playerTwoWins();
            createButton('Restart game!', 'start-button', restartGame, clearHTML);
        } else if (event.keyCode === 80 && timerSwitch === false && playerTwoFlag === false) {
            stopAllMusic();
            playerOneWins();
            createButton('Restart game!', 'start-button', restartGame, clearHTML);


        }

    });

    setTimeout(() => {
        if (gameOver === false) {
            bang.play();
        }
        timerSwitch = true;
        body.addEventListener('keydown', event => {
            if (event.keyCode === 81 && timerSwitch === true && playerTwoFlag === false) {

                playerOneWins();
                createButton('Restart game!', 'start-button', restartGame, clearHTML);


            } else if (event.keyCode === 80 && timerSwitch === true && playerOneFlag === false) {

                playerTwoWins();
                createButton('Restart game!', 'start-button', restartGame, clearHTML);

            }
        });
    }, TIMER)

}

const endGame = () => {
    gameOver = true;
}
const clearHTML = () => {
    body.innerHTML = ""
}

const restartGame = () => {
    TIMER = Math.floor(Math.random() * 7 + 2) * 1000
    console.log(TIMER)
    gameOver = false;
    timerSwitch = false;
    var old_element = document.querySelector('body');
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    // html.removeChild(body);
    // let newBody = document.createElement('body');
    // html.appendChild(newBody)
    body = document.querySelector('body');
    startGame();
}
const stopAllMusic = () => {
    ready.pause();
    bang.pause();
    ready.currentTime = 0;
    bang.currentTime = 0;
}

loadGame();