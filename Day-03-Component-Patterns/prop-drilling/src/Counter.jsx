function Counter({ title, totalCount, setTotalCount }) {
  return (
    <div>
      <h2>{title}</h2>

      <button onClick={() => setTotalCount(totalCount + 1)}>
        Increment
      </button>

      <button onClick={() => setTotalCount(totalCount - 1)}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;