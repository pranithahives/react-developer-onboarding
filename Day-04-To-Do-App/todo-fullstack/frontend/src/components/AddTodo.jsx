import { useState } from "react";

const AddTodo = ({ onAdd, disabled }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const trimmed = text.trim();

    if (!trimmed) {
      setError("Task text cannot be empty.");
      return;
    }

    setError("");

    try {
      await onAdd(trimmed);
      setText("");
    } catch {}
  };

  return (
    <div className="add-todo">
      <div className="add-todo__row">
        <input
          className={`add-todo__input${
            error ? " add-todo__input--error" : ""
          }`}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
          placeholder="What needs to be done?"
          disabled={disabled}
        />

        <button
          className="btn btn--primary"
          onClick={handleSubmit}
          disabled={disabled}
        >
          Add Task
        </button>
      </div>

      {error && (
        <p className="add-todo__error">
          {error}
        </p>
      )}
    </div>
  );
};

export default AddTodo;