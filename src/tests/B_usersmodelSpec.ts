import { User, UserStore } from "../models/usersmodel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;

const store = new UserStore();

export const usersSuite = describe("Users Model", () => {
  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("create method should add a user to the users table", async () => {
    const user: User = {
      first_name: "John",
      last_name: "Smith",
      user_name: "JohnSmith",
      password: "password123",
    };
    const createdUser = await store.create(user);

    expect(createdUser.id).toBeGreaterThan(0);
    expect(createdUser).toEqual({
      id: jasmine.any(Number),
      first_name: "John",
      last_name: "Smith",
      user_name: "JohnSmith",
      password: jasmine.any(String),
    });
    //console.log(createdUser.password);
    //comparing the created password with the user password if it was hashed correctly
    //saltRounds not neccessary to add, because it is just neccessary during the hashing process
    expect(
      bcrypt.compareSync(user.password + pepper, createdUser.password)
    ).toBe(true);
  });
  it("should have a authenticate method", () => {
    expect(store.authenticate).toBeDefined();
  });
  it("authenticate method should return a user when provided with a valid user name and password", async () => {
    const user: User = {
      first_name: "Marlon",
      last_name: "Brando",
      user_name: "MarlonBrando",
      password: "mafia",
    };

    await store.create(user);
    const authenticatedUser = await store.authenticate(
      user.user_name,
      user.password
    );
    expect(authenticatedUser).not.toBeNull();
    // console.log(
    //   `This is authenticated user from spec:
    //   ${authenticatedUser?.id}
    // ${authenticatedUser?.first_name}
    // ${authenticatedUser?.last_name}
    // ${authenticatedUser?.user_name}
    // ${authenticatedUser?.password}`
    // );
    expect(authenticatedUser?.user_name).toEqual(user.user_name);
  });
  it("should return null when provided with an invalid user name and password", async () => {
    const authenticatedUser = await store.authenticate(
      "invaliduser",
      "invalidpassword"
    );
    expect(authenticatedUser).toBeNull();
  });
  it("should have a index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index method should return a list of users", async () => {
    const result: User[] = await store.index();
    //expect(result.length).toEqual(2);
    expect(result).toEqual(
      jasmine.arrayContaining([
        {
          id: jasmine.any(Number),
          first_name: "John",
          last_name: "Smith",
          user_name: "JohnSmith",
          password: jasmine.any(String),
        },
      ])
    );
  });
  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("show method should return a user with the given user id", async () => {
    const result: User = await store.show("1");
    expect(result).toEqual({
      id: 1,
      first_name: jasmine.any(String),
      last_name: jasmine.any(String),
      user_name: jasmine.any(String),
      password: jasmine.any(String),
    });
  });
});
