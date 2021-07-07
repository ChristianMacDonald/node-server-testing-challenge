const express = require('express');
const fruitModel = require('./fruitModel');

const router = express.Router();

router.post('/', validateFruit, async (req, res) => {
    try {
        let fruit = await fruitModel.insert(req.body);
        res.status(201).json(fruit);
    } catch (err) {
        res.status(500).json({ error: 'There was a problem saving the fruit to the database.' });
    }
});

router.get('/', async (req, res) => {
    try {
        let fruits = await fruitModel.get();
        res.status(200).json(fruits);
    } catch (err) {
        res.status(500).json({ error: 'The fruits information could not be retrieved.' });
    }
});

router.get('/:id', validateFruitId, async (req, res) => {
    res.status(200).json(req.fruit);
});

router.put('/:id', validateFruitId, async (req, res) => {
    try {
        let fruit = await fruitModel.update(req.params.id, req.body);
        res.status(200).json(fruit);
    } catch (err) {
        res.status(500).json({ error: 'The fruit information could not be updated.' });
    }
});

router.delete('/:id', validateFruitId, async (req, res) => {
    try {
        await fruitModel.remove(req.params.id);
        res.status(200).json(req.fruit);
    } catch (err) {
        res.status(500).json({ error: 'There was an error removing the fruit from the database.' });
    }
});

async function validateFruitId(req, res, next) {
    try {
        let fruit = await fruitModel.get(req.params.id);
        if (fruit) {
            req.fruit = fruit;
            next();
        } else {
            res.status(404).json({ message: 'The fruit with the specified ID does not exist.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'The fruit information could not be retrieved.' });
    }
}

function validateFruit(req, res, next) {
    if (req.body) {
        if (req.body.name) {
            next();
        } else {
            res.status(400).json({ message: 'Missing required name field.' });
        }
    } else {
        res.status(400).json({ message: 'Missing fruit data.' });
    }
}

module.exports = router;