export default function StudentTopbar({ title, onMenuToggle, hasNotifications = true }) {
  return (
    <header className="student-topbar">
      <div className="topbar-left">
        <button type="button" className="menu-button" onClick={onMenuToggle} aria-label="Open navigation">
          ☰
        </button>
        <div>
          <span className="eyebrow">Student Panel</span>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="topbar-right">
        <button type="button" className="icon-button" aria-label="Open notifications">
          {hasNotifications ? '🔔' : '🔕'}
        </button>
        <div className="profile-pill">
          <span className="avatar">AS</span>
          <div>
            <strong>Aarav</strong>
            <small>Grade 1</small>
          </div>
        </div>
      </div>
    </header>
  );
}
