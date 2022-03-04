const Item = require('../modelos/item.modelo');

module.exports = function(app) {
    app
        .route('/item')
        .get(async (req, res) => {
            const { filtro } = req.query;
            if (filtro === 'asc' || filtro === 'desc') {
                return res.json(await Item.find().sort({ preco: filtro }).select('id descricao preco -_id'));
            }
            return res.json(await Item.find({}).select('id descricao preco -_id'));
        })
        .post(async (req, res) => {
            const item = req.body;
            if (!item.descricao) return res.json({ erro: 'Parâmetro descrição é obrigatório'});
            if (item?.preco <= 0) return res.json({ erro: 'Parâmetro preco deve ser válido' });
            const itemModelo = new Item({ id: Date.now(), ...item })
            await itemModelo.save();
            return res.json({ mensagem: 'Novo item criado com sucesso' });
        })
}