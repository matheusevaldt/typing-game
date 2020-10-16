const inputWord = document.querySelector('.input-word');
const loandAndDisplayWord = document.querySelector('.load-and-display-word');
const loadingWord = document.querySelector('.loading-word');
const wordToBeTyped = document.querySelector('.word-to-be-typed');
const remainingTime = document.querySelector('.remaining-time');
const currentScore = document.querySelector('.current-score');
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
let time;
let countdown;

let $difficulty = localStorage.getItem('difficulty');
let $remainingTime = JSON.parse(localStorage.getItem('remaining-time'));

inputWord.addEventListener('input', startGame);
inputWord.addEventListener('input', validateTyping);
buttonOpenSettings.addEventListener('click', openSettings);
buttonCloseSettings.addEventListener('click', closeSettings);
buttonDisplayPreferences.addEventListener('click', displayPreferences);
buttonDisplayStatistics.addEventListener('click', displayStatistics);
buttonEasyDifficulty.addEventListener('click', () => setDifficultyAndTime('easy'));
buttonMediumDifficulty.addEventListener('click', () => setDifficultyAndTime('medium'));
buttonHardDifficulty.addEventListener('click', () => setDifficultyAndTime('hard'));

// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', getWords);
// } else {
//     getWords(arrayOfWords);
// }

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
    loandAndDisplayWord.style.gridTemplateAreas = 'word-to-be-typed';
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
    console.log('começou')
    time--;
    remainingTime.innerHTML = `${time}s`;
    if (time === 0) {
        clearInterval(countdown);
        console.log('TIME HAS RAN OUT');
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
    time = $remainingTime + 1;
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

function openSettings() {
    settings.classList.add('display-settings');
}

function closeSettings() {
    settings.classList.remove('display-settings');
    console.log('a')
    resetGameInfo();
}

function resetGameInfo() {
    remainingTime.innerHTML = `${$remainingTime}s`;
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
        updateRemainingTime(10);
    } else if (difficulty === 'medium') {
        buttonMediumDifficulty.innerHTML = 'Difficulty selected';
        buttonMediumDifficulty.style.backgroundColor = '#9884c0';
        updateDifficulty(difficulty);
        updateRemainingTime(7);
    } else {
        buttonHardDifficulty.innerHTML = 'Difficulty selected';
        buttonHardDifficulty.style.backgroundColor = '#9884c0';
        updateDifficulty(difficulty);
        updateRemainingTime(4);
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
    remainingTime.innerHTML = `${$remainingTime}s`;
    time = $remainingTime;
}

function updateDifficulty(difficulty) {
    localStorage.setItem('difficulty', difficulty);
    $difficulty = localStorage.getItem('difficulty');
    console.log(`Difficulty: ${$difficulty}`);
}

function updateRemainingTime(remainingTime) {
    localStorage.setItem('remaining-time', JSON.stringify(remainingTime));
    $remainingTime = JSON.parse(localStorage.getItem('remaining-time'));
    time = remainingTime;
    console.log(`Remaining time: ${$remainingTime}`);
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
