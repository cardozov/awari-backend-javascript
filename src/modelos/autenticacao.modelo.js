const mongoose = require('mongoose');

const Acesso = mongoose.model('Acesso', {
    id: {
        type: Number,
        unique: true
    },
    usuario: String,
    senha: String
});

module.exports = Acesso;