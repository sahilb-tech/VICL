export default function StateMessage({ type = 'empty', title, message, action }) {
  return (
    <div className={`state-message state-${type}`} role={type === 'error' ? 'alert' : undefined}>
      <span className="state-icon" aria-hidden="true">{type === 'error' ? '!' : type === 'loading' ? '...' : 'i'}</span>
      <div>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
      {action}
    </div>
  );
}
