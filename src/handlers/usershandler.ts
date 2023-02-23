import express, { Request, Response } from "express";
import { User, UserStore } from "../models/usersmodel";

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
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
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
};

export default usersRoutes;
