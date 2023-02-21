import bcrypt from "bcrypt";
import Client from "../database";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD;
