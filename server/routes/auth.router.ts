import { Router } from "express";
import {
  authUser,
  registerUser,
  logoutUser,
} from "../controllers/auth.controller";

const authRouter = Router();
authRouter.post("/login", authUser);
authRouter.post("/register", registerUser);
authRouter.post("/logout", logoutUser);

export default authRouter;
