import React, { useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem.jsx";
import EditModal from "./components/EditModal.jsx";
import DeleteModal from "./components/DeleteModal.jsx";
import { useTodos } from "./hooks/useTodos.js";

function App() {
  const {
    todos,
    task,
    setTask,
    addTodo,
    deleteTodo,
    updateTodo,
    error,
    success,
  } = useTodos();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // ✅ Toggle Complete
  const toggleComplete = (id, completed) => {
    updateTodo(id, { completed: !completed });
  };

  // ✅ Edit
  const handleEditClick = (todo) => {
    setCurrentTask(todo);
    setIsEditOpen(true);
  };

  const handleSaveEdit = (updatedText) => {
    if (!currentTask) return;

    if (!updatedText.trim()) {
      return; // optional: you can also set error here if needed
    }

    updateTodo(currentTask._id, { task: updatedText });
    setIsEditOpen(false);
    setCurrentTask(null);
  };

  // ✅ Delete
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedId) return;

    deleteTodo(selectedId);
    setIsDeleteOpen(false);
    setSelectedId(null);
  };

  return (
    <div className="container">
      <h2 className="title">Todo App</h2>

      {/* ✅ INPUT */}
      <div className="inputBox">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <button onClick={addTodo}>
          Add
        </button>
      </div>

      {/* ✅ ERROR & SUCCESS MESSAGE */}
      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}

      {/* ✅ TODO LIST */}
      <div className="todoList">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            toggleComplete={toggleComplete}
            openEditModal={handleEditClick}
            deleteTodo={handleDeleteClick}
          />
        ))}
      </div>

      {/* ✅ EDIT MODAL */}
      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveEdit}
        currentTask={currentTask}
      />

      {/* ✅ DELETE MODAL */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default App;