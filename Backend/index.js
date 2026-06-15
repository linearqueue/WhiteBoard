import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./Database/connectDB.js";
import userRouter from "./Routes/userRoute.js";
import canvasRouter from "./Routes/canvasRoute.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/canvas", canvasRouter);

app.get("/", (req, res) => {
  res.send("Working Fine");
});

connectDB(app);
