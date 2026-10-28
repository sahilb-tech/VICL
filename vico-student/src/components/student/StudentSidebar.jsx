import { NavLink } from 'react-router-dom';
import { logoutStudent } from '../../services/authService';

const navigation = [
  { label: 'Dashboard', to: '/student/dashboard' },
  { label: 'My Learning', to: '/student/learning' },
  { label: 'Explore', to: '/student/explore' },
  { label: 'My Progress', to: '/student/progress' },
  { label: 'Achievements', to: '/student/achievements' },
  { label: 'Notifications', to: '/student/notifications' },
  { label: 'Profile', to: '/student/profile', secondary: true },
  { label: 'Settings', to: '/student/settings', secondary: true },
  { label: 'Help & Support', to: '/student/help', secondary: true },
];

export default function StudentSidebar({ mobileOpen, onClose }) {
  const handleLogout = () => {
    logoutStudent();
    window.location.href = '/student/login';
  };

  return (
    <aside className={`student-sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-mark">V</div>
        <div>
          <strong>VICO</strong>
          <small>Student Panel</small>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Student main navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/student/dashboard'}
            className={({ isActive }) => `nav-item ${item.secondary ? 'secondary' : ''} ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button type="button" className="logout-button" onClick={handleLogout}>Logout</button>
    </aside>
  );
}
