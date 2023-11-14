import { Knex } from "knex";

export class ImageService {
  constructor(private knex: Knex) {}

  async getImage(preference: number[]) {
    return this.knex
      .select("file_name")
      .from("ai_picture")
      .whereIn("preference_id", preference) //preference is an array e.g [2,4,7,9]
      .union(function () {
        this.select("file_name")
          .from("google_picture")
          .whereIn("preference_id", preference);
      });
  }

  async getImagesByKeyword(keyword: string) {
    return this.knex
      .select("file_name")
      .from("google_picture")
      .join("keyword", "keyword.id", "keyword_id")
      .whereLike("name", `%${keyword}%`);
  }
}
