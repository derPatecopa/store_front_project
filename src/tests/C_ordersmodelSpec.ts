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
});

