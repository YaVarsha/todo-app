import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  removeTodo,
  updateTodoApi,
} from "../services/todoService.js";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ NEW STATES (IMPORTANT)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ FETCH TODOS
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await getTodos();

      setTodos([...res.data]);
      setError("");
    } catch (error) {
      console.error("FETCH ERROR:", error);
      setError("Error fetching todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ ADD TODO
  const addTodo = async () => {
    try {
      // ❗ VALIDATION
      if (task.trim() === "") {
        setError("Please enter a task");
        return;
      }

      const res = await createTodo({ task });

      setTask("");
      setError("");
      setSuccess("Task added successfully ✅");

      await fetchTodos();
    } catch (error) {
      console.error("CREATE ERROR:", error);
      setError("Failed to add task");
    }
  };

  // ✅ DELETE TODO
  const deleteTodo = async (id) => {
    try {
      await removeTodo(id);

      setSuccess("Task deleted ✅");
      setError("");

      await fetchTodos();
    } catch (error) {
      console.error("DELETE ERROR:", error);
      setError("Failed to delete task");
    }
  };

  // ✅ UPDATE TODO
  const updateTodo = async (id, data) => {
    try {
      await updateTodoApi(id, data);

      setSuccess("Task updated ✅");
      setError("");

      await fetchTodos();
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      setError("Failed to update task");
    }
  };

  return {
    todos,
    task,
    setTask,
    addTodo,
    deleteTodo,
    updateTodo,
    loading,
    error,     // ✅ expose error
    success,   // ✅ expose success
  };
};