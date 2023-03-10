import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productRoutes from "./handlers/productshandler";
import usersRoutes from "./handlers/usershandler";
import orderRoutes from "./handlers/ordershandler";
import orderProductRoutes from "./handlers/order_productshandler";

const app: express.Application = express();
const address = "0.0.0.0:3000";

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

productRoutes(app);
usersRoutes(app);
orderRoutes(app);
orderProductRoutes(app);

app.get(
  "/test-cors",
  cors(corsOptions),
  function (_req: express.Request, res: express.Response) {
    res.json({ msg: "This is CORS-enabled with a middleware" });
  }
);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
