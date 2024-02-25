import express, { Request, Response, Express } from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user.router";

const app: Express = express();
const port = process.env.Port || 5173;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ Message: "Welcome back Neo 🔫" });
});

app.listen(port, () => {
  console.log(`Application started on http://localhost:${port}`);
});
