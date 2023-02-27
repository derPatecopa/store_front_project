import request from "supertest";
import app from "../server";
import { Order, OrderStore } from "../models/ordersmodel";
import jwt, { Secret } from "jsonwebtoken";

const store = new OrderStore();

const testOrder: Order = {
  product_id: 1,
  quantity: 20,
  user_id: 1,
};

describe("Orders Handler", () => {
  it("should return 200 for endpoint /orders", async () => {
    const response = await request(app).get("/orders");
    expect(response.statusCode).toBe(200);
  });
  it("index method should return a list of orders", async () => {
    const response = await request(app).get("/orders");
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("create method should add a order to the orders table", async () => {
    const createdOrder = await store.create(testOrder);
    expect(createdOrder).toEqual({
      id: jasmine.any(Number),
      product_id: testOrder.product_id,
      quantity: testOrder.quantity,
      user_id: testOrder.user_id,
      order_status: "active",
    });
  });
  it("orderByUser method should return a order with the given id", async () => {
    const token = jwt.sign({ userId: 1 }, process.env.TOKEN_SECRET as Secret);
    const response = await request(app).get("/users/1/orders").send({ token });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
  it("index method should return a order with the given id", async () => {
    const result: Order = await store.show("1");
    expect(result).toEqual({
      id: 1,
      product_id: jasmine.any(Number),
      quantity: jasmine.any(Number),
      user_id: jasmine.any(Number),
      order_status: "active",
    });
  });
});
