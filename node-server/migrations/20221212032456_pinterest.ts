import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', (table) => {
        table.increments('id')
        table.string('username', 255).notNullable()
        table.string('password_hash', 60).notNullable()
    })
    await knex.schema.createTable('topic', (table) => {
        table.increments('id')
        table.string('name', 255)
    })
    await knex.schema.createTable('preference', (table) =>{
        table.increments('id')
        table.integer('user_id').references('user.id')
        table.integer('topic_id').references('topic.id')
    })
    await knex.schema.createTable('picture', (table) => {
        table.increments('id')
        table.string('file_name', 255)
        table.text('label')
    })
    await knex.schema.createTable('like', (table) => {
        table.increments('id')
        table.integer('user_id').references('user.id')
        table.integer('picture_id').references('picture.id')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('like')
    await knex.schema.dropTable('picture')
    await knex.schema.dropTable('preference')
    await knex.schema.dropTable('topic')
    await knex.schema.dropTable('user')
}

