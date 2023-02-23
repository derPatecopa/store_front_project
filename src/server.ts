import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app: express.Application = express();
const address = "0.0.0.0:3000";

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.get('/test-cors', cors(corsOptions), function (_req:express.Request, res:express.Response, next: express.NextFunction){
  res.json({msg: 'This is CORS-enabled with a middleware'});
})
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
