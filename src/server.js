const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

const rotas = require('./rotas/rotas');
const { URL_MONGODB, PORTA } = require('./constantes');

const app = express();

mongoose.connect(URL_MONGODB);
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

rotas(app);

app.listen(PORTA, () => console.log(`Rodando em localhost:${PORTA}`));