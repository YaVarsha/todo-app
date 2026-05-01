function TodoInput({ task, setTask, addTodo }) {
  return (
    <div className="inputBox">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task..."
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default TodoInput;