import { OrderProducts, OrderProductStore } from "../models/order_productsmodel";

const store = new OrderProductStore();

const testOrderProduct:OrderProducts = {
    order_id: 1,
    product_id: 1,
    quantity: 10,
    user_id: 1
} 

export const productsSuite = describe("Order_Products Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("create method should add a orderProduct", async () => {
    const result = await store.create(testOrderProduct);
    expect(result).toEqual({
      id: jasmine.any(Number),
      order_id: result.order_id,
      product_id: result.product_id,
      quantity: result.quantity,
      user_id: result.user_id
    });
  });
  it("index method should return a list of orderProducts", async () => {
    const result: OrderProducts[] = await store.index();
    expect(result).toEqual([
      {
        id: jasmine.any(Number),
        order_id: 1,
        product_id: 1,
        quantity: 10,
        user_id: 1
      },
    ]);
  });
  it("show method should return the correct OrderProduct", async () => {
    const createdOrderProduct = await store.create(testOrderProduct);
    if(!createdOrderProduct.id) {
        throw new Error("Failed to create OrderProduct");
    }
    const result: OrderProducts = await store.show(createdOrderProduct.id.toString());
    expect(result.order_id).toEqual(createdOrderProduct.order_id);
    expect(result.product_id).toEqual(createdOrderProduct.product_id);
    expect(result.quantity).toEqual(createdOrderProduct.quantity);
    expect(result.user_id).toEqual(createdOrderProduct.user_id);
  });
});
