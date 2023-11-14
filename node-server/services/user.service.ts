import { Knex } from "knex";

export class UserService {
  constructor(private knex: Knex) {}

  async checkAccountDup(username: string) {
    return await this.knex
      .select("username")
      .from("user")
      .where("username", username);
  }

  async createAccount(username: string, password: string) {
    await this.knex
      .insert({ username: username, password_hash: password })
      .into("user");
  }

  async findUser(username: string) {
    return await this.knex
      .select("id", "username", "password_hash")
      .from("user")
      .where({ username })
      .first();
  }
}
