const request = require('supertest');

const freteRota = require('../../rotas/cep.rota');
const { freteXml, setupTeste, enderecoJson } = require('../fixtures');
const servicoFrete = require('../../servicos/frete.servico');

jest.mock('../../servicos/frete.servico');

const app = setupTeste(freteRota);
const retornoMock = {
    valor: 21,
    valorText: 'R$ 21,00',
    prazo: 5,
    prazoText: '5 dias'
};

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
