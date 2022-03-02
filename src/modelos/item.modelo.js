const mongoose = require('mongoose');

const Item = mongoose.model('Item', {
    id: {
        type: Number,
        unique: true
    },
    descricao: String,
    preco: Number
});

module.exports = Item;