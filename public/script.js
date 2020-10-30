// Global variables.
const mainContainer = document.getElementsByTagName('main')[0];
const headerContainer = document.getElementsByTagName('header')[0];
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
const soundEffectsStatus = document.querySelector('.sound-effects-status');
const soundEffectsOptions = document.querySelector('.sound-effects-options');
const buttonDisableSoundEffects = document.querySelector('.button-disable-sound-effects');
const buttonEnableSoundEffects = document.querySelector('.button-enable-sound-effects');
const errorNotification = document.querySelector('.error-notification');
const errorDescription = document.querySelector('.error-description');
const motivationMessage = document.querySelector('.motivation-message');
const buttonClearStatistics = document.querySelector('.button-clear-statistics');
const gamesOnEasy = document.getElementById('games-on-easy');
const gamesOnMedium = document.getElementById('games-on-medium');
const gamesOnHard = document.getElementById('games-on-hard');
const highestScoreOnEasy = document.getElementById('highest-score-on-easy');
const highestScoreOnMedium = document.getElementById('highest-score-on-medium');
const highestScoreOnHard = document.getElementById('highest-score-on-hard');
const averageScoreOnEasy = document.getElementById('average-score-on-easy');
const averageScoreOnMedium = document.getElementById('average-score-on-medium');
const averageScoreOnHard = document.getElementById('average-score-on-hard');
const audioCorrectWord = document.querySelector('#audio-correct-word');
const audioHighestScore = document.querySelector('#audio-highest-score');
let arrayOfWords = [];
let standByArray = [];
let currentWord;
let score = 0;
let timer;
let countdown;
// Local storage variables.
let $difficulty = localStorage.getItem('difficulty');
let $timer = JSON.parse(localStorage.getItem('timer'));
let $highestScoreOnEasy = JSON.parse(localStorage.getItem('highest-score-on-easy'));
let $highestScoreOnMedium = JSON.parse(localStorage.getItem('highest-score-on-medium'));
let $highestScoreOnHard = JSON.parse(localStorage.getItem('highest-score-on-hard'));
let $gamesOnEasy = JSON.parse(localStorage.getItem('games-on-easy'));
let $gamesOnMedium = JSON.parse(localStorage.getItem('games-on-medium'));
let $gamesOnHard = JSON.parse(localStorage.getItem('games-on-hard'));
let $soundEffects = localStorage.getItem('sound-effects');
let $totalScoreOnEasy = JSON.parse(localStorage.getItem('total-score-on-easy'));
let $totalScoreOnMedium = JSON.parse(localStorage.getItem('total-score-on-medium'));
let $totalScoreOnHard = JSON.parse(localStorage.getItem('total-score-on-hard'));
let $averageScoreOnEasy = JSON.parse(localStorage.getItem('average-score-on-easy'));
let $averageScoreOnMedium = JSON.parse(localStorage.getItem('average-score-on-medium'));
let $averageScoreOnHard = JSON.parse(localStorage.getItem('average-score-on-hard'));

// Event listeners.
inputWord.addEventListener('input', startGame);
inputWord.addEventListener('input', validateTyping);
buttonPlayAgain.addEventListener('click', resetGame);
buttonOpenSettings.addEventListener('click', openSettings);
buttonCloseSettings.addEventListener('click', closeSettings);
buttonDisplayPreferences.addEventListener('click', displayPreferences);
buttonDisplayStatistics.addEventListener('click', displayStatistics);
buttonEasyDifficulty.addEventListener('click', () => setDifficultyAndTime('easy'));
buttonMediumDifficulty.addEventListener('click', () => setDifficultyAndTime('medium'));
buttonHardDifficulty.addEventListener('click', () => setDifficultyAndTime('hard'));
buttonDisableSoundEffects.addEventListener('click', disableSoundEffects);
buttonEnableSoundEffects.addEventListener('click', enableSoundEffects);
buttonClearStatistics.addEventListener('click', clearStatistics);

// Functions to be executed before user interacts with the application.
(function () {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadDifficultyAndTime);
        document.addEventListener('DOMContentLoaded', fetchWords);
        document.addEventListener('DOMContentLoaded', loadHighestScore);
        document.addEventListener('DOMContentLoaded', loadGamesPlayed);
        document.addEventListener('DOMContentLoaded', loadTotalScore);
        document.addEventListener('DOMContentLoaded', loadAverageScore);
    } else {
        loadDifficultyAndTime();
        fetchWords(arrayOfWords);
        loadHighestScore();
        loadGamesPlayed();
        loadTotalScore();
        loadAverageScore();
    }
})();

function loadDifficultyAndTime() {
    $difficulty === null ? setDifficultyAndTime('easy') : setDifficultyAndTime($difficulty);
    levelOfDifficulty.innerHTML = $difficulty;
    remainingTime.innerHTML = `${$timer}s`;
    timer = $timer;
}

function loadHighestScore() {
    $highestScoreOnEasy === null ? updateHighestScoreOnEasy(0) : updateHighestScoreOnEasy($highestScoreOnEasy);
    $highestScoreOnMedium === null ? updateHighestScoreOnMedium(0) : updateHighestScoreOnMedium($highestScoreOnMedium);
    $highestScoreOnHard === null ? updateHighestScoreOnHard(0) : updateHighestScoreOnHard($highestScoreOnHard);
}

function loadGamesPlayed() {
    $gamesOnEasy === null ? updateGamesOnEasy(0) : updateGamesOnEasy($gamesOnEasy);
    $gamesOnMedium === null ? updateGamesOnMedium (0) : updateGamesOnMedium($gamesOnMedium);
    $gamesOnHard === null ? updateGamesOnHard(0) : updateGamesOnHard($gamesOnHard);
}

function loadTotalScore() {
    $totalScoreOnEasy === null ? updateTotalScoreOnEasy(0) : updateTotalScoreOnEasy($totalScoreOnEasy);
    $totalScoreOnMedium === null ? updateTotalScoreOnMedium(0) : updateTotalScoreOnMedium($totalScoreOnMedium);
    $totalScoreOnHard === null ? updateTotalScoreOnHard(0) : updateTotalScoreOnHard($totalScoreOnHard);
}

function loadAverageScore() {
    $averageScoreOnEasy === null ? updateAverageScoreOnEasy(0) : updateAverageScoreOnEasy($averageScoreOnEasy);
    $averageScoreOnMedium === null ? updateAverageScoreOnMedium(0) : updateAverageScoreOnMedium($averageScoreOnMedium);
    $averageScoreOnHard === null ? updateAverageScoreOnHard(0) : updateAverageScoreOnHard($averageScoreOnHard);
}

// Fetching words based on the difficulty. Words are stored in an array.
async function fetchWords(array) {
    try {
        inputWord.style.pointerEvents = 'none';
        const maximumCharacters = await setMaximumCharacters();
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                maximumCharacters: maximumCharacters
            })
        };
        const response = await fetch('/words', options);
        const words = await response.json();
        if (words[0] === 'Error') {
            mainContainer.style.display = 'none';
            errorNotification.style.display = 'block';
            errorDescription.innerHTML = 'We were unable to fetch and display the words from the API.';
            return;
        }
        words.map(word => {
            let rawWord = word.word;
            let wordAdjusted = rawWord.toLowerCase();
            array.push(wordAdjusted);
        });
        displayWord();
        updateWord();
        inputWord.style.pointerEvents = 'auto';
    } catch (err) {
        console.log('Error in function %cfetchWords', 'background-color: #d7385e; color: #fff;');
        console.error(err);
    }
}

// Set the maximum amount of characters the words can have based on the difficulty.
async function setMaximumCharacters() {
    if ($difficulty === 'easy') {
        return 5;
    } else if ($difficulty === 'medium') {
        return 9;
    } else {
        return 13;
    }
}

// Remove the loading spinner.
function displayWord() {
    loadAndDisplayWord.style.gridTemplateAreas = 'word-to-be-typed';
    loadingWord.style.display = 'none';
    wordToBeTyped.style.display = 'block';
}

// Display the current word that has to be typed.
function updateWord() {
    currentWord = arrayOfWords[0];
    console.log(arrayOfWords);
    console.log(`WORD: ${currentWord}`);
    wordToBeTyped.innerHTML = currentWord;
}

// Game starts whenever the user types anything after the word has been displayed.
function startGame() {
    if (inputWord.length !== 0) {
        countdown = setInterval(startCountdown, 1000);
        inputWord.removeEventListener('input', startGame);
    }
}

// Countdown starts when game starts.
function startCountdown() {
    timer--;
    remainingTime.innerHTML = `${timer}s`;
    if (timer === 0) {
        clearInterval(countdown);
        gameIsOver();
    }
}

// Whenever user types a word correctly:
// - Check for the amount of remaining words in the 'arrayOfWords';
// - Display new word;
// - Update score;
// - Reset countdown;
// - Play audio if user hasn't disabled it.
function validateTyping() {
    if (inputWord.value === currentWord) {
        inputWord.value = '';
        arrayOfWords.shift();
        keepTrackArrayOfWords();
        updateWord();
        updateCurrentScore();
        resetCountdown();
        playAudioCorrectWord();
        motivatePlayer();
    }
}

function updateCurrentScore() {
    score++;
    currentScore.innerHTML = score;
}

function resetCountdown() {
    timer = $timer + 1;
}

function playAudioCorrectWord() {
    if ($soundEffects !== 'disabled') {
        audioCorrectWord.volume = 0.4;
        audioCorrectWord.play();
    }
}

// When there are only two words left in the 'arrayOfWords', fetch new words and store them in the 'standByArray'.
// When there are no more words left in the 'arrayOfWords', put the newly fetched words in the 'arrayOfWords' and clear the 'standByArray'.
function keepTrackArrayOfWords() {
    if (arrayOfWords.length === 2) {
        fetchWords(standByArray);
    }
    if (arrayOfWords.length === 0) {
        arrayOfWords = standByArray;
        standByArray = [];
    }
}

// Display a random motivation message whenever the user reaches a score that ends with zero, such as: 10, 20, 30 and so on.
function motivatePlayer() {
    let rawScore = score.toString();
    let scoreLastCharacter = rawScore.charAt(rawScore.length - 1);
    const messages = [
        'Good job', 'Nice work', 'Excellent', 'Awesome', 'Fantastic', 'Keep it up', 'Impressive', 'Well done', 'Wonderful', 'Outstanding', 'Way to go'
    ];
    let randomMessage;
    if (scoreLastCharacter === '0') {
        motivationMessage.style.display = 'block';
        randomMessage = messages[Math.floor(Math.random() * messages.length)];
        motivationMessage.innerHTML = `<span>&#128079;</span> ${randomMessage}! That's ${score} in a row.`;
        setTimeout(() => motivationMessage.style.display = 'none', 3500);
    }
}

// When the countdown reaches zero, display information about the game that has just ended.
// Update the amount of games played in the current difficulty.
// Update the amount of correctly typed words in the current difficulty.
function gameIsOver() {
    mainContainer.style.padding = '30px 12px';
    gameOver.classList.add('display-game-over');
    gameOverDifficulty.innerHTML = $difficulty;
    gameOverScore.innerHTML = score;
    verifyHighestScore();
    updateGamesPlayed();
    updateTotalScore();
}

// Verify if the score of the last game was the highest in that difficulty.
// If the score if the highest so far, store it in the local storage.
function verifyHighestScore() {
    if ($difficulty === 'easy') {
        if (score >= $highestScoreOnEasy) {
            updateHighestScoreOnEasy(score)
            gameOverHighestScore.innerHTML = `Congrats! That's your highest score on this difficulty.`;
            if ($soundEffects !== 'disabled') playAudioHighestScore();
        } else {
            gameOverHighestScore.innerHTML = `Highest score on this difficulty: <span>${$highestScoreOnEasy}</span>.`;
        }
    } else if ($difficulty === 'medium') {
        if (score >= $highestScoreOnMedium) {
            updateHighestScoreOnMedium(score)
            gameOverHighestScore.innerHTML = `Congrats! That's your highest score on this difficulty.`;
            if ($soundEffects !== 'disabled') playAudioHighestScore();
        } else {
            gameOverHighestScore.innerHTML = `Highest score on this difficulty: <span>${$highestScoreOnMedium}</span>.`;
        }
    } else {
        if (score >= $highestScoreOnHard) {
            updateHighestScoreOnHard(score)
            gameOverHighestScore.innerHTML = `Congrats! That's your highest score on this difficulty.`;
            if ($soundEffects !== 'disabled') playAudioHighestScore();
        } else {
            gameOverHighestScore.innerHTML = `Highest score on this difficulty: <span>${$highestScoreOnHard}</span>.`;
        }
    }
}

function playAudioHighestScore() {
    audioHighestScore.volume = 0.4;
    audioHighestScore.play();
}

function updateGamesPlayed() {
    if ($difficulty === 'easy') {
        updateGamesOnEasy($gamesOnEasy + 1);
    } else if ($difficulty === 'medium') {
        updateGamesOnMedium($gamesOnMedium + 1);
    } else {
        updateGamesOnHard($gamesOnHard + 1);
    }
}

function updateTotalScore() {
    if ($difficulty === 'easy') {
        let totalScoreOnEasy = $totalScoreOnEasy + score;
        updateTotalScoreOnEasy(totalScoreOnEasy);
    } else if ($difficulty === 'medium') {
        let totalScoreOnMedium = $totalScoreOnMedium + score;
        updateTotalScoreOnMedium(totalScoreOnMedium);
    } else {
        let totalScoreOnHard = $totalScoreOnHard + score;
        updateTotalScoreOnHard(totalScoreOnHard);
    }
}

// When user clicks in the 'Play again' button or closes the settings, a new game will be generated and displayed.
function resetGame() {
    mainContainer.style.padding = '12px';
    gameOver.classList.remove('display-game-over');
    loadAndDisplayWord.style.gridTemplateAreas = 'loading-word';
    wordToBeTyped.style.display = 'none';
    loadingWord.style.display = 'block';
    inputWord.value = '';
    levelOfDifficulty.innerHTML = $difficulty;
    remainingTime.innerHTML = `${$timer}s`;
    timer = $timer;
    score = 0;
    currentScore.innerHTML = score;
    arrayOfWords = [];
    standByArray = [];
    fetchWords(arrayOfWords);
    inputWord.addEventListener('input', startGame);
}

function openSettings() {
    settings.classList.add('display-settings');
    displayPreferences();
    adjustSoundEffectsOptions();
    if (screen.width > 549) headerContainer.style.display = 'none'; 
}

function closeSettings() {
    settings.classList.remove('display-settings');
    resetGame();
    if (screen.width > 549) headerContainer.style.display = 'block';
}

// Display the 'preferences' section in the menu. Hide the 'statistics' section.
function displayPreferences() {
    settingsMenuBackground.classList.remove('statistics-has-background');
    settingsMenuBackground.classList.add('preferences-has-background');
    statistics.style.display = 'none';
    preferences.style.display = 'block';
    settingsHeaderTitle.innerHTML = 'Preferences';
}

// Display the 'statistics' section in the menu. Hide the 'preferences' section.
function displayStatistics() {
    settingsMenuBackground.classList.remove('preferences-has-background');
    settingsMenuBackground.classList.add('statistics-has-background');
    preferences.style.display = 'none';
    statistics.style.display = 'block';
    settingsHeaderTitle.innerHTML = 'Statistics';
    showStatistcs();
}

// When the user selects a difficulty, it will be displayed in the DOM and its settings will be stored in the local storage.
function setDifficultyAndTime(difficulty) {
    resetButtonsDifficulties();
    if (difficulty === 'easy') {
        buttonEasyDifficulty.innerHTML = 'Difficulty selected';
        buttonEasyDifficulty.style.backgroundColor = '#e37b7c';
        updateDifficulty(difficulty);
        updateTimer(10);
    } else if (difficulty === 'medium') {
        buttonMediumDifficulty.innerHTML = 'Difficulty selected';
        buttonMediumDifficulty.style.backgroundColor = '#e37b7c';
        updateDifficulty(difficulty);
        updateTimer(7);
    } else {
        buttonHardDifficulty.innerHTML = 'Difficulty selected';
        buttonHardDifficulty.style.backgroundColor = '#e37b7c';
        updateDifficulty(difficulty);
        updateTimer(4);
    }
}

function resetButtonsDifficulties() {
    buttonEasyDifficulty.innerHTML = 'Select difficulty';
    buttonMediumDifficulty.innerHTML = 'Select difficulty';
    buttonHardDifficulty.innerHTML = 'Select difficulty';
    buttonEasyDifficulty.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    buttonMediumDifficulty.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    buttonHardDifficulty.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
}

function updateDifficulty(difficulty) {
    localStorage.setItem('difficulty', difficulty);
    $difficulty = localStorage.getItem('difficulty');
    console.log(`Difficulty: ${$difficulty}`);
}

function updateTimer(value) {
    localStorage.setItem('timer', JSON.stringify(value));
    $timer = JSON.parse(localStorage.getItem('timer'));
    console.log(`Timer: ${$timer}`);
    timer = value;
}

// Disable sound effects and store it in the local storage.
function disableSoundEffects() {
    audioCorrectWord.muted = true;
    audioHighestScore.muted = true;
    soundEffectsStatus.innerHTML = 'Sound effects are currently disabled.';
    buttonDisableSoundEffects.style.display = 'none';
    buttonEnableSoundEffects.style.display = 'block';
    soundEffectsOptions.classList.add('sound-effects-options-enabled');
    updateSoundEffects('disabled');
}

// Enable sound effects and store it in the local storage.
function enableSoundEffects() {
    audioCorrectWord.muted = false;
    audioHighestScore.muted = false;
    soundEffectsStatus.innerHTML = 'Sound effects are currently enabled.';
    buttonEnableSoundEffects.style.display = 'none';
    buttonDisableSoundEffects.style.display = 'block';
    soundEffectsOptions.classList.remove('sound-effects-options-enabled');
    updateSoundEffects('enabled');
}

function updateSoundEffects(status) {
    localStorage.setItem('sound-effects', status);
    $soundEffects = localStorage.getItem('sound-effects');
    console.log(`Sound effects: ${$soundEffects}`);
}

// Display the current state of sound effects based on the user preference.
function adjustSoundEffectsOptions() {
    if ($soundEffects === 'enabled' || $soundEffects === null) {
        soundEffectsStatus.innerHTML = 'Sound effects are currently enabled.';
        buttonEnableSoundEffects.style.display = 'none';
        buttonDisableSoundEffects.style.display = 'block';
        soundEffectsOptions.classList.remove('sound-effects-options-enabled');
    } else if ($soundEffects === 'disabled') {
        soundEffectsStatus.innerHTML = 'Sound effects are currently disabled.';
        buttonDisableSoundEffects.style.display = 'none';
        buttonEnableSoundEffects.style.display = 'block';
        soundEffectsOptions.classList.add('sound-effects-options-enabled');
    }
}

// Display player's statistics.
function showStatistcs() {
    gamesOnEasy.innerHTML = $gamesOnEasy;
    gamesOnMedium.innerHTML = $gamesOnMedium;
    gamesOnHard.innerHTML = $gamesOnHard;
    highestScoreOnEasy.innerHTML = $highestScoreOnEasy;
    highestScoreOnMedium.innerHTML = $highestScoreOnMedium;
    highestScoreOnHard.innerHTML = $highestScoreOnHard;
    showAverageScores();
}

function showAverageScores() {
    let scoreOnEasy;
    let scoreOnMedium;
    let scoreOnHard;
    scoreOnEasy = ($totalScoreOnEasy / $gamesOnEasy).toFixed(1);
    scoreOnMedium = ($totalScoreOnMedium / $gamesOnMedium).toFixed(1);
    scoreOnHard = ($totalScoreOnHard / $gamesOnHard).toFixed(1);
    if (!isFinite(scoreOnEasy)) scoreOnEasy = 0;
    if (!isFinite(scoreOnMedium)) scoreOnMedium = 0;
    if (!isFinite(scoreOnHard)) scoreOnHard = 0;
    updateAverageScoreOnEasy(scoreOnEasy);
    updateAverageScoreOnMedium(scoreOnMedium);
    updateAverageScoreOnHard(scoreOnHard);
    averageScoreOnEasy.innerHTML = scoreOnEasy;
    averageScoreOnMedium.innerHTML = scoreOnMedium;
    averageScoreOnHard.innerHTML = scoreOnHard;
}

function clearStatistics() {
    updateGamesOnEasy(0);
    updateGamesOnMedium(0);
    updateGamesOnHard(0);
    updateHighestScoreOnEasy(0);
    updateHighestScoreOnMedium(0);
    updateHighestScoreOnHard(0);
    updateTotalScoreOnEasy(0);
    updateTotalScoreOnMedium(0);
    updateTotalScoreOnHard(0);
    updateAverageScoreOnEasy(0);
    updateAverageScoreOnMedium(0);
    updateAverageScoreOnHard(0);
    showStatistcs();
}

function updateHighestScoreOnEasy(score) {
    localStorage.setItem('highest-score-on-easy', JSON.stringify(score));
    $highestScoreOnEasy = JSON.parse(localStorage.getItem('highest-score-on-easy'));
    console.log(`Highest score on easy: ${$highestScoreOnEasy}`);
}

function updateHighestScoreOnMedium(score) {
    localStorage.setItem('highest-score-on-medium', JSON.stringify(score));
    $highestScoreOnMedium = JSON.parse(localStorage.getItem('highest-score-on-medium'));
    console.log(`Highest score on medium: ${$highestScoreOnMedium}`);
}

function updateHighestScoreOnHard(score) {
    localStorage.setItem('highest-score-on-hard', JSON.stringify(score));
    $highestScoreOnHard = JSON.parse(localStorage.getItem('highest-score-on-hard'));
    console.log(`Highest score on hard: ${$highestScoreOnHard}`);
}

function updateGamesOnEasy(games) {
    localStorage.setItem('games-on-easy', JSON.stringify(games));
    $gamesOnEasy = JSON.parse(localStorage.getItem('games-on-easy'));
    console.log(`Games on easy: ${$gamesOnEasy}`);
}

function updateGamesOnMedium(games) {
    localStorage.setItem('games-on-medium', JSON.stringify(games));
    $gamesOnMedium = JSON.parse(localStorage.getItem('games-on-medium'));
    console.log(`Games on medium: ${$gamesOnMedium}`);
}

function updateGamesOnHard(games) {
    localStorage.setItem('games-on-hard', JSON.stringify(games));
    $gamesOnHard = JSON.parse(localStorage.getItem('games-on-hard'));
    console.log(`Games on hard: ${$gamesOnHard}`);
}

function updateTotalScoreOnEasy(totalScore) {
    localStorage.setItem('total-score-on-easy', JSON.stringify(totalScore));
    $totalScoreOnEasy = JSON.parse(localStorage.getItem('total-score-on-easy'));
    console.log(`Total score on easy: ${$totalScoreOnEasy}`);
}

function updateTotalScoreOnMedium(totalScore) {
    localStorage.setItem('total-score-on-medium', JSON.stringify(totalScore));
    $totalScoreOnMedium = JSON.parse(localStorage.getItem('total-score-on-medium'));
    console.log(`Total score on medium: ${$totalScoreOnMedium}`);
}

function updateTotalScoreOnHard(totalScore) {
    localStorage.setItem('total-score-on-hard', JSON.stringify(totalScore));
    $totalScoreOnHard = JSON.parse(localStorage.getItem('total-score-on-hard'));
    console.log(`Total score on hard: ${$totalScoreOnHard}`);
}

function updateAverageScoreOnEasy(averageScore) {
    localStorage.setItem('average-score-on-easy', JSON.stringify(averageScore));
    $averageScoreOnEasy = JSON.parse(localStorage.getItem('average-score-on-easy'));
    console.log(`Average score on easy: ${$averageScoreOnEasy}`);
}

function updateAverageScoreOnMedium(averageScore) {
    localStorage.setItem('average-score-on-medium', JSON.stringify(averageScore));
    $averageScoreOnMedium = JSON.parse(localStorage.getItem('average-score-on-medium'));
    console.log(`Average score on medium: ${$averageScoreOnMedium}`);
}

function updateAverageScoreOnHard(averageScore) {
    localStorage.setItem('average-score-on-hard', JSON.stringify(averageScore));
    $averageScoreOnHard = JSON.parse(localStorage.getItem('average-score-on-hard'));
    console.log(`Average score on hard: ${$averageScoreOnHard}`);
}

// If user is using a mobile device and is focusing the 'inputWord':
// - Hide the header;
// - Adjust the positioning of the motivation message;
// - Adjust the positioning of the settings button.
window.addEventListener('click', () => {
    const isMobileDevice = window.navigator.userAgent.toLowerCase().includes("mobi");
    const elementOnFocus = document.activeElement;
    if (isMobileDevice) {
        if (elementOnFocus === inputWord) {
            headerContainer.style.display = 'none';
            motivationMessage.style.top = '20px';
            buttonOpenSettings.style.bottom = '22px';
        } else {
            headerContainer.style.display = 'block';
            motivationMessage.style.top = '26%';
            buttonOpenSettings.style.bottom = '30px';
        }
    }
});