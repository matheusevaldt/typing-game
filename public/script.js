const inputWord = document.querySelector('.input-word');
const loandAndDisplayWord = document.querySelector('.load-and-display-word');
const loadingWord = document.querySelector('.loading-word');
const wordToBeTyped = document.querySelector('.word-to-be-typed');
const remainingTime = document.querySelector('.remaining-time');
const currentScore = document.querySelector('.current-score');
const buttonOpenSettings = document.querySelector('.button-open-settings');
const buttonCloseSettings = document.querySelector('.button-close-settings');
const settings = document.querySelector('.settings');
const buttonDisplayPreferences = document.querySelector('.button-display-preferences');
const buttonDisplayStatistics = document.querySelector('.button-display-statistics');
const settingsMenuBackground = document.querySelector('.settings-menu-background');
const preferences = document.querySelector('.preferences');
const statistics = document.querySelector('.statistics');
const buttonEasyDifficulty = document.querySelector('.button-easy-difficulty');
const buttonMediumDifficulty = document.querySelector('.button-medium-difficulty');
const buttonHardDifficulty = document.querySelector('.button-hard-difficulty');

let hasGameStarted = false;
let arrayOfWords = [];
let standByArray = [];
let currentWord;
let score = 0;
let time = 10;
let countdown;

const $difficulty = localStorage.getItem('difficulty');

inputWord.addEventListener('input', startGame);
inputWord.addEventListener('input', validateTyping);
buttonOpenSettings.addEventListener('click', openSettings);
buttonCloseSettings.addEventListener('click', closeSettings);
buttonDisplayPreferences.addEventListener('click', displayPreferences);
buttonDisplayStatistics.addEventListener('click', displayStatistics);
buttonEasyDifficulty.addEventListener('click', () => selectDifficulty('easy'));
buttonMediumDifficulty.addEventListener('click', () => selectDifficulty('medium'));
buttonHardDifficulty.addEventListener('click', () => selectDifficulty('hard'));

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
    console.log(`WORD: ${currentWord}`);
    currentWord = arrayOfWords[0];
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
        keepTrackArrayOfWords();
        displayWord();
    }
}

function updateCurrentScore() {
    score++;
    currentScore.innerHTML = score;
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
}

function displayPreferences() {
    settingsMenuBackground.classList.remove('statistics-has-background');
    settingsMenuBackground.classList.add('preferences-has-background');
    statistics.style.display = 'none';
    preferences.style.display = 'block'; 
}

function displayStatistics() {
    settingsMenuBackground.classList.remove('preferences-has-background');
    settingsMenuBackground.classList.add('statistics-has-background');
    preferences.style.display = 'none';
    statistics.style.display = 'block';
}

function selectDifficulty(difficulty) {
    resetButtonsDifficulties();
    if (difficulty === 'easy') {
        buttonEasyDifficulty.innerHTML = 'Difficulty selected';
        // buttonEasyDifficulty.style.backgroundColor = '#ab82b1';
        // buttonEasyDifficulty.style.backgroundColor = '#9867a0';
        // buttonEasyDifficulty.style.backgroundColor = '#9884c0';
        buttonEasyDifficulty.style.backgroundColor = '#6946ad';
        localStorage.setItem('difficulty', 'easy');
    } else if (difficulty === 'medium') {
        buttonMediumDifficulty.innerHTML = 'Difficulty selected';
        buttonMediumDifficulty.style.backgroundColor = '#6946ad';
        localStorage.setItem('difficulty', 'medium');
    } else {
        buttonHardDifficulty.innerHTML = 'Difficulty selected';
        buttonHardDifficulty.style.backgroundColor = '#6946ad';
        localStorage.setItem('difficulty', 'hard');
    }
}

function resetButtonsDifficulties() {
    buttonEasyDifficulty.innerHTML = 'Select easy difficulty';
    buttonMediumDifficulty.innerHTML = 'Select medium difficulty';
    buttonHardDifficulty.innerHTML = 'Select hard difficulty';
    // buttonEasyDifficulty.style.backgroundColor = '#c5a4ca';
    buttonEasyDifficulty.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    buttonMediumDifficulty.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    buttonHardDifficulty.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
}

function loadDifficulty() {
    console.log($difficulty);
    if ($difficulty === null) {
        selectDifficulty('easy');
    } else {
        selectDifficulty($difficulty);
    }
}

loadDifficulty();










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
