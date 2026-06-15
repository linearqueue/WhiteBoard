import express from "express";
import "dotenv/config";
import connectDB from "./Database/connectDB.js";
import userRouter from "./Routes/userRoute.js";
const app = express();

app.use(express.json());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Working Fine");
});

connectDB(app);
