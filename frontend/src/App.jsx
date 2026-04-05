import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return alert("Enter task");

    await axios.post("http://localhost:5000/todos", { task });
    setTask("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  const updateTodo = async (id) => {
    const newTask = prompt("Edit task:");
    if (!newTask) return;

    await axios.put(`http://localhost:5000/todos/${id}`, {
      task: newTask,
    });
    fetchTodos();
  };

  const toggleComplete = async (id, completed) => {
    await axios.put(`http://localhost:5000/todos/${id}`, {
      completed: !completed,
    });
    fetchTodos();
  };

  return (
    <div className="container">
      <h1 className="title">Todo App</h1>

      <div className="inputBox">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todoList">
        {todos.map((t) => (
          <div className="todoItem" key={t._id}>
            <div className="left">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleComplete(t._id, t.completed)}
              />

              <span className={t.completed ? "completed" : ""}>
                {t.task}
              </span>
            </div>

            <div className="actions">
              <button onClick={() => updateTodo(t._id)}>Edit</button>
              <button onClick={() => deleteTodo(t._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;