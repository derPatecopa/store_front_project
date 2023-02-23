import request from "supertest";
import app from "../server";
import { User, UserStore } from "../models/usersmodel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;

const store = new UserStore();
const testUser: User = {
  first_name: "Hans",
  last_name: "Schmidt",
  user_name: "HansSchmidt",
  password: "test123",
};

describe("Users Handler", () => {
  it("should return 200 for endpoint /users", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
  });
  it("should return a list of users", async () => {
    const response = await request(app).get("/users");
    expect(response.body.length).toBeGreaterThan(0);
  });
  it("should return a user with the given id", async () => {
    const user = await store.create(testUser);
    const response = await request(app).get(`/users/${user.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.first_name).toBe(user.first_name);
    expect(response.body.last_name).toBe(user.last_name);
    expect(response.body.user_name).toBe(user.user_name);
    expect(bcrypt.compareSync(user.password + pepper, response.body.password));
  });
  it("should create a new user and return a JWT token", async () => {
    const response = await request(app).post("/users").send(testUser);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined;
    // expect(response.body.first_name).toBe(testUser.first_name);
    // expect(response.body.last_name).toBe(testUser.last_name);
    // expect(response.body.user_name).toBe(testUser.user_name);
    // expect(
    //   bcrypt.compareSync(testUser.password + pepper, response.body.password)
    // );
  });
  it("authenticate method should return a JWT token", async () => {
    //const user = await store.create(testUser);
    const response = await request(app).post("/authenticate").send(
      {user_name: testUser.user_name, password: testUser.password}
      );
    const token = response.body;
    expect(token).toBeDefined();
  })
});
