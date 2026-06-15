import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userModel.register(name, email, password);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.login(email, password);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Authorization token required.");

    const token = authorization.split(" ")[1];
    const decodedPayload = jwt.verify(token, JWT_SECRET);

    const user = await userModel
      .findById(decodedPayload._id)
      .select("-password");

    if (!user) throw new Error("User not found.");

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({
      message: "Access denied",
      error: error.message,
    });
  }
};

export default getUserProfile;
export { registerUser, loginUser, getUserProfile };
