import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('trend_data', (table) => {
        table.increments('id')
        table.string('time', 30)
        table.string('formatted_time', 30)
        table.string('formatted_axis_time', 30)
        table.integer('value')
        table.boolean('hasData')
        table.string('formatted_value', 20)
    })
    await knex.schema.alterTable('topic', (table) =>{
        table.integer('trend_data_id').references('trend_data.id')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('topic', (table) =>{
        table.dropColumn('trend_data_id')
    })
    await knex.schema.dropTable('trend_data')
}