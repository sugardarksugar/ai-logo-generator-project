import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('trend_data', (table) =>{
        table.string('keywords', 255)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('trend_data', (table) =>{
        table.dropColumn('keywords')
    })
}

