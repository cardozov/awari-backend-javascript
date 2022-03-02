const freteRota = require('./frete.rota');
const itemRota = require('./item.rota');
const autenticacaoRota = require('./autenticacao.rota');

module.exports = function(app) {
    freteRota(app);
    itemRota(app);
    autenticacaoRota(app);
}