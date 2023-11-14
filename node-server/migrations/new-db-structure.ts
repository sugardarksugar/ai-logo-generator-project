import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', table => {
      table.increments('id')
      table.string('username', 255).notNullable()
      table.string('password_hash', 60).notNullable()
      table.timestamps(false,true)
    })
  }

  if (!(await knex.schema.hasTable('preference'))) {
    await knex.schema.createTable('preference', table => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.timestamps(false,true)
    })
  }

  if (!(await knex.schema.hasTable('user_preference'))) {
    await knex.schema.createTable('user_preference', table => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('user.id')
      table.integer('preference_id').unsigned().notNullable().references('preference.id')
      table.timestamps(false,true)
    })
  }

  if (!(await knex.schema.hasTable('ai_picture'))) {
    await knex.schema.createTable('ai_picture', table => {
      table.increments('id')
      table.string('file_name', 255).notNullable()
      table.integer('preference_id').unsigned().notNullable().references('preference.id')
      table.timestamps(false,true)
    })
  }

  if (!(await knex.schema.hasTable('keyword'))) {
    await knex.schema.createTable('keyword', table => {
      table.increments('id')
      table.string('name', 100).notNullable()
      table.timestamps(false,true)
    })
  }  

  if (!(await knex.schema.hasTable('google_picture'))) {
    await knex.schema.createTable('google_picture', table => {
      table.increments('id')
      table.integer('keyword_id').unsigned().notNullable().references('keyword.id')
      table.string('file_name', 255).notNullable()
      table.integer('preference_id').unsigned().notNullable().references('preference.id')
      table.timestamps(false,true)
    })
  }

  if (!(await knex.schema.hasTable('save'))) {
    await knex.schema.createTable('save', table => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('user.id')
      table.integer('ai_picture_id').unsigned().notNullable().references('ai_picture.id')
      table.timestamps(false,true)
    })
  }

  if (!(await knex.schema.hasTable('trend_data'))) {
    await knex.schema.createTable('trend_data', table => {
      table.increments('id')
      table.string('time', 30).notNullable()
      table.string('formatted_time', 30).notNullable()
      table.string('formatted_axis_time', 30).notNullable()
      table.integer('value').notNullable()
      table.boolean('hasData').notNullable()
      table.string('formatted_value', 20).notNullable()
      table.timestamps(false,true)
    })
  }

  if (!(await knex.schema.hasTable('graph_data'))) {
    await knex.schema.createTable('graph_data', table => {
      table.increments('id')
      table.integer('keyword_id').unsigned().notNullable().references('keyword.id')
      table.integer('trend_data_id').unsigned().notNullable().references('trend_data.id')
      table.timestamps(false,true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('graph_data')
  await knex.schema.dropTableIfExists('google_picture')
  await knex.schema.dropTableIfExists('keyword')
  await knex.schema.dropTableIfExists('trend_data')
  await knex.schema.dropTableIfExists('save')
  await knex.schema.dropTableIfExists('ai_picture')
  await knex.schema.dropTableIfExists('user_preference')
  await knex.schema.dropTableIfExists('preference')
  await knex.schema.dropTableIfExists('user')
}
