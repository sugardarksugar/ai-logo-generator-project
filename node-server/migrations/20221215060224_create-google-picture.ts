import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("google_picture", (table) => { ///////////Not yet finished
        table.increments();
        table.string("name", 255);
        table.string("label", 255);
        table.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("google_picture")
}


