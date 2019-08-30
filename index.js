const express = require('express');
const fruitRouter = require('./fruits/fruitRouter');

const server = express();

server.use(express.json());
server.use('/api/fruits', fruitRouter);

server.listen(8000, () => {
    console.log('Server listening on port 8000.');
});