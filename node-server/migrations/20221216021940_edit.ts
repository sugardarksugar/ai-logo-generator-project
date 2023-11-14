import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('like')
    await knex.schema.dropTableIfExists('picture')
    await knex.schema.dropTableIfExists('preference')
    await knex.schema.dropTableIfExists('user')
    await knex.schema.dropTableIfExists('topic')

}


export async function down(knex: Knex): Promise<void> {
}

