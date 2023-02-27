import Client from "../database";
import dotenv from "dotenv";

dotenv.config();

export type Order = {
  id?: number;
  product_id: number;
  quantity: number;
  user_id: number;
  order_status?: string;
};

const defaultOrder = {
  id: 0,
  product_id: 0,
  quantity: 0,
  user_id: 0,
  order_status: "active",
};

export class OrderStore {
  async index(): Promise<Order[]> {
    if (Client) {
      try {
        const conn = await Client.connect();
        const sql = "SELECT * FROM orders";
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
      } catch (err) {
        throw new Error(`Could not get orders. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return [];
    }
  }

  async show(id: string): Promise<Order> {
    if (Client) {
      try {
        const sql = "SELECT * FROM orders WHERE id=($1)";

        const conn = await Client.connect();
        const result = await conn.query(sql, [id]);

        conn.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return defaultOrder;
    }
  }

  async create(o: Order): Promise<Order> {
    if (Client) {
      try {
        const conn = await Client.connect();
        const sql =
          "INSERT INTO orders (product_id, quantity, user_id) VALUES ($1, $2, $3) RETURNING *";
        const result = await conn.query(sql, [
          o.product_id,
          o.quantity,
          o.user_id,
        ]);
        const order = result.rows[0];
        conn.release();
        return order;
      } catch (err) {
        throw new Error(`Could not add new order. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return defaultOrder;
    }
  }

  async getOrderByUser(user_Id: string): Promise<Order[]> {
    if (Client) {
      try {
        const conn = await Client.connect();
        const sql = "SELECT * FROM orders WHERE user_id=($1)";
        const result = await conn.query(sql, [user_Id.toString()]);
        conn.release();
        return result.rows;
      } catch (err) {
        throw new Error(
          `Could not get orders for user ${user_Id}. Error: ${err}`
        );
      }
    } else {
      console.log("Client is falsy");
      return [];
    }
  }
}
