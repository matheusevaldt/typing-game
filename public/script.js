const inputWord = document.querySelector('.input-word');
const loadAndDisplayWord = document.querySelector('.load-and-display-word');
const loadingWord = document.querySelector('.loading-word');
const wordToBeTyped = document.querySelector('.word-to-be-typed');
const remainingTime = document.querySelector('.remaining-time');
const currentScore = document.querySelector('.current-score');
const gameOver = document.querySelector('.game-over');
const gameOverDifficulty = document.querySelector('.game-over-difficulty');
const gameOverScore = document.querySelector('.game-over-score');
const gameOverHighestScore = document.querySelector('.game-over-highest-score');
const buttonPlayAgain = document.querySelector('.button-play-again');
const levelOfDifficulty = document.querySelector('.level-of-difficulty');
const buttonOpenSettings = document.querySelector('.button-open-settings');
const buttonCloseSettings = document.querySelector('.button-close-settings');
const settings = document.querySelector('.settings');
const settingsHeaderTitle = document.querySelector('.settings-header-title');
const buttonDisplayPreferences = document.querySelector('.button-display-preferences');
const buttonDisplayStatistics = document.querySelector('.button-display-statistics');
const settingsMenuBackground = document.querySelector('.settings-menu-background');
const preferences = document.querySelector('.preferences');
const statistics = document.querySelector('.statistics');
const buttonEasyDifficulty = document.querySelector('.button-easy-difficulty');
const buttonMediumDifficulty = document.querySelector('.button-medium-difficulty');
const buttonHardDifficulty = document.querySelector('.button-hard-difficulty');

const audioCorrectWord = document.querySelector('#audio-correct-word');

let hasGameStarted = false;
let arrayOfWords = [];
let standByArray = [];
let currentWord;
let score = 0;
let timer;
let countdown;

let $difficulty = localStorage.getItem('difficulty');
let $timer = JSON.parse(localStorage.getItem('timer'));
let $highestScoreOnEasy = JSON.parse(localStorage.getItem('highest-score-on-easy'));

inputWord.addEventListener('input', startGame);
inputWord.addEventListener('input', validateTyping);
buttonPlayAgain.addEventListener('click', playAgain);
buttonOpenSettings.addEventListener('click', openSettings);
buttonCloseSettings.addEventListener('click', closeSettings);
buttonDisplayPreferences.addEventListener('click', displayPreferences);
buttonDisplayStatistics.addEventListener('click', displayStatistics);
buttonEasyDifficulty.addEventListener('click', () => setDifficultyAndTime('easy'));
buttonMediumDifficulty.addEventListener('click', () => setDifficultyAndTime('medium'));
buttonHardDifficulty.addEventListener('click', () => setDifficultyAndTime('hard'));

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', getWords);
} else {
    getWords(arrayOfWords);
}

async function getWords(array) {
    const response = await fetch('/words');
    const words = await response.json();
    words.map(word => {
        let rawWord = word.word;
        let wordAdjusted = rawWord.toLowerCase();
        array.push(wordAdjusted);
    });
    displayWord();
}

function displayWord() {
    console.log(arrayOfWords);
    currentWord = arrayOfWords[0];
    console.log(`WORD: ${currentWord}`);
    loadAndDisplayWord.style.gridTemplateAreas = 'word-to-be-typed';
    loadingWord.style.display = 'none';
    wordToBeTyped.style.display = 'block';
    wordToBeTyped.innerHTML = currentWord;
}

function startGame() {
    if (inputWord.length !== 0) {
        countdown = setInterval(startCountdown, 1000);
        inputWord.removeEventListener('input', startGame);
    }
}

function startCountdown() {
    timer--;
    remainingTime.innerHTML = `${timer}s`;
    if (timer === 0) {
        clearInterval(countdown);
        gameIsOver();
    }
}

function validateTyping() {
    if (inputWord.value === currentWord) {
        inputWord.value = '';
        arrayOfWords.shift();
        updateCurrentScore();
        playAudioCorrectWord();
        resetTime();
        keepTrackArrayOfWords();
        displayWord();
    }
}

function updateCurrentScore() {
    score++;
    currentScore.innerHTML = score;
}

function playAudioCorrectWord() {
    audioCorrectWord.play();
    audioCorrectWord.volume = 0.2;
}

function resetTime() {
    timer = $timer + 1;
}

function keepTrackArrayOfWords() {
    if (arrayOfWords.length === 2) {
        console.log('ARRAY PRINCIPAL SÓ TEM MAIS DUAS PALAVRAS');
        getWords(standByArray);
    }
    if (arrayOfWords.length === 0) {
        console.log('ARRAY PRINCIPAL TÁ VAZIO. USER PALAVRAS DO STAND BY ARRAY');
        arrayOfWords = standByArray;
        standByArray = [];
    }
}

function gameIsOver() {
    gameOver.classList.add('display-game-over');
    gameOverDifficulty.innerHTML = $difficulty;
    gameOverScore.innerHTML = score;
    verifyHighestScore();
}

function playAgain() {
    gameOver.classList.remove('display-game-over');
    loadAndDisplayWord.style.gridTemplateAreas = 'loading-word';
    wordToBeTyped.style.display = 'none';
    loadingWord.style.display = 'block';
    inputWord.value = '';
    remainingTime.innerHTML = `${$timer}s`;
    score = 0;
    currentScore.innerHTML = score;
    timer = $timer;
    arrayOfWords = [];
    standByArray = [];
    getWords(arrayOfWords);
    inputWord.addEventListener('input', startGame);
}

function verifyHighestScore() {
    if ($difficulty === 'easy' && score > $highestScoreOnEasy) {
        console.log('RECORD!');
        updateHighestScoreOnEasy(score);
    }
}

function openSettings() {
    settings.classList.add('display-settings');
}

function closeSettings() {
    settings.classList.remove('display-settings');
    console.log('a')
    resetGameInfo();
}

function resetGameInfo() {
    remainingTime.innerHTML = `${$timer}s`;
    levelOfDifficulty.innerHTML = $difficulty;
}

function displayPreferences() {
    settingsMenuBackground.classList.remove('statistics-has-background');
    settingsMenuBackground.classList.add('preferences-has-background');
    statistics.style.display = 'none';
    preferences.style.display = 'block';
    settingsHeaderTitle.innerHTML = 'Preferences';
}

function displayStatistics() {
    settingsMenuBackground.classList.remove('preferences-has-background');
    settingsMenuBackground.classList.add('statistics-has-background');
    preferences.style.display = 'none';
    statistics.style.display = 'block';
    settingsHeaderTitle.innerHTML = 'Statistics';
}

function setDifficultyAndTime(difficulty) {
    resetButtonsDifficulties();
    if (difficulty === 'easy') {
        buttonEasyDifficulty.innerHTML = 'Difficulty selected';
        buttonEasyDifficulty.style.backgroundColor = '#9884c0';
        updateDifficulty(difficulty);
        updateTimer(10);
    } else if (difficulty === 'medium') {
        buttonMediumDifficulty.innerHTML = 'Difficulty selected';
        buttonMediumDifficulty.style.backgroundColor = '#9884c0';
        updateDifficulty(difficulty);
        updateTimer(7);
    } else {
        buttonHardDifficulty.innerHTML = 'Difficulty selected';
        buttonHardDifficulty.style.backgroundColor = '#9884c0';
        updateDifficulty(difficulty);
        updateTimer(4);
    }
}

function resetButtonsDifficulties() {
    buttonEasyDifficulty.innerHTML = 'Select easy difficulty';
    buttonMediumDifficulty.innerHTML = 'Select medium difficulty';
    buttonHardDifficulty.innerHTML = 'Select hard difficulty';
    buttonEasyDifficulty.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    buttonMediumDifficulty.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    buttonHardDifficulty.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
}

loadDifficultyAndTime();

function loadDifficultyAndTime() {
    if ($difficulty === null) {
        setDifficultyAndTime('easy');
    } else {
        setDifficultyAndTime($difficulty);
    }
    levelOfDifficulty.innerHTML = $difficulty;
    remainingTime.innerHTML = `${$timer}s`;
    timer = $timer;
}

function updateDifficulty(difficulty) {
    localStorage.setItem('difficulty', difficulty);
    $difficulty = localStorage.getItem('difficulty');
    console.log(`Difficulty: ${$difficulty}`);
}

function updateTimer(timer) {
    localStorage.setItem('timer', JSON.stringify(timer));
    $timer = JSON.parse(localStorage.getItem('timer'));
    timer = timer;
    console.log(`Timer: ${$timer}`);
}

function loadHighestScores() {
    // if ($highestScoreOnEasy === null) {
    //     updateHighestScoreOnEasy(0);
    // } else {
    //     updateHighestScoreOnEasy($highestScoreOnEasy);
    // }

    $highestScoreOnEasy === null ? updateHighestScoreOnEasy(0) : updateHighestScoreOnEasy($highestScoreOnEasy);
}

loadHighestScores();

function updateHighestScoreOnEasy(score) {
    localStorage.setItem('highest-score-on-easy', JSON.stringify(score));
    $highestScoreOnEasy = JSON.parse(localStorage.getItem('highest-score-on-easy'));
    console.log(`Highest score on easy: ${$highestScoreOnEasy}`);
}




// const a = document.querySelector('.a');
// let b = ['ola', 'como', 'vai', 'voce'];
// let count = 0;

// function displayWordsWithTypingEffect() {

//     const sizeArray = b.length;

//     while (count < sizeArray) {
//         const word = b[count];
//         const characters = word.split('');
//         const amountOfCharacters = characters.length;
//         console.log(word);
//         console.log(characters);
//         console.log(amountOfCharacters);

//         characters.map((character, index) => {
//             setTimeout(() => {
//                 console.log(character)
//                 console.log('----')
//             }, index * 1000);
//         });
//         count++;
//     }
// }

// displayWordsWithTypingEffect();
