export default function NotificationCard({ notification }) {
  return (
    <article className={`notification-card ${notification.read ? 'read' : 'unread'}`}>
      <div className="notification-badge">{notification.category}</div>
      <div>
        <h3>{notification.title}</h3>
        <p>{notification.message}</p>
      </div>
      <span className="notification-time">{notification.time}</span>
    </article>
  );
}
