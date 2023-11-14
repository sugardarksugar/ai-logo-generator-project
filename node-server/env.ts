import { config } from "dotenv";
import populateEnv from "populate-env";

config();

export let env = {
  WEB_PORT: 8080,
  NODE_ENV: "development",
  SESSION_SECRET: "",

  /* for development */
  DB_NAME: "",
  DB_USERNAME: "",
  DB_PASSWORD: "",
  DB_HOST: "localhost",
  DB_PORT: 5432,

  /* for test and production */
  POSTGRES_DB: "abc",
  POSTGRES_USER: "abc",
  POSTGRES_PASSWORD: "abc",
  POSTGRES_HOST: "localhost",
  POSTGRES_PORT: 5432,
};

populateEnv(env, { mode: "halt" });
