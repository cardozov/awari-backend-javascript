const { xml2js } = require('xml-js');

const autenticacaoMediador = require('../mediadores/autenticacao.mediador');
const { calculaFrete, enderecoPorCep } = require('../servicos/frete.servico');

function processaErro(erro) {
    switch (erro) {
        case '0':
            return false;
        case '001':
            return { status: 500, mensagem: 'Serviço inválido ou inativo'};
        case '-888':
            return { status: 400, mensagem: 'Um parâmetro incorreto foi informado'};
        case undefined:
        default:
            return { status: 404, mensagem: 'CEP não suportado para esse serviço'};
    }
}

function mapaJsonParaFrete(objeto) {
    const { Servicos: { cServico: { Valor, PrazoEntrega, Erro, MsgErro } } } = objeto;
    const valor = parseFloat(Valor._text.replace(',', '.'));
    const valorText = `R$ ${valor.toFixed(2).toString().replace('.', ',')}`;
    const prazo = parseInt(PrazoEntrega._text);
    const prazoText = `${prazo} dias`;
    const erro = Erro._text;
    const descricao = MsgErro._cdata;
    
    return { valor, valorText, prazo, prazoText, erro, descricao };
}

module.exports = function(app) {
    app.get('/frete/:cep', autenticacaoMediador, async function(req, res) {
        const { cep } = req.params;
        const xml = await calculaFrete(cep);
        const json = xml2js(xml, { compact: true });
        const { valor, valorText, prazo, prazoText, erro } = mapaJsonParaFrete(json);
        const descricaoErro = processaErro(erro);
        if (descricaoErro) return res.status(descricaoErro.status).json(descricaoErro.mensagem);

        return res.status(200).json({ valor, valorText, prazo, prazoText });
    })

    app.get('/endereco/:cep', autenticacaoMediador, async function(req, res) {
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