import {User, UserStore} from "../models/usersmodel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;

const store = new UserStore();

fdescribe("Products Model", () => {
    it("should have a create method",() => {
    expect(store.create).toBeDefined();
});
    it("create method should add a user to the users table", async() => {
        const user:User = {
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
        })
        //console.log(createdUser.password);
        //comparing the created password with the user password if it was hashed correctly
        //saltRounds not neccessary to add, because it is just neccessary during the hashing process
        expect(bcrypt.compareSync(user.password + pepper, createdUser.password)).toBe(true);
    })
});
