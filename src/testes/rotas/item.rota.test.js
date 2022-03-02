const request = require('supertest');
const mockingoose = require('mockingoose');
const express = require('express');

const Item = require('../../modelos/item.modelo');
const itemRota = require('../../rotas/item.rota');

const app = express();

describe('Arquivo item.rota.js', () => {
    const itemMock = [{
        _id: expect.any(String),
        id: 1646164691606,
        descricao: "item teste",
        preco: 29.9
    }];

    beforeEach(() => itemRota(app))

    describe('Na rota /item', () => {
        it('GET deve chamar o mongoose e retonar os valores e status corretos', async () => {
            mockingoose(Item).toReturn(itemMock, 'find');
            const response = await request(app)
                .get('/item')
                .set('Authorization', `Bearer ${Date.now()}`)
                .expect(200);
            expect(response.body).toEqual(itemMock);
        })

        // it('POST deve chamar o mongoose corretamente', async () => {
        //     mockingoose(Item).toReturn(itemMock, 'save'); 
        //     const response = await request(app)
        //         .post('/item')
        //         .set('Authorization', `Bearer ${Date.now()}`)
        //         .field({ descricao: 'item teste', preco: 29.9 })
        //         .expect(201);
        //     expect(response.body).toEqual(itemMock);
        // })

        // it('POST deve retornar erro quando descricao não é informada', async () => {
        //     const response = await request(app)
        //         .get('/item')
        //         .set('Authorization', `Bearer ${Date.now()}`)
        //         .expect(200);
        //     expect(response.body).toEqual(itemMock);
        // })

        // it('POST deve retornar erro quando preço é menor ou igual a zero', async () => {
        //     const response = await request(app)
        //         .get('/item')
        //         .set('Authorization', `Bearer ${Date.now()}`)
        //         .expect(200);
        //     expect(response.body).toEqual(itemMock);
        // })
    })
})