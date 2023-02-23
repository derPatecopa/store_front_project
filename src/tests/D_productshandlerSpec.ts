import request from "supertest";
import app from "../server";
import { Product, ProductStore } from "../models/productsmodel";

const store = new ProductStore();
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
    const product = {
      name: "product_from_create_test",
      price: 12345,
    };
    const response = await await request(app).post("/products").send(product);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(product.name);
    expect(response.body.price).toBe(product.price);
  });
});
