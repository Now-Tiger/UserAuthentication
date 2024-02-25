import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.Port || 5173;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ Message: "Welcome back Neo 🔫" });
});

app.listen(port, () => {
  console.log(`Application started on http://localhost:${port}`);
});
