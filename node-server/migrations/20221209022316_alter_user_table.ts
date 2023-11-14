import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.renameTable('user', 'users')
}



export async function down(knex: Knex): Promise<void> {
    await knex.schema.renameTable('users', 'user')

}

