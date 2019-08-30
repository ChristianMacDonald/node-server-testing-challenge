const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
    describe('index route', () => {
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
});