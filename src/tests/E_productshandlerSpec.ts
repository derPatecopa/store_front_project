import request from "supertest";
import app from "../server";
import { Product, ProductStore } from "../models/productsmodel";
import jwt, { Secret } from "jsonwebtoken";
import { User, UserStore } from "../models/usersmodel";

const userStore = new UserStore();

const store = new ProductStore();

const testUser: User = {
  first_name: "Fritz",
  last_name: "Maier",
  user_name: "FritzMaier",
  password: "test12345",
};

const testProduct: Product = {
  name: "spec_product",
  price: 69,
};

describe("Products Handler", () => {
  it("should return 200 for endpoint /products", async () => {
    const response = await request(app).get("/products");
    expect(response.statusCode).toBe(200);
  });
  it("should return a list of products", async () => {
    const response = await request(app).get("/products");
    expect(response.body.length).toBeGreaterThan(0);
  });
  it("should return a product with the given id", async () => {
    const product = await store.create(testProduct);
    const response = await request(app).get(`/products/${product.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(product.name);
    expect(response.body.price).toBe(product.price);
  });
  it("should create a new product", async () => {
    const newUser = await userStore.create(testUser);
    const token = jwt.sign({ newUser }, process.env.TOKEN_SECRET as Secret);
    const requestBody = {
      name: testProduct.name,
      price: testProduct.price,
      token,
    };
    const response = await request(app)
      .post("/products")
      //sending the test product and the token
      .send(requestBody);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(testProduct.name);
    expect(response.body.price).toBe(testProduct.price);
  });
});
