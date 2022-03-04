const cepRota = require('./cep.rota');
const itemRota = require('./item.rota');

module.exports = function(app) {
    cepRota(app);
    itemRota(app);
}