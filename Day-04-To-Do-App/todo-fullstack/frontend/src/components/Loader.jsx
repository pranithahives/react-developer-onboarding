const Loader = ({ message = "Loading tasks..." }) => (
  <div className="loader">
    <div className="loader__spinner"></div>
    <span className="loader__text">{message}</span>
  </div>
);

export default Loader;