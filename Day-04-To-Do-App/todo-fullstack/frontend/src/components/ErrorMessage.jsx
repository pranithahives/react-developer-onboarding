const ErrorMessage = ({ message, onDismiss }) => (
  <div className="error-message">
    <span className="error-message__icon">⚠️</span>

    <span className="error-message__text">
      {message}
    </span>

    {onDismiss && (
      <button
        className="error-message__dismiss"
        onClick={onDismiss}
      >
        ✕
      </button>
    )}
  </div>
);

export default ErrorMessage;