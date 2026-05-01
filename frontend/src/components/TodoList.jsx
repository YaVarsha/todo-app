import React from "react";
import TodoItem from "./TodoItem.jsx";

function TodoList({ todos = [], deleteTodo, openEditModal, toggleComplete }) {
  if (!todos.length) {
    return <p>No tasks available</p>;
  }

  return (
    <div className="todoList">
      {todos.map((t) => (
        <TodoItem
          key={t._id}
          todo={t}
          deleteTodo={deleteTodo}
          openEditModal={openEditModal}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default TodoList;