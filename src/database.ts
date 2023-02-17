import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_TEST_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_PASSWORD,
  ENV,
} = process.env;

let client: Pool | null = null;
console.log("This is the ENV variable: " + ENV);

if (ENV === "dev") {
  console.log("Connection regular database");
  client = new Pool({
    host: POSTGRES_HOST,
    port: POSTGRES_PORT as unknown as number,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
if (ENV === "test") {
  console.log("Connection test database");
  client = new Pool({
    host: POSTGRES_HOST,
    port: POSTGRES_PORT as unknown as number,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_TEST_USER,
    password: POSTGRES_TEST_PASSWORD,
  });
}
export default client;
