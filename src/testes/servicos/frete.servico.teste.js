const { default: axios } = require('axios');

const { enderecoJson, freteXml } = require('../fixtures');
const { enderecoPorCep, calculaFrete } = require('../../servicos/frete.servico');

function geraUrl(cep) {
    return `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&nCdServico=41106&sCepOrigem=01001001&sCepDestino=${cep}&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&nVlDiametro=0&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=3`
}

describe('Arquivo calculaFrete.js', () => {
    it('deve calcular frete corretamente para o CEP 01.001-001', async () => {
        const resultado = await calculaFrete('01001001');
        expect(resultado.replace(/\s/g, '')).toEqual(freteXml.replace(/\s/g, ''));
    })

    it('deve chamar corretamente a API de frete', async () => {
        const spy = jest.spyOn(axios, 'post');
        await calculaFrete('01001001');
        expect(spy).toBeCalledWith(geraUrl('01001001'), {})
    })

    it('deve buscar endereço correto para o CEP 01.001-001', async () => {
        const resultado = await enderecoPorCep('01001001');
        expect(resultado).toEqual(enderecoJson);
    })

    it('deve chamar corretamente a API de endereços', async () => {
        const spy = jest.spyOn(axios, 'get');
        await enderecoPorCep('01001001');
        expect(spy).toBeCalledWith('https://viacep.com.br/ws/01001001/json/')
    })
})