const express = require('express');
const request = require('supertest');

const autenticacaoMediador = require('../../mediadores/autenticacao.mediador')

const server = express();
const token = Date.now();
server.get('/',autenticacaoMediador, (req, res) => res.status(200).send('Sucesso!'));

describe('Arquivo autenticacao.medador.js', () => {
    it('deve retornar erro caso token seja inválido', async () => {
        const response = await request(server).get('/').expect(401);
        expect(response.text).toBe('Token inválido');
    })

    it('deve retornar erro caso token esteja expirado', async () => {
        const response = await request(server)
            .get('/')
            .set('Authorization', 'Bearer 1646265600000')
            .expect(401);
        expect(response.text).toBe('Token informado está expirado');
    })

    it('deve retornar erro caso token esteja expirado', async () => {
        const response = await request(server)
            .get('/')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(response.text).toBe('Sucesso!');
    })
})
