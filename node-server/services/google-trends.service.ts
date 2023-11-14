// import { Knex } from "knex";

// type GoogleTrendData = {
//   time: string;
//   formattedTime: string;
//   formattedAxisTime: string;
//   value: [number];
//   hasData: [boolean];
//   formattedValue: [string];
// };

// export class GoogleTrendService {
//   constructor(private knex: Knex) {}

//   async search(data: GoogleTrendData, keywords: string) {
//     let topic_id = await this.knex
//       .insert([
//         { time: data.time },
//         { formatted_time: data.formattedTime },
//         { formatted_axis_time: data.formattedAxisTime },
//         { value: data.value[0] },
//         { hasData: data.hasData[0] },
//         { formattedValue: data.formattedValue[0] },
//       ])
//       .into("trend_data")
//       .returning("id");

//     await this.knex("topic")
//       .where("topic.name", "=", keywords)
//       .update({ trend_data_id: topic_id });
//   }
// }
