const express = require('express');
const fruitRouter = require('./fruits/fruitRouter');

const server = express();

server.use(express.json());
server.use('/api/fruits', fruitRouter);

module.exports = server;