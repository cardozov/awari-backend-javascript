const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

const cepRota = require('./rotas/cep.rota');
const itemRota = require('./rotas/item.rota');

const app = express();

mongoose.connect('mongodb://localhost:27017/awari');
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

cepRota(app);
itemRota(app);

app.listen(3000, () => console.log('Rodando em localhost:3000'));