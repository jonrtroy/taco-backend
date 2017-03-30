require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 8000;


app.use(cors());

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// link to resources
app.use('/', require('./resources'));

// config local host port
app.listen(PORT, () => console.log('Server listening on port', PORT));
