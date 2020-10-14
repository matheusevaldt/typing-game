const inputWord = document.querySelector('.input-word');
const loandAndDisplayWord = document.querySelector('.load-and-display-word');
const loadingWord = document.querySelector('.loading-word');
const wordToBeTyped = document.querySelector('.word-to-be-typed');
const remainingTime = document.querySelector('.remaining-time');
const currentScore = document.querySelector('.current-score');

let hasGameStarted = false;
let arrayOfWords = [];
let standByArray = [];
let currentWord;
let score = 0;
let time = 10;
let countdown;

inputWord.addEventListener('input', startGame);
inputWord.addEventListener('input', validateTyping);

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
