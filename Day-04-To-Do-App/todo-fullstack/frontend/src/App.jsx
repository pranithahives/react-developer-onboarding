import TodoList from "./components/TodoList";

const App = () => (
  <div className="app">
  <h1>Todo App</h1>

    <main className="app__main">
      <TodoList />
    </main>

    <footer className="app__footer">
      <p>
        API running at{" "}
        <code>
          <a
            href="http://localhost:3001/tasks"
            target="_blank"
            rel="noreferrer"
          >
            localhost:3001
          </a>
        </code>
      </p>
    </footer>
  </div>
);

export default App;