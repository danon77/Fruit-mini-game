const startButton = document.getElementById('start-button');
const overScreen = document.querySelector('.over-screen');
const scoreContainer = document.getElementById('score-container');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const resultElement = document.getElementById('result');
const overText = document.getElementById('over-text');

let score = 0;
let gameInterval;
let countdownInterval;
const gameTime = 30;

const imagePaths = [
    './images/apple.png',
    './images/bananas.png',
    './images/blueberry.png',
    './images/plum.png',
    './images/grapes.png'
];
const bombImagePath = './images/mine.png';

function startGame() {
    score = 0;
    scoreElement.textContent = 'Points: 0';
    timerElement.textContent = `00:${gameTime < 10 ? '0' : ''}${gameTime}`;
    overScreen.classList.add('hide');
    scoreContainer.classList.remove('hide');
    timerElement.classList.remove('hide');
    scoreElement.classList.remove('hide');
    overText.classList.add('hide');
    resultElement.textContent = '';

    startFallingObjects();
    startTimer();
}

function startFallingObjects() {
    gameInterval = setInterval(() => {
        const object = document.createElement('img');
        if (Math.random() < 0.2) {
            object.src = bombImagePath;
            object.classList.add('falling-object');
            object.addEventListener('click', () => {
                score = Math.max(0, score - 10);
                scoreElement.textContent = `Points: ${score}`;
                showPopup(object, '-10');
                object.remove();
            });
        } else {
            object.src = getRandomImage();
            object.classList.add('falling-object');
            object.addEventListener('click', () => {
                score++;
                scoreElement.textContent = `Points: ${score}`;
                showPopup(object, '+1');
                object.remove();
            });
        }

        object.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
        object.style.top = '-100px';
        document.body.appendChild(object);

        let fallingSpeed = 4;
        const fallInterval = setInterval(() => {
            if (parseInt(object.style.top) < window.innerHeight) {
                object.style.top = `${parseInt(object.style.top) + fallingSpeed}px`;
            } else {
                clearInterval(fallInterval);
                object.remove();
            }
        }, 10);
    }, 333);
}

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    return imagePaths[randomIndex];
}

function startTimer() {
    let timeRemaining = gameTime;
    countdownInterval = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `00:${timeRemaining < 10 ? '0' : ''}${timeRemaining}`;
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            clearInterval(gameInterval);
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    overText.classList.remove('hide');
    resultElement.textContent = `Your score: ${score}`;
    overScreen.classList.remove('hide');
    removeAllObjects();
    scoreContainer.classList.add('hide');
    timerElement.classList.add('hide');
    scoreElement.classList.add('hide');
}

function removeAllObjects() {
    const fallingObjects = document.querySelectorAll('.falling-object');
    fallingObjects.forEach(object => object.remove());
}

function showPopup(object, text) {
    const popup = document.createElement('div');
    popup.textContent = text;
    popup.classList.add('score-popup');
    popup.style.left = `${parseInt(object.style.left) + 25}px`;
    popup.style.top = `${parseInt(object.style.top) - 20}px`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

startButton.addEventListener('click', startGame);