const express = require('express');
const fruitRouter = require('./fruits/fruitRouter');

const server = express();

server.use(express.json());
server.use('/api/fruits', fruitRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

module.exports = server;