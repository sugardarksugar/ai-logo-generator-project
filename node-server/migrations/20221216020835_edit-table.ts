import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTable('trend_data')
}


export async function down(knex: Knex): Promise<void> {
}

