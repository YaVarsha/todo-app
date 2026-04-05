import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    if (!req.body.task) {
      return res.status(400).json({ error: "Task required" });
    }

    const todo = await Todo.create(req.body);
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ (latest first)
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE (task + completed)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;