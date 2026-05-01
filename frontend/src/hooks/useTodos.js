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

  // ✅ FETCH TODOS
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await getTodos();

      console.log("FETCH DATA:", res.data); // 🔍 DEBUG

      setTodos([...res.data]); // ✅ force re-render
    } catch (error) {
      console.error("FETCH ERROR:", error);
      alert("Error fetching todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ ADD TODO (UPDATED WITH DEBUG)
  const addTodo = async () => {
    try {
      if (!task.trim()) return alert("Enter task");

      console.log("SENDING TASK:", task); // 🔍 DEBUG

      const res = await createTodo({ task });

      console.log("CREATE RESPONSE:", res.data); // 🔍 DEBUG

      setTask("");

      await fetchTodos(); // ✅ important
    } catch (error) {
      console.error("CREATE ERROR:", error); // 🔥 IMPORTANT
      alert("Failed to add task");
    }
  };

  // ✅ DELETE TODO
  const deleteTodo = async (id) => {
    try {
      console.log("DELETE ID:", id); // 🔍 DEBUG

      await removeTodo(id);

      await fetchTodos();
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert("Failed to delete task");
    }
  };

  // ✅ UPDATE TODO
  const updateTodo = async (id, data) => {
    try {
      console.log("UPDATE:", id, data); // 🔍 DEBUG

      await updateTodoApi(id, data);

      await fetchTodos();
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      alert("Failed to update");
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
  };
};