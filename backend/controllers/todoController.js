import Todo from "../models/TodoList.js";

// ✅ CREATE
export const createTodo = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body); // 🔍 DEBUG

    const { task } = req.body;

    if (!task || task.trim() === "") {
      return res.status(400).json({ error: "Task required" });
    }

    const newTodo = new Todo({
      task: task,
      completed: false,
    });

    const savedTodo = await newTodo.save(); // ✅ FORCE SAVE

    console.log("SAVED TODO:", savedTodo); // 🔍 DEBUG

    res.status(201).json(savedTodo);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ READ
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    console.log("FETCH TODOS:", todos); // 🔍 DEBUG

    res.json(todos);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE
export const updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    console.log("UPDATED TODO:", updated); // 🔍 DEBUG

    res.json(updated);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE
export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    console.log("DELETED ID:", req.params.id); // 🔍 DEBUG

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};