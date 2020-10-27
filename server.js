if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const WORDNIK_API_KEY = process.env.WORDNIK_API_KEY;
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/words', async (request, response) => {
    try {
        const wordnikURL = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=idiom&minLength=3&maxLength=${request.body.maximumCharacters}&limit=10&api_key=${WORDNIK_API_KEY}`;
        const wordnikResponse = await fetch(wordnikURL);
        if (!wordnikResponse.ok) throw new Error('Unable to fetch the data from the Wordnik API');
        const wordnikData = await wordnikResponse.json();
        response.json(wordnikData);
    } catch (err) {
        response.json(['Error', err.message]);
    }
});

app.listen(port, () => console.log('Server updated.'));