import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/ordersmodel";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  //responses with a json object
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getOrderByUser = async (req: Request, res: Response) => {
  //casting the string with the help of parseInt to make it an integer
  const userId = parseInt(req.params.user_id);
  const orders = await store.getOrderByUser(userId);
  res.json(orders);
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", create);
  app.get("users/:id/orders", getOrderByUser);
};

export default orderRoutes;
