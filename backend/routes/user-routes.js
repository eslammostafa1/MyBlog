import express from "express";
import { getUsers, login, signup } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
export default userRouter;
