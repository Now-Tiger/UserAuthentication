import { Router } from "express";
import { authUser } from "../controllers/auth.controller";

const authRouter = Router();
authRouter.get("/login", authUser);

export default authRouter;
