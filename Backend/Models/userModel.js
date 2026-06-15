import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  },
);

userSchema.statics.register = async function (name, email, password) {
  try {
    if (!name || !email || !password)
      throw new Error("All fields must be filled.");

    if (!validator.isEmail(email))
      throw new Error("Please provide a valid email address.");

    if (!validator.isStrongPassword(password))
      throw new Error("Password is not strong enough.");

    const exists = await this.findOne({ email });
    if (exists) throw new Error("Email already in use.");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new this({ name, email, password: hashedPassword });
    const newUser = await user.save();

    return newUser;
  } catch (error) {
    throw new Error(`Error Registration in: ${error.message}`);
  }
};

userSchema.statics.login = async function (email, password) {
  try {
    if (!validator.isEmail(email))
      throw new Error("Please provide a valid email address.");

    const user = await this.findOne({ email });
    if (!user) throw new Error("Invalid Email or Password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Email or Password");

    const payload = { _id: user._id, email: user.email };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "3d",
    });

    return {
      token,
      email: user.email,
      name: user.name,
    };
  } catch (error) {
    throw new Error(`Error logging in: ${error.message}`);
  }
};

userSchema.statics.getUser = async function (email) {
  try {
    if (!validator.isEmail(email))
      throw new Error("Please provide a valid email address.");

    const user = await this.findOne({ email });
    if (!user) throw new Error("User not Found");
    return user;
  } catch (error) {
    throw new Error(`Error in getting the user: ${error.message}`);
  }
};

const userModel = mongoose.model("Users", userSchema);

export default userModel;
