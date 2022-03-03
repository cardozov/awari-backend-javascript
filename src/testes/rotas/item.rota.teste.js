const request = require('supertest');
const mockingoose = require('mockingoose');

const Item = require('../../modelos/item.modelo');
const itemRota = require('../../rotas/item.rota');
const { setupTeste } = require('../fixtures');

jest.mock(
    '../../mediadores/autenticacao.mediador',
    () => jest.fn((req, res, next) => next())
)

const app = setupTeste(itemRota);
const itemMock = {
    _id: expect.any(String),
    id: 1646164691606,
    descricao: "item teste",
    preco: 29.9
};

describe('Arquivo item.rota.js', () => {
    afterEach(() => jest.clearAllMocks())

    describe('Na rota /item', () => {
        it('deve validar o token em todas as chamadas', async () => {
            const mediador = require('../../mediadores/autenticacao.mediador');
            mockingoose(Item).toReturn(Array(itemMock), 'find');
            await request(app).get('/item');
            expect(mediador).toBeCalledTimes(1);
        })

        it('GET deve chamar o mongoose e retonar os valores e status corretos', async () => {
            mockingoose(Item).toReturn(Array(itemMock), 'find');
            const response = await request(app)
                .get('/item')
                .expect(200);
            expect(response.body).toEqual(Array(itemMock));
        })

        it('POST deve chamar o mongoose corretamente', async () => {
            mockingoose(Item).toReturn(itemMock, 'save'); 
            const response = await request(app)
                .post('/item')
                .send({ descricao: 'item teste', preco: 29.9 })
                .expect(201);
            expect(response.body).toEqual({ mensagem: 'Novo item criado com sucesso' });
        })

        it('POST deve retornar erro quando descrição não é informada', async () => {
            mockingoose(Item).toReturn(itemMock, 'save'); 
            const response = await request(app)
                .post('/item')
                .send({ preco: 29.9 })
                .expect(400);
            expect(response.body).toEqual({ erro: 'Parâmetro descrição é obrigatório' });
        })

        it('POST deve retornar erro quando preço é menor ou igual a zero', async () => {
            mockingoose(Item).toReturn(itemMock, 'save'); 
            const response = await request(app)
                .post('/item')
                .send({ descricao: 'item teste', preco: 0 })
                .expect(400);
            expect(response.body).toEqual({ erro: 'Parâmetro preco deve ser válido' });
        })
    })

    describe('Na rota /item/:id', () => {
        it('deve validar o token em todas as chamadas', async () => {
            const mediadorMock = require('../../mediadores/autenticacao.mediador');
            mockingoose(Item).toReturn(itemMock, 'find');
            await request(app).get('/item/1234567890');
            expect(mediadorMock).toBeCalledTimes(1);
        })

        it('GET deve retornar erro caso ID não exista', async () => {
            mockingoose(Item).toReturn(undefined, 'findOne');
            const response = await request(app)
                .get('/item/1234567890')
                .expect(404);
            expect(response.body).toEqual({ erro: 'ID fornecido não faz referência a nenhum dos itens' });
        })

        it('GET deve retornar item e status corretamente', async () => {
            mockingoose(Item).toReturn(itemMock, 'findOne');
            const response = await request(app)
                .get('/item/1234567890')
                .expect(200);
            expect(response.body).toEqual(itemMock);
        })

        it('PUT deve retornar erro caso ID não exista', async () => {
            mockingoose(Item).toReturn(undefined, 'findOneAndUpdate');
            const response = await request(app)
                .put('/item/1234567890')
                .send(itemMock)
                .expect(404);
            expect(response.body).toEqual({ erro: 'ID fornecido não faz referência a nenhum dos itens' });
        })

        it('PUT deve retornar item atualizado e status correto', async () => {
            mockingoose(Item).toReturn(itemMock, 'findOneAndUpdate');
            const response = await request(app)
                .put('/item/1234567890')
                .send(itemMock)
                .expect(200);
            expect(response.body).toEqual(itemMock);
        })

        it('DELETE deve retornar erro caso ID não exista', async () => {
            mockingoose(Item).toReturn(undefined, 'findOneAndDelete');
            const response = await request(app)
                .delete('/item/1234567890')
                .expect(404);
            expect(response.body).toEqual({ erro: 'ID fornecido não faz referência a nenhum dos itens' });
        })

        it('DELETE deve remover item e retornar status correto', async () => {
            mockingoose(Item).toReturn(itemMock, 'findOneAndDelete');
            const response = await request(app)
                .delete('/item/1234567890')
                .expect(200);
            expect(response.body).toEqual(itemMock);
        })
    })
})