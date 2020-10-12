const getDatabutton = document.querySelector('.get-data');

const inputWords = document.querySelector('.input-words');

let arrayOfWords = [];
let standByArray = [];
let currentWord;

inputWords.addEventListener('input', validateTyping);

function validateTyping() {
    if (inputWords.value === currentWord) {
        inputWords.value = '';
        console.log('Correct.');
        arrayOfWords.shift();
        keepTrackArrayOfWords();
        displayWord();
    }
}

getDatabutton.addEventListener('click', getWords);

async function getWords(array) {
    const response = await fetch('/words');
    const words = await response.json();
    words.map(word => {
        let rawWord = word.word;
        let wordAdjusted = rawWord.toLowerCase();
        array.push(wordAdjusted);
    });
    console.log(array)
    displayWord();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', getWords);
} else {
    getWords(arrayOfWords);
}

function displayWord() {
    console.log(arrayOfWords);
    currentWord = arrayOfWords[0];
    console.log(`WORD: ${currentWord}`);
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