import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

let client: Pool | null = null;

client = new Pool({
  host: POSTGRES_HOST,
  port: POSTGRES_PORT as unknown as number,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
