import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import StudentTopbar from './StudentTopbar';

const pageTitles = {
  '/student/dashboard': 'Dashboard',
  '/student/learning': 'My Learning',
  '/student/explore': 'Explore',
  '/student/progress': 'My Progress',
  '/student/achievements': 'Achievements',
  '/student/notifications': 'Notifications',
  '/student/profile': 'Profile',
  '/student/settings': 'Settings',
  '/student/help': 'Help & Support',
};

export default function StudentLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const title = pageTitles[location.pathname]
    || (location.pathname.includes('/lesson/') ? 'Lesson' : null)
    || (location.pathname.includes('/activity/') ? 'Interactive Activity' : null)
    || (location.pathname.includes('/practice/') ? 'Practice' : null)
    || (location.pathname.includes('/quiz/') ? 'Quiz' : null)
    || (location.pathname.includes('/result/') ? 'Quiz Result' : null)
    || 'Student Dashboard';

  return (
    <div className="student-app-shell">
      <StudentSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="student-page-shell">
        <StudentTopbar title={title} onMenuToggle={() => setMobileOpen((value) => !value)} />
        <main className="student-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
