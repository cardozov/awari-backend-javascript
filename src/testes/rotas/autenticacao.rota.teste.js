const request = require('supertest');
const mockingoose = require('mockingoose');

const Acesso = require('../../modelos/autenticacao.modelo');
const autenticacaoRota = require('../../rotas/autenticacao.rota');
const { setupTeste } = require('../fixtures');

const app = setupTeste(autenticacaoRota);
const retornoMock = { usuario: 'teste', senha: '89f496c18616c81b04b8eab8a94b4719' };

describe('Arquivo autenticacao.rota.js', () => {
    describe('POST em /autenticacao/entrar', () => {
        it('deve retornar token corretamente', async () => {
            mockingoose(Acesso).toReturn(retornoMock, 'findOne')
            const response = await request(app)
                .post('/autenticacao/entrar')
                .send({ usuario: 'teste', senha: 'senha1' })
                .expect(200);
            expect(response.body).toMatchObject({ token: expect.any(Number) });
        })

        it('deve retornar erro quando usuario for inválido', async () => {
            mockingoose(Acesso).toReturn(undefined, 'findOne')
            const response = await request(app)
                .post('/autenticacao/entrar')
                .send({ usuario: 'teste', senha: 'senha1' })
                .expect(400);
            expect(response.text).toBe('Usuário ou senha inválidos');
        })

        it('deve retornar erro quando senha for incorreta', async () => {
            mockingoose(Acesso).toReturn(retornoMock, 'findOne')
            const response = await request(app)
                .post('/autenticacao/entrar')
                .send({ usuario: 'teste', senha: 'senha2' })
                .expect(400);
            expect(response.text).toBe('Usuário ou senha inválidos');
        })
    })

    describe('POST em /autenticacao/cadastro', () => {
        it('deve retornar token corretamente', async () => {
            mockingoose(Acesso).toReturn(undefined, 'findOne')
            const response = await request(app)
                .post('/autenticacao/cadastro')
                .send({ usuario: 'teste', senha: 'senha1' })
                .expect(200);
            expect(response.body).toMatchObject({ token: expect.any(Number) });
        })

        it('deve retornar erro quando senha não tem número', async () => {
            mockingoose(Acesso).toReturn(undefined, 'findOne')
            const response = await request(app)
                .post('/autenticacao/cadastro')
                .send({ usuario: 'teste', senha: 'senhaa' })
                .expect(400);
            expect(response.text).toBe('Usuário ou senha inválidos');
        })

        it('deve retornar erro quando senha é muito curta', async () => {
            mockingoose(Acesso).toReturn(undefined, 'findOne')
            const response = await request(app)
                .post('/autenticacao/cadastro')
                .send({ usuario: 'teste', senha: 's' })
                .expect(400);
            expect(response.text).toBe('Usuário ou senha inválidos');
        })

        it('deve retornar erro quando usuário já existe', async () => {
            mockingoose(Acesso).toReturn(retornoMock, 'findOne')
            const response = await request(app)
                .post('/autenticacao/cadastro')
                .send({ usuario: 'teste', senha: 'senha1' })
                .expect(400);
            expect(response.text).toBe('Usuário já foi cadastrado');
        })
    })
})
