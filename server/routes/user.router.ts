import { Router } from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller";

const userRouter = Router();
userRouter.get("/users", getUsers);
userRouter.post("/register", createUser);
userRouter.put("/update", updateUser);
userRouter.delete("/delete", deleteUser);

export default userRouter;
