const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── In-Memory Data Store ─────────────────────────────────────────────────────
let tasks = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Learn Express", completed: true },
];
let nextId = 3;

// ─── Helper ───────────────────────────────────────────────────────────────────
const findTask = (id) => tasks.find((t) => t.id === parseInt(id));

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /tasks — return all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// POST /tasks — create a new task
app.post("/tasks", (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({ error: "Task text is required and cannot be empty." });
  }

  const newTask = {
    id: nextId++,
    text: text.trim(),
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE /tasks/:id — delete a task by id
app.delete("/tasks/:id", (req, res) => {
  const task = findTask(req.params.id);

  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found.` });
  }

  tasks = tasks.filter((t) => t.id !== task.id);
  res.status(200).json({ message: "Task deleted" });
});

// PUT /tasks/:id — toggle or update a task
app.put("/tasks/:id", (req, res) => {
  const task = findTask(req.params.id);

  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found.` });
  }

  const { completed, text } = req.body;

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "'completed' must be a boolean." });
    }
    task.completed = completed;
  }

  if (text !== undefined) {
    if (typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ error: "Task text cannot be empty." });
    }
    task.text = text.trim();
  }

  res.status(200).json(task);
});

// ─── 404 Catch-All ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error." });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Todo API running at http://localhost:${PORT}`);
  console.log(`    GET    /tasks`);
  console.log(`    POST   /tasks`);
  console.log(`    PUT    /tasks/:id`);
  console.log(`    DELETE /tasks/:id`);
});
