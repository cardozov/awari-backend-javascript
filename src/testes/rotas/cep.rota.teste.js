const express = require('express');
const request = require('supertest');

const freteRota = require('../../rotas/cep.rota');
const servicoFrete = require('../../servicos/frete.servico');

jest.mock('../../servicos/frete.servico');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
freteRota(app);
const retornoMock = {
    valor: 21,
    valorText: 'R$ 21,00',
    prazo: 5,
    prazoText: '5 dias'
};
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

describe('Arquivo frete.rota.js', () => {
    it('GET em /frete/:cep deve retornar o frete correto', async () => {
        jest.spyOn(servicoFrete, 'calculaFrete').mockResolvedValue(freteXml);
        const response = await request(app)
            .get('/frete/01001001')
            .expect(200);
        expect(response.body).toMatchObject(retornoMock);
    })

    it('GET em /endereco/:cep', async () => {
        jest.spyOn(servicoFrete, 'enderecoPorCep').mockResolvedValue(enderecoJson);
        const response = await request(app)
            .get('/endereco/01001001')
            .expect(200);
        expect(response.body).toMatchObject(enderecoJson);
    })
})
