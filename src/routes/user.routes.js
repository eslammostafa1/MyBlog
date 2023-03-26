import express from "express";
import {
  getUsers, getUserById, login, signup,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/signup", signup);
userRouter.post("/login", login);

export default userRouter;
