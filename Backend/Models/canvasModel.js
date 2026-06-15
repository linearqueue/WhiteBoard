import mongoose from "mongoose";

const canvasSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    elements: {
      type: Array,
      default: [],
    },
    shared_with: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

// get all the canvases for both owner and shared
canvasSchema.statics.getAllCanvas = async function (email) {
  const user = await mongoose.model("Users").findOne({ email });
  if (!user) throw new Error("No user found");

  const userObjectId = user._id;
  const searchCriteria = {
    $or: [{ owner: userObjectId }, { shared_with: userObjectId }],
  };

  const canvases = await this.find(searchCriteria);

  return canvases;
};

// create a canvas for a user with the given email
canvasSchema.statics.createCanvas = async function (email, name) {
  try {
    const user = await mongoose.model("Users").findOne({ email });
    if (!user) throw new Error("No user found");

    const canvas = new this({
      owner: user._id,
      name,
      elements: [],
      shared_with: [],
    });

    const newCanvas = await canvas.save();
    return newCanvas;
  } catch (error) {
    return Error("Error creating canvas");
  }
};

canvasSchema.statics.loadCanvas = async function (email, id) {
  const user = await mongoose.model("Users").findOne({ email });
  if (!user) throw new Error("User not found");

  const canvas = await this.findOne({
    _id: id,
    $or: [{ owner: user._id }, { shared_with: user._id }],
  });

  if (!canvas) {
    throw new Error(
      "Canvas not found or you do not have permission to view it",
    );
  }
  return canvas;
};

canvasSchema.statics.updateCanvas = async function (email, id, elements) {
  try {
    const user = await mongoose.model("Users").findOne({ email });
    if (!user) throw new Error("User not found");

    const canvas = await this.findOne({
      _id: id,
      $or: [{ owner: user._id }, { shared_with: user._id }],
    });

    if (!canvas) throw new Error("Canvas not found");

    canvas.elements = elements;

    canvas.markModified("elements");

    const updatedCanvas = await canvas.save();
    return updatedCanvas;
  } catch (error) {
    console.error("Database Update Failed:", error);

    throw error;
  }
};

const CanvasModel = mongoose.model("Canvas", canvasSchema);
export default CanvasModel;
