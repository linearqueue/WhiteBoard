import CanvasModel from "../models/canvasModel.js";

const getAllCanvases = async (req, res) => {
  try {
    const email = req.email;
    const canvases = await CanvasModel.getAllCanvas(email);
    res.status(200).json(canvases);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createCanvas = async (req, res) => {
  try {
    const email = req.email;

    const { name } = req.body;
    const newCanvas = await CanvasModel.createCanvas(email, name);
    res.status(200).json(newCanvas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loadCanvas = async (req, res) => {
  try {
    const email = req.email;
    const { id } = req.params;
    const canvas = await CanvasModel.loadCanvas(email, id);
    res.status(200).json(canvas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCanvas = async (req, res) => {
  try {
    const email = req.email;
    const id = req.params.id;
    const { elements } = req.body;

    const canvas = await CanvasModel.updateCanvas(email, id, elements);

    res.status(200).json(canvas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getAllCanvases, createCanvas, loadCanvas, updateCanvas };
