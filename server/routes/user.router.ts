import { Router } from "express";
import { getUsers, createUser, deleteUser } from "../controllers/user.controller";

const userRouter = Router();
userRouter.get("/users", getUsers);
userRouter.post("/register", createUser);
userRouter.delete("/delete", deleteUser);


export default userRouter;