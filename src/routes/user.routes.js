import express from "express";
import userController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);

export default userRouter;
