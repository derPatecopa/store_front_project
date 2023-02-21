import { Product, ProductStore } from "../models/productsmodel";

const store = new ProductStore();

describe("Products Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("create method should add a product", async () => {
    const result = await store.create({
      name: "test_Product",
      price: 1000,
    });
    expect(result).toEqual({
      id: 1,
      name: "test_Product",
      price: 1000,
    });
  });
  it("index method should return a list of products", async () => {
    const result: Product[] = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "test_Product",
        price: 1000,
      },
    ]);
  });
  it("show method should return the correct product", async () => {
    const result: Product = await store.show("1");
    expect(result).toEqual({
      id: 1,
      name: "test_Product",
      price: 1000,
    });
  });
});
