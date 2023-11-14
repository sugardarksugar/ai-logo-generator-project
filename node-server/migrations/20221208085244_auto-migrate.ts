import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', table => {
      table.increments('id')
      table.string('username', 255).notNullable()
      table.specificType('password_hash', 'char(60)').notNullable()
      table.string('gender', 10).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('player'))) {
    await knex.schema.createTable('player', table => {
      table.increments('id')
      table.string('name', 20).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('type'))) {
    await knex.schema.createTable('type', table => {
      table.increments('id')
      table.enum('name', ['attack','defense','support']).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('pick_rate'))) {
    await knex.schema.createTable('pick_rate', table => {
      table.increments('id')
      table.integer('rate').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('win_rate'))) {
    await knex.schema.createTable('win_rate', table => {
      table.increments('id')
      table.integer('rate').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('ranking'))) {
    await knex.schema.createTable('ranking', table => {
      table.increments('id')
      table.string('rank', 20).notNullable()
      table.integer('pick_rate_id').unsigned().notNullable().references('pick_rate.id')
      table.integer('win_rate_id').unsigned().notNullable().references('win_rate.id')
      table.integer('number_of_player').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('character'))) {
    await knex.schema.createTable('character', table => {
      table.increments('id')
      table.string('name', 20).notNullable()
      table.integer('type_id').unsigned().notNullable().references('type.id')
      table.integer('ranking_id').unsigned().notNullable().references('ranking.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('player_preference'))) {
    await knex.schema.createTable('player_preference', table => {
      table.increments('id')
      table.integer('player_id').unsigned().notNullable().references('player.id')
      table.integer('character_id').unsigned().notNullable().references('character.id')
      table.timestamps(false, true)
    })
  }
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('player_preference')
  await knex.schema.dropTableIfExists('character')
  await knex.schema.dropTableIfExists('ranking')
  await knex.schema.dropTableIfExists('win_rate')
  await knex.schema.dropTableIfExists('pick_rate')
  await knex.schema.dropTableIfExists('type')
  await knex.schema.dropTableIfExists('player')
  await knex.schema.dropTableIfExists('user')
}
