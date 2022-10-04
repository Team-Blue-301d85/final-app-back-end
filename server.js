'use strict';

// requires

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const getTerms = require('./modules/getTerms.js');
const deleteTerm = require('./modules/deleteTerm.js');
const postTerm = require('./modules/postTerm.js');
const updateTerm = require('./modules/updateTerm.js');
const PORT = process.env.PORT || 3002;

// uses

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.DB_URL);

// validation

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('mongoose is connected');
});

// routes

app.get('/', (req, res) => {
  res.status(200).send(`<h1>Welcome to server</h1>
                        <h2>Routes</h2>
                        <ul>
                          <li>/terms</li>
                          <li>/test</li>
                        </ul>`);
});

app.get('/terms', getTerms);

app.post('/terms', postTerm);

app.delete('/terms/:id', deleteTerm);

app.put('/terms/:id', updateTerm);

app.get('/test', (req, res) => {
  res.send('test received');
});

app.get('*', (req, res) => {
  res.status(404).send('Page does not exist');
});

// errors

app.use((error, req, res) => {
  res.status(500).send(error.message);
});

// listener

app.listen(PORT, () => console.log(`listening on ${PORT}`));
