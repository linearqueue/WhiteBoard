import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;
