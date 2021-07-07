const db = require('../data/dbConfig');

function get(id = 0) {
    if (id) {
        return db('fruits').where({ id }).first();
    } else {
        return db('fruits');
    }
}

async function insert(fruit) {
    let [id] = await db('fruits').insert(fruit);
    return get(id);
}

async function update(id, changes) {
    await db('fruits').where({ id }).update(changes);
    return get(id);
}

async function remove(id) {
    return db('fruits').where({ id }).del();
}

module.exports = {
    get,
    insert,
    update,
    remove
};