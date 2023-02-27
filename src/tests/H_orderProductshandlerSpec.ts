import request from "supertest";
import app from "../server";
import {
  OrderProducts,
  OrderProductStore,
} from "../models/order_productsmodel";
const store = new OrderProductStore();

const testOrderProduct: OrderProducts = {
  order_id: 3,
  product_id: 1,
  quantity: 15,
  user_id: 1,
};

describe("OrderProducts Handler", () => {
  it("should return 200 for endpoint /orderproducts", async () => {
    const response = await request(app).get("/orderproducts");
    expect(response.statusCode).toBe(200);
  });
  it("should return a order_product with the given id", async () => {
    const orderProduct = await store.create(testOrderProduct);
    const response = await request(app).get(
      `/orderproducts/${orderProduct.id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.order_id).toBe(orderProduct.order_id);
    expect(response.body.quantity).toBe(orderProduct.quantity);
  });
  it("index method should return a list of orderproducts", async () => {
    const response = await request(app).get("/orderproducts");
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should create a new product", async () => {
    const response = await request(app)
      .post("/orderproducts")
      //sending the test product and the token
      .send(testOrderProduct);
    expect(response.status).toBe(200);
    expect(response.body.order_id).toBe(testOrderProduct.order_id);
    expect(response.body.product_id).toBe(testOrderProduct.product_id);
  });
});
