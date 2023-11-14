import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('user', (table) =>{
        table.timestamps(false,true)
    })
    knex.schema.alterTable('like', (table) =>{
        table.timestamps(false,true)
    })
    await knex.schema.alterTable('picture', (table) =>{
        table.timestamps(false,true)
    })
    await knex.schema.alterTable('preference', (table) =>{
        table.timestamps(false,true)
    })
    await knex.schema.alterTable('topic', (table) =>{
        table.timestamps(false,true)
    })
    await knex.schema.alterTable('trend_data', (table) =>{
        table.timestamps(false,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('user', (table) =>{
        table.dropColumn('created_at')
        table.dropColumn('updated_at')
    })
    await knex.schema.alterTable('like', (table) =>{
        table.dropColumn('created_at')
        table.dropColumn('updated_at')
    })
    await knex.schema.alterTable('picture', (table) =>{
        table.dropColumn('created_at')
        table.dropColumn('updated_at')
    })
    await knex.schema.alterTable('preference', (table) =>{
        table.dropColumn('created_at')
        table.dropColumn('updated_at')
    })
    await knex.schema.alterTable('topic', (table) =>{
        table.dropColumn('created_at')
        table.dropColumn('updated_at')
    })
    await knex.schema.alterTable('trend_data', (table) =>{
        table.dropColumn('created_at')
        table.dropColumn('updated_at')
    })
}

