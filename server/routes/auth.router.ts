import { Router } from "express";
import { authUser, registerUser } from "../controllers/auth.controller";

const authRouter = Router();
authRouter.post("/login", authUser);
authRouter.post("/register", registerUser);

export default authRouter;
