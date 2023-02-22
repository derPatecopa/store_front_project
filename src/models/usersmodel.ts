import bcrypt from "bcrypt";
import Client from "../database";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  id?: number;
  //designing the variables with _ because, in postgres there is no capital letter, makes it harder to test in jasmine
  first_name: string;
  last_name: string;
  user_name: string;
  password: string;
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
        const result = await conn.query(sql, [
          u.first_name,
          u.last_name,
          u.user_name,
          hash,
        ]);
        const user = result.rows[0];
        conn.release();
        return user;
      } catch (err) {
        throw new Error(`Could not add new user ${u.user_name}. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return defaultUser;
    }
  }
  async authenticate(
    user_name: string,
    password: string
  ): Promise<User | null> {
    if (Client) {
      try {
        const conn = await Client.connect();
        //to return full user you need to select the users row
        const sql = "SELECT * FROM users WHERE user_name=($1)";

        const result = await conn.query(sql, [user_name]);
        //console.log("This is result" + result.rows[0].user_name, result.rows[0].password);

        //console.log("Password plus pepper" + password + pepper);
        //checking if any rows are being returned
        //console.log("This is length " + result.rows.length)
        if (result.rows.length > 0) {
          //console.log("Length is greater 0")
          const user = result.rows[0];

          if (bcrypt.compareSync(password + pepper, user.password)) {
            return user;
          }
        }
        return null;
      } catch (err) {
        throw new Error(
          `Could not authenticate user ${user_name}. Error: ${err}`
        );
      }
    } else {
      console.log("Client is falsy");
      return defaultUser;
    }
  }
  async index(): Promise<User[]> {
    if (Client) {
      try {
        const conn = await Client.connect();
        const sql = "SELECT * FROM users";
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
      } catch (err) {
        throw new Error(`Could not get products. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return [];
    }
  }
  async show(id: string): Promise<User> {
    if (Client) {
      try {
        const sql = "SELECT * FROM users WHERE id=($1)";
        const conn = await Client.connect();
        const result = await conn.query(sql, [id]);

        conn.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`Could not find user with id ${id}. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return defaultUser;
    }
  }
}
