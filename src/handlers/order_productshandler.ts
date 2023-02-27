import express, { Request, Response } from "express";
import {
  OrderProducts,
  OrderProductStore,
} from "../models/order_productsmodel";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const store = new OrderProductStore();

const index = async (_req: Request, res: Response) => {
  const order_products = await store.index();
  //responses with a json object
  res.json(order_products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  //console.log(product);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  //   try {
  //     jwt.verify(req.body.token, process.env.TOKEN_SECRET as Secret);
  //   } catch (err) {
  //     res.status(401);
  //     res.json(`Invalid token ${err}`);
  //     return;
  //   }
  try {
    const orderProduct: OrderProducts = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
    };
    const neworderProduct = await store.create(orderProduct);
    res.json(neworderProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderProductRoutes = (app: express.Application) => {
  app.get("/orderproducts", index);
  app.get("/orderproducts/:id", show);
  app.post("/orderproducts", create);
};

export default orderProductRoutes;
