import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3030;

async function connectDB(app) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  }
}

export default connectDB;
