import { Router } from "express";
import {
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/user.controller";

const userRouter = Router();
userRouter.get("/users", getUsers);
userRouter.put("/update", updateUser);
userRouter.delete("/delete", deleteUser);

export default userRouter;
