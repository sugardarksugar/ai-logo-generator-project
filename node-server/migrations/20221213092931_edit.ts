import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('topic', (table) =>{
        table.dropColumn('trend_data_id')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('topic', (table) =>{
        table.integer('trend_data_id').references('trend_data.id')
    })
}