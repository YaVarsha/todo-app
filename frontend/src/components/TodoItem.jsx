function TodoItem({ todo, deleteTodo, openEditModal, toggleComplete }) {
  return (
    <div className="todoItem">
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo._id, todo.completed)}
        />

        <span className={todo.completed ? "completed" : ""}>
          {todo.task}
        </span>
      </div>

      <div className="actions">
        <button onClick={() => openEditModal(todo)}>Edit</button>
        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
      </div>
    </div>
  );
}

export default TodoItem;