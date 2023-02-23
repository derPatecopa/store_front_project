import { Order, OrderStore } from "../models/ordersmodel";

const store = new OrderStore();
const testOrder: Order = {
  product_id: 1,
  quantity: 5,
  user_id: 1,
};

export const ordersSuite = describe("Orders Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("should have a getOrderByUser method", () => {
    expect(store.getOrderByUser).toBeDefined();
  });
  it("create method should add an order", async () => {
    const result = await store.create(testOrder);
    expect(result.product_id).toEqual(testOrder.product_id);
    expect(result.quantity).toEqual(testOrder.quantity);
    expect(result.user_id).toEqual(testOrder.user_id);
  });
  it("index method should return a list of orders", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].product_id).toEqual(testOrder.product_id);
    expect(result[0].quantity).toEqual(testOrder.quantity);
    expect(result[0].user_id).toEqual(testOrder.user_id);
  });
  it("show method should return the correct order", async () => {
    const createdOrder = await store.create(testOrder);
    if (!createdOrder.id) {
      throw new Error("Failed to create order");
    }
    const result = await store.show(createdOrder.id.toString());
    expect(result.product_id).toEqual(testOrder.product_id);
    expect(result.quantity).toEqual(testOrder.quantity);
    expect(result.user_id).toEqual(testOrder.user_id);
  });
  it("getOrderByUser method should return a list of orders for a user", async () => {
    const createdOrder = await store.create(testOrder);
    const result = await store.getOrderByUser(createdOrder.user_id);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].product_id).toEqual(testOrder.product_id);
    expect(result[0].quantity).toEqual(testOrder.quantity);
    expect(result[0].user_id).toEqual(testOrder.user_id);
  });
});
