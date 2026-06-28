const TodoItem = ({ task, onDelete, onToggle }) => {
  const { id, text, completed } = task;

  return (
    <li
      className={`todo-item${
        completed ? " todo-item--completed" : ""
      }`}
    >
      <label className="todo-item__label">
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={completed}
          onChange={() =>
            onToggle(id, !completed)
          }
        />

        <span className="todo-item__check-icon">
          {completed ? "✓" : ""}
        </span>

        <span className="todo-item__text">
          {text}
        </span>
      </label>

      <button
        className="btn btn--danger"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;