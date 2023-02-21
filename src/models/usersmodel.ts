import bcrypt from "bcrypt";
import Client from "../database";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  id?: number,
  //designing the variables with _ because, in postgres there is no capital letter, makes it harder to test in jasmine
  first_name: string,
  last_name: string,
  user_name: string,
  password: string,
};

const defaultUser = {
  id: 0,
  first_name: "",
  last_name: "",
  user_name: "",
  password: "",
};

export class UserStore {
  async create(u: User): Promise<User> {
    if (Client) {
      try {
        const conn = await Client.connect();
        const sql =
          "INSERT INTO users (first_name, last_name, user_name, password) VALUES ($1, $2, $3, $4) RETURNING *";
        const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
        const result = await conn.query(sql, [u.first_name, u.last_name, u.user_name, hash]);
        const user = result.rows[0];
        conn.release();
        return user;
      } catch (err) {
        throw new Error(
          `Could not add new user ${u.user_name}. Error: ${err}`
        );
      }
    } else {
      console.log("Client is falsy");
      return defaultUser;
    }
  }
}
