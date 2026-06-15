import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createCanvas,
  getAllCanvases,
  loadCanvas,
  updateCanvas,
} from "../Controllers/canvasController.js";
const canvasRouter = express.Router();

canvasRouter.get("/", authMiddleware, getAllCanvases);
canvasRouter.post("/", authMiddleware, createCanvas);
canvasRouter.get("/load/:id", authMiddleware, loadCanvas);

canvasRouter.put("/:id", authMiddleware, updateCanvas);

export default canvasRouter;
