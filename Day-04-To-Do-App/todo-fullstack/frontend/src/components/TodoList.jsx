import { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../services/api";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const FILTERS = ["All", "Active", "Completed"];

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // ─── Fetch on mount with AbortController cleanup ───────────────────────────
  useEffect(() => {
    const controller = new AbortController();

    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTasks(controller.signal);
        setTasks(data);
      } catch (err) {
        if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
          setError(err.response?.data?.error ?? "Failed to load tasks. Is the backend running?");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    return () => controller.abort();
  }, []);

  // ─── Add ──────────────────────────────────────────────────────────────────
  const handleAdd = useCallback(async (text) => {
    setError(null);
    try {
      const created = await createTask(text);
      setTasks((prev) => [...prev, created]);
    } catch (err) {
      const msg = err.response?.data?.error ?? "Failed to add task.";
      setError(msg);
      throw err; // let AddTodo know it failed (so it keeps the text)
    }
  }, []);

  // ─── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = useCallback(async (id) => {
    setError(null);
    // Optimistic update
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteTask(id);
    } catch (err) {
      setError(err.response?.data?.error ?? "Failed to delete task.");
      // Re-fetch to restore consistent state on failure
      try {
        const data = await getTasks();
        setTasks(data);
      } catch {
        /* ignore secondary fetch error */
      }
    }
  }, []);

  // ─── Toggle ───────────────────────────────────────────────────────────────
  const handleToggle = useCallback(async (id, completed) => {
    setError(null);
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t))
    );
    try {
      await updateTask(id, { completed });
    } catch (err) {
      setError(err.response?.data?.error ?? "Failed to update task.");
      try {
        const data = await getTasks();
        setTasks(data);
      } catch {
        /* ignore */
      }
    }
  }, []);

  // ─── Clear completed ──────────────────────────────────────────────────────
  const handleClearCompleted = useCallback(async () => {
    const completed = tasks.filter((t) => t.completed);
    setError(null);
    setTasks((prev) => prev.filter((t) => !t.completed));
    try {
      await Promise.all(completed.map((t) => deleteTask(t.id)));
    } catch (err) {
      setError("Some tasks could not be deleted.");
      try {
        const data = await getTasks();
        setTasks(data);
      } catch {
        /* ignore */
      }
    }
  }, [tasks]);

  // ─── Derived data ─────────────────────────────────────────────────────────
  const filtered = tasks
    .filter((t) => {
      if (filter === "Active") return !t.completed;
      if (filter === "Completed") return t.completed;
      return true;
    })
    .filter((t) =>
      search.trim() === "" ? true : t.text.toLowerCase().includes(search.toLowerCase())
    );

  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = total - completedCount;
  const hasCompleted = completedCount > 0;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="todo-list">
      <AddTodo onAdd={handleAdd} disabled={loading} />

      {/* Search */}
      <div className="todo-list__search">
        <input
          className="search__input"
          type="search"
          placeholder="Search tasks…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search tasks"
        />
      </div>

      {/* Counters */}
      {total > 0 && (
        <div className="todo-list__stats">
          <span className="stat">
            <strong>{total}</strong> total
          </span>
          <span className="stat stat--active">
            <strong>{activeCount}</strong> active
          </span>
          <span className="stat stat--done">
            <strong>{completedCount}</strong> done
          </span>
        </div>
      )}

      {/* Filter tabs */}
      <div className="todo-list__filters" role="tablist" aria-label="Filter tasks">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            className={`filter-btn${filter === f ? " filter-btn--active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}

      {/* Loading */}
      {loading && <Loader />}

      {/* Task list */}
      {!loading && (
        <>
          {filtered.length === 0 ? (
            <div className="todo-list__empty">
              {search
                ? `No tasks match "${search}"`
                : filter === "All"
                ? "No tasks yet — add one above!"
                : `No ${filter.toLowerCase()} tasks.`}
            </div>
          ) : (
            <ul className="todo-list__items" aria-label="Task list">
              {filtered.map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                />
              ))}
            </ul>
          )}

          {hasCompleted && (
            <button
              className="btn btn--ghost todo-list__clear"
              onClick={handleClearCompleted}
            >
              Clear completed ({completedCount})
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TodoList;
