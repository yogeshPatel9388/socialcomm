import express from "express";
import Idea from "../models/Idea.js";

const router = express.Router();

// GET all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ upvotes: -1 });
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new idea
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newIdea = new Idea({ title, description });
    await newIdea.save();
    res.status(201).json(newIdea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH upvote
router.patch("/:id/upvote", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    idea.upvotes += 1;
    await idea.save();
    res.json(idea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST comment
router.post("/:id/comment", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    const { text } = req.body;
    idea.comments.push({ text });
    await idea.save();
    res.json(idea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
