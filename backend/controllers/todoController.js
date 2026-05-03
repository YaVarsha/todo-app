import Todo from "../models/TodoList.js";

// ✅ CREATE
export const createTodo = async (req, res, next) => {
  try {
    const { task } = req.body;

    if (!task || task.trim() === "") {
      const error = new Error("Task required");
      error.status = 400;
      return next(error); // ✅ pass to global handler
    }

    const newTodo = new Todo({
      task,
      completed: false,
    });

    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);
  } catch (err) {
    next(err); // ✅ IMPORTANT
  }
};

// ✅ READ
export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

// ✅ UPDATE
export const updateTodo = async (req, res, next) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      const error = new Error("Todo not found");
      error.status = 404;
      return next(error);
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE
export const deleteTodo = async (req, res, next) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);

    if (!deleted) {
      const error = new Error("Todo not found");
      error.status = 404;
      return next(error);
    }

    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};