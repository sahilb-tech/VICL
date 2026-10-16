import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const lessons = [
  { title: 'What is a Computer?', description: 'Understand the basic idea of a computer.', status: 'Not started' },
  { title: 'Monitor', description: 'Learn what a monitor does.', status: 'Not started' },
  { title: 'CPU / System Unit', description: 'Understand the main processing part.', status: 'Not started' },
  { title: 'Keyboard', description: 'Learn keys and basic typing.', status: 'Not started' },
  { title: 'Mouse', description: 'Learn clicking, double-clicking and scrolling.', status: 'Ready to learn' }
];

export default function StudentDashboard() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Logo />
        <nav className="topnav"><a href="#lessons">Lessons</a><a href="#progress">Progress</a><a href="#profile">Profile</a><a href="/login">Logout</a></nav>
      </header>

      <main className="dashboard-content">
        <section className="welcome-card">
          <div>
            <span className="eyebrow">Student Dashboard</span>
            <h1>Welcome back!</h1>
            <p>Choose a lesson and start learning through visuals and practice.</p>
          </div>
          <div className="progress-ring"><strong>0%</strong><span>Progress</span></div>
        </section>

        <section id="lessons">
          <div className="section-heading"><div><span className="eyebrow">Learning path</span><h2>Your Lessons</h2></div></div>
          <div className="lesson-grid">
            {lessons.map((lesson) => {
              const isMouse = lesson.title === 'Mouse';
              return (
                <article className="lesson-card" key={lesson.title}>
                  <div className="lesson-illustration">{isMouse ? '🖱️' : '💻'}</div>
                  <div className="lesson-body">
                    <span className="status-pill">{lesson.status}</span>
                    <h3>{lesson.title}</h3>
                    <p>{lesson.description}</p>
                    {isMouse ? <Link className="secondary-button" to="/student/lessons/mouse">Start Lesson →</Link> : <button className="secondary-button disabled">Coming next</button>}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
