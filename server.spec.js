const request = require('supertest');
const server = require('./server');
const db = require('./data/dbConfig');
const fruitModel = require('./fruits/fruitModel');

beforeEach(async () => {
    await db('fruits').truncate();
});

describe('server.js', () => {
    describe('index route', () => {
        it('has process.env.DB_ENV as testing', () => {
            expect(process.env.DB_ENV).toBe('testing');
        });
        it('should return an OK status code from the index route', async () => {
            let expectedStatusCode = 200;
            let response = await request(server).get('/');
            expect(response.status).toEqual(expectedStatusCode);
        });
        it('should return a JSON obect from the index route', async () => {
            let expectedBody = { api: 'running' };
            let response = await request(server).get('/');
            expect(response.body).toEqual(expectedBody);
        });
        it('should return a JSON object from the index route', async () => {
            let response = await request(server).get('/');
            expect(response.type).toEqual('application/json');
        });
    });
    describe('fruit model', () => {
        describe('insert()', () => {
            it('should insert the provided fruits into the database', async () => {
                await fruitModel.insert({ name: 'Cranberry' });
                await fruitModel.insert({ name: 'Grape' });
                let fruits = await db('fruits');
                expect(fruits).toHaveLength(2);
            });
        });
    });
});