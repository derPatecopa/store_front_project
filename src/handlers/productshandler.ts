import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/productsmodel";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  //responses with a json object
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  //console.log(product);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    jwt.verify(req.body.token, process.env.TOKEN_SECRET as Secret);
  } catch (err) {
    res.status(401);
    res.json(`Invalid token ${err}`);
    return;
  }
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
};

export default productRoutes;
