import axios from "axios";

const BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Fetch all tasks from the server.
 * Accepts an optional AbortSignal for cancellation.
 */
export const getTasks = (signal) =>
  api.get("/tasks", { signal }).then((res) => res.data);

/**
 * Create a new task with the given text.
 */
export const createTask = (text) =>
  api.post("/tasks", { text }).then((res) => res.data);

/**
 * Delete a task by its id.
 */
export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`).then((res) => res.data);

/**
 * Update a task's fields (e.g. toggle 'completed').
 */
export const updateTask = (id, updates) =>
  api.put(`/tasks/${id}`, updates).then((res) => res.data);
