const express = require('express');
const helmet = require('helmet');

const server = express();

const dadJokes = require('./data/dadJokes.js');
const devJokes = require('./data/devJokes.js');

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h2>Jokes API</h2>');
});

server.get('/dad-jokes', (req, res) => {
  const randomDadJoke = dadJokes[Math.floor(Math.random() * dadJokes.length)];
  res.status(200).send(randomDadJoke);
});

server.get('/dev-jokes', (req, res) => {
  const randomDevJoke = devJokes[Math.floor(Math.random() * devJokes.length)];
  res.status(200).send(randomDevJoke);
});

module.exports = server;
