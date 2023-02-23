import request from "supertest";
import app from "../server";
import {Order, OrderStore} from "../models/ordersmodel";

const store = new OrderStore();

const testOrder: Order = {
    product_id: 1,
    quantity: 20,
    user_id: 1
}

describe("Orders Handler", () => {
    it("should return 200 for endpoint /orders", async () => {
      const response = await request(app).get("/orders");
      expect(response.statusCode).toBe(200);
    });
    it("index method should return a list of orders", async () => {
        const response = await request(app).get("/orders");
        expect(response.body.length).toBeGreaterThan(0);
      });
      it("orderByUser method should return a order with the given id", async () => {
        const order = await store.create(testOrder);
        const orders: Order[] = await store.getOrderByUser(testOrder.user_id);

        expect(orders).toContain(order);
      });
      it("create method should add a order to the orders table", async () => {
        const createdOrder = await store.create(testOrder);
        expect(createdOrder).toEqual({
            id: jasmine.any(Number),
            product_id: testOrder.product_id,
            quantity: testOrder.quantity,
            user_id: testOrder.user_id
        })
      })
      it("index method should return a order with the given id", async()=>{
        const result:Order = await store.show("1");
        expect(result).toEqual({
            id: 1,
            product_id: jasmine.any(Number),
            quantity: jasmine.any(Number),
            user_id: jasmine.any(Number)
        })
    })
})