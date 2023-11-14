import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // await knex("table_name").del();

    // Inserts seed entries
    await knex("preference").insert([
        { name: "anime" },
        { name: "animals" },
        { name: "cute" },
        { name: "food" },
        { name: "colourful logo" },
        { name: "black logo" },
        { name: "instrument" },
        { name: "words" },
        { name: "books" }
    ]);
};
