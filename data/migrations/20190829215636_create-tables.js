
exports.up = function(knex) {
    return knex.schema.createTable('fruit', table => {
        table.increments();
        table.string('name', 128);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('fruit');
};
