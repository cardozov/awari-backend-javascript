const autenticacaoMediador = require('../mediadores/autenticacao.mediador');
const Item = require('../modelos/item.modelo');

module.exports = function(app) {
    // app.use('/item', autenticacaoMediador);

    app
        .route('/item')
        .get(async (req, res) => {
            const { filtro } = req.query;
            if (filtro === 'asc' || filtro === 'desc') {
                return res.status(200).json(await Item.find().sort({ preco: filtro }).select('id descricao preco -_id'));
            }
            return res.status(200).json(await Item.find({}).select('id descricao preco -_id'));
        })
        .post(async (req, res) => {
            const item = req.body;
            if (!item.descricao) return res.status(400).json({ erro: 'Parâmetro desricao é obrigatório'});
            if (item?.preco <= 0) return res.status(400).json({ erro: 'Parâmetro preco deve ser válido' });
            const itemModelo = new Item({ id: Date.now(), ...item })
            try {
                await itemModelo.save();
                return res.status(201).json({ mensagem: 'Novo item criado com sucesso' });
            } catch (erro) {
                console.err(erro);
                return res.status(500).json({ message: 'Ocorreu algum comportamento inesperado' });
            }
        })

    app
        .route('/item/:id')
        .get(async (req, res) => {
            const { id } = req.params;
            const item = await Item.findOne({ id }).select('id descricao preco -_id');
            if (!item)
                return res.status(404).json({ erro: 'ID fornecido não faz referência a nenhum dos itens' });

            return res.status(200).json(item);
        })
        .put(async (req, res) => {
            const { id } = req.params;
            const itemAtualizado = req.body;
            const item = await Item.findOneAndUpdate({ id }, itemAtualizado, { new: true }).select('id descricao preco -_id');
            if (!item)
                return res.status(404).json({ erro: 'ID fornecido não faz referência a nenhum dos itens' });

            return res.status(200).json(item);
        })
        .delete(async (req, res) => {
            const { id } = req.params;
            const item = await Item.findOneAndDelete({ id }).select('id descricao preco -_id');
            if (!item)
                return res.status(404).json({ erro: 'ID fornecido não faz referência a nenhum dos itens' });

            return res.status(200).json(item);
        })
}