import express from "express";
import { UserController } from "../controllers/user.controller";
import { preferenceService, userService } from "../services";

export const userRouter = express.Router();

export const userController = new UserController(
  userService,
  preferenceService
);

userRouter.post("/signup", userController.register);
userRouter.post("/signin", userController.checkLogin);
userRouter.post("/logout", userController.logout);
userRouter.get("/username", userController.getUsername);
