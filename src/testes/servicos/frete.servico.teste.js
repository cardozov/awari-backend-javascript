const axios = require('axios');

const { enderecoPorCep, calculaFrete } = require('../../servicos/frete.servico');

function geraUrl(cep) {
    return `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&nCdServico=41106&sCepOrigem=01001001&sCepDestino=${cep}&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&nVlDiametro=0&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=3`
}

const enderecoJson = {
    "bairro": "Sé",
    "cep": "01001-001",
    "complemento": "lado par",
    "ddd": "11",
    "gia": "1004",
    "ibge": "3550308",
    "localidade": "São Paulo",
    "logradouro": "Praça da Sé",
    "siafi": "7107",
    "uf": "SP"
}
const freteXml = `
    <?xml version="1.0" encoding="ISO-8859-1" ?>
    <Servicos>
        <cServico>
            <Codigo>41106</Codigo>
            <Valor>21,00</Valor>
            <PrazoEntrega>5</PrazoEntrega>
            <ValorSemAdicionais>21,00</ValorSemAdicionais>
            <ValorMaoPropria>0,00</ValorMaoPropria>
            <ValorAvisoRecebimento>0,00</ValorAvisoRecebimento>
            <ValorValorDeclarado>0,00</ValorValorDeclarado>
            <EntregaDomiciliar>S</EntregaDomiciliar>
            <EntregaSabado>N</EntregaSabado>
            <obsFim></obsFim>
            <Erro>0</Erro>
            <MsgErro></MsgErro>
        </cServico>
    </Servicos>`;

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