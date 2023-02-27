import Client from "../database";
import dotenv from "dotenv";


dotenv.config();

export type OrderProducts = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
  user_id: number;
};

const defaultOrderProducts: OrderProducts = {
  id: 0,
  order_id: 0,
  product_id: 0,
  quantity: 0,
  user_id: 0,
};

export class OrderProductStore {
  async index(): Promise<OrderProducts[]> {
    if (Client) {
      try {
        const conn = await Client.connect();
        const sql = "SELECT * FROM order_products";
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
      } catch (err) {
        throw new Error(`Could not get order_products. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return [];
    }
  }

  async show(id: string): Promise<OrderProducts> {
    if (Client) {
      try {
        const sql = "SELECT * FROM order_products WHERE id=($1)";

        const conn = await Client.connect();
        const result = await conn.query(sql, [id]);

        conn.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return defaultOrderProducts;
    }
  }

  async create(o: OrderProducts): Promise<OrderProducts> {
    if (Client) {
      try {
        const conn = await Client.connect();
        const sql =
          "INSERT INTO order_products (order_id, product_id, quantity, user_id) VALUES ($1, $2, $3, $4) RETURNING *";
        const result = await conn.query(sql, [
         o.order_id,
         o.product_id,
         o.quantity,
         o.user_id
        ]);
        const order = result.rows[0];
        conn.release();
        return order;
      } catch (err) {
        throw new Error(`Could not add new order. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return defaultOrderProducts;
    }
  }
}
