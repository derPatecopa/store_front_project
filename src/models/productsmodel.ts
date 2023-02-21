import Client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
};

const defaultProduct: Product = {
  id: 0,
  name: "",
  price: 0,
};

export class ProductStore {
  async index(): Promise<Product[]> {
    if (Client) {
      try {
        const conn = await Client.connect();
        const sql = "SELECT * FROM products";
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
      } catch (err) {
        throw new Error(`Could not get products. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return [];
    }
  }
  async show(id: string): Promise<Product> {
    if (Client) {
      try {
        const sql = "SELECT * FROM products WHERE id=($1)";

        const conn = await Client.connect();
        const result = await conn.query(sql, [id]);

        conn.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return defaultProduct;
    }
  }
  async create(p: Product): Promise<Product> {
    if (Client) {
      try {
        const sql =
          "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";

        const conn = await Client.connect();

        const result = await conn.query(sql, [p.name, p.price]);
        const product = result.rows[0];

        conn.release();
        return product;
      } catch (err) {
        throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return defaultProduct;
    }
  }
}
