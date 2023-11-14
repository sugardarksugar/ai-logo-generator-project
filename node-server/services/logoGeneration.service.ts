import { Knex } from "knex";

export class LogoGenerationService {
    constructor(private knex: Knex) { }
    async savePictureTagIntoDataBase(tag: string) {
        console.log(this.knex);
    }
    async savePictureIntoDataBase() {

    }

}