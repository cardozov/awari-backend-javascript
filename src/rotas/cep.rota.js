const { xml2js } = require('xml-js');

const { calculaFrete, enderecoPorCep } = require('../servicos/frete.servico');

module.exports = function(app) {
    app.get('/frete/:cep', async function(req, res) {
        const { cep } = req.params;
        const xml = await calculaFrete(cep);
        const json = xml2js(xml, { compact: true });
        const { Servicos: { cServico: { Valor, PrazoEntrega, Erro } } } = json;
        const valor = parseFloat(Valor._text.replace(',', '.'));
        const valorText = `R$ ${valor.toFixed(2).toString().replace('.', ',')}`;
        const prazo = parseInt(PrazoEntrega._text);
        const prazoText = `${prazo} dias`;
        switch (Erro._text) {
            case '0':
                return res.status(200).json({ valor, valorText, prazo, prazoText });
            case '001':
                return res.status(500).json({ mensagem: 'Serviço inválido ou inativo' });
            case '-888':
                return res.status(400).json({ mensagem: 'Um parâmetro incorreto foi informado' });
            case undefined:
            default:
                return res.status(404).json({ mensagem: 'CEP não suportado para esse serviço' });
        }
    })

    app.get('/endereco/:cep', async function(req, res) {
        const { cep } = req.params;
        try {
            const endereco = await enderecoPorCep(cep);
            res.status(200).json(endereco);
        } catch (erro) {
            console.err(erro);
            return res.status(500).json({ message: 'Ocorreu algum comportamento inesperado' });
        }
    })
}