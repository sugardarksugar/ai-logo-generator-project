import { knex } from "../client";
import { ImageService } from "./image.service";
import { PreferenceService } from "./preference.service";
import { UserService } from "./user.service";

export const imageService = new ImageService(knex);
export const preferenceService = new PreferenceService(knex);
export const userService = new UserService(knex);
