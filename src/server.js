const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const cepRota = require('./rotas/cep.rota');

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

cepRota(app);

app.listen(3000, () => console.log('Rodando em localhost:3000'));