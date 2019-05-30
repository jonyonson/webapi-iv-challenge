const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const dadJokes = require('./data/dadJokes.js');
const devJokes = require('./data/devJokes.js');

// Middleware
// server.use(helmet());
server.use(express.json());
// server.use(cors({ origin: 'http://localhost:3000' }));

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

server.get('/all-jokes', (req, res) => {
  const allJokes = dadJokes.concat(devJokes);
  const randomJoke = allJokes[Math.floor(Math.random() * allJokes.length)];
  res.status(200).send(randomJoke);
});

module.exports = server;
