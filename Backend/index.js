import express from "express";
import "dotenv/config";
import connectDB from "./Database/connectDB.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working Fine");
});

connectDB(app);
