if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const WORDNIK_API_KEY = process.env.WORDNIK_API_KEY;

const express = require('express');
const app = express();
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/words', async (request, response) => {
    try {
        // console.log(request); // colocar opção pra mudar o máximo de caracteres da palavra - max length
        const wordnikURL = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minLength=4&maxLength=14&limit=10&api_key=${WORDNIK_API_KEY}`;
        const wordnikResponse = await fetch(wordnikURL);
        const wordnikData = await wordnikResponse.json();
        response.json(wordnikData);
    } catch (err) {
        response.json(`Error: ${err}`);
    }
});

app.listen(port, () => console.log('Server updated'));