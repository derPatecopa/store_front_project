import express, { Request, Response } from "express";
import { User, UserStore } from "../models/usersmodel";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as Secret
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const { user_name, password } = req.body;
    const user = await store.authenticate(user_name, password);

    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET as Secret);
    res.json(token);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  //console.log(product);
  res.json(user);
};

const usersRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.post("/users", create);
  app.get("/users/:id", show);
  app.post("/authenticate", authenticate);
};

export default usersRoutes;
