const request = require('supertest');
const server = require('./server');
const db = require('./data/dbConfig');
const fruitModel = require('./fruits/fruitModel');

beforeEach(async () => {
    await db('fruits').truncate();
});

describe('server.js', () => {
    describe('fruit model', () => {
        describe('insert()', () => {
            it('should insert the provided fruits into the database', async () => {
                await fruitModel.insert({ name: 'cranberry' });
                await fruitModel.insert({ name: 'grape' });
                let fruits = await db('fruits');
                expect(fruits).toHaveLength(2);
            });
        });
        describe('remove()', () => {
            it('should remove the inserted fruit from the database', async () => {
                let [id] = await db('fruits').insert({ name: 'Grape' });
                await fruitModel.remove(id);
                let fruits = await db('fruits');
                expect(fruits).toHaveLength(0);
            });
        });
    });
    describe('fruits route', () => {
        describe('POST', () => {
            it('should return a Created status code', async () => {
                let response = await request(server).post('/api/fruits').send({ 'name': 'grape' });
                expect(response.status).toEqual(201);
            });
            it('should return a JSON object', async () => {
                let response = await request(server).post('/api/fruits').send({ 'name': 'grape' });
                expect(response.type).toEqual('application/json');
            });
        });
        describe('GET', () => {
            it('should return an OK status code', async () => {
                let response = await request(server).get('/api/fruits');
                expect(response.status).toEqual(200);
            });
            it('should return a JSON object', async () => {
                let response = await request(server).get('/api/fruits');
                expect(response.type).toEqual('application/json');
            });
        });
        describe('DELETE', () => {
            it('should return an OK status code', async () => {
                let [id] = await db('fruits').insert({ name: 'grape' });
                let response = await request(server).delete(`/api/fruits/${id}`);
                expect(response.status).toEqual(200);
            });
            it('should return a JSON object', async () => {
                let [id] = await db('fruits').insert({ name: 'grape' });
                let response = await request(server).delete(`/api/fruits/${id}`);
                expect(response.type).toEqual('application/json');
            });
        });
    });
});