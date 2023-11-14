import { Knex } from "knex";

// data is sent from Python via Flask server to express service
type dataFromPython = {
    image: string,
    result_label: string,
    result_poss: number
}

export class UploadPictureService {

    constructor(private knex: Knex) { }

    async uploads(data: dataFromPython) {

        // get data from controller

        try {

            let keyword_name = data.image.split('logo')[0]

            console.log(keyword_name)

            // select preference_id for further use
            let preference_id = await this.knex('preference')
                .select('id')
                .where('name', data.result_label)

            // insert data into - "keyword" and return the id for further use
            let keywords_id: any
            let isKeywordExist = await this.knex.raw('select id from keyword where name = (?)', [keyword_name])
            if (isKeywordExist.rows.length == 0) {

                keywords_id = await this.knex
                    .insert({
                        'name': keyword_name
                    })
                    .into('keyword')
                    .returning('id')

            } else {

                keywords_id = await this.knex('keyword')
                    .select('id')
                    .where('name', keyword_name)

            }

            console.log(keywords_id)

            //insert data into table - "google_picture"
            await this.knex('ai_picture')
                .insert({
                    'file_name': data.image,
                    'preference_id': preference_id[0].id,
                })

        } catch (error) {
            console.log('error', error)

        }

    }
} 