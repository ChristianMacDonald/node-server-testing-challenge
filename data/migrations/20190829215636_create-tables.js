
exports.up = function(knex) {
    return knex.schema.createTable('fruits', table => {
        table.increments();
        table.string('name', 128);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('fruits');
};
