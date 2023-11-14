import { Knex } from "knex";

export class PreferenceService {
  constructor(private knex: Knex) {}

  async insertPreference(user_id: number, data: number[]) {
    //using for loop to insert into DB
    for (let preference of data) {
      await this.knex
        .insert({
          user_id: user_id,
          preference_id: preference,
        })
        .into("user_preference");
    }

    // await this.knex
    //   .insert(
    //     data.map((v) => {
    //       return { user_id: user_id, preference_id: v };
    //     })
    //   )
    //   .into("user_preference");
  }

  async getPreference(user_id: number): Promise<number[]> {
    let rows: { preference_id: number }[] = await this.knex
      .select("preference_id")
      .from("user_preference")
      .where("user_id", user_id);
    return rows.map((row) => row.preference_id);
  }
}
