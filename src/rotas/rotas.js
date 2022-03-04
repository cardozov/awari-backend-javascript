const cepRota = require('./cep.rota');
const itemRota = require('./item.rota');
const autenticacaoRota = require('./autenticacao.rota');

module.exports = function(app) {
    cepRota(app);
    itemRota(app);
    autenticacaoRota(app);
}