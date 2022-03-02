const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const rotas = require('./rotas/rotas');

const app = express();
const porta = process.env.PORTA || 3003
const mongoUrl = process.env.URL_MONGODB || '';

mongoose.connect(mongoUrl);
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

rotas(app);

app.listen(porta, () => console.log(`Rodando em localhost:${porta}`));