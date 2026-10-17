import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const lessons = [
  { title: 'What is a Computer?', description: 'Discover what computers help us do every day.', status: 'Start here', icon: '💻', tone: 'blue', category: 'Computer Foundation' },
  { title: 'Meet the Monitor', description: 'Explore the screen that shows pictures and words.', status: 'Coming next', icon: '🖥️', tone: 'mint', category: 'Hardware' },
  { title: 'CPU / System Unit', description: 'Find out where the computer does its thinking.', status: 'Coming next', icon: '🧠', tone: 'peach', category: 'Hardware' },
  { title: 'Keyboard Basics', description: 'Discover keys and learn how we type.', status: 'Coming next', icon: '⌨️', tone: 'pink', category: 'Practice' },
  { title: 'Meet the Mouse', description: 'Practice clicking, double-clicking and scrolling.', status: 'Ready to learn', icon: '🖱️', tone: 'purple', category: 'Practice', link: '/student/lessons/mouse' },
];

const sections = [
  { title: 'Computer Foundation', description: 'Learn the basics step by step.', icon: '💻', tone: 'blue' },
  { title: 'Hardware', description: 'Meet the parts of a computer.', icon: '🧩', tone: 'peach' },
  { title: 'Software', description: 'Explore apps and programs.', icon: '🗂️', tone: 'pink' },
  { title: 'Coding', description: 'Give instructions and solve puzzles.', icon: '👩‍💻', tone: 'purple' },
  { title: 'Robotics', description: 'Build, explore and invent.', icon: '🤖', tone: 'mint' },
];

function SidebarLink({ icon, children, active = false, href = '#lessons' }) {
  return <a className={`vico-side-link${active ? ' active' : ''}`} href={href}><span className="vico-nav-icon">{icon}</span><span>{children}</span></a>;
}

export default function StudentDashboard() {
  const studentName = 'Learner';
  return (
    <div className="vico-dashboard-shell">
      <aside className="vico-sidebar">
        <div className="vico-brand"><Logo /></div>
        <nav className="vico-side-nav" aria-label="Student navigation">
          <SidebarLink icon="⌂" active href="/student/dashboard">Dashboard</SidebarLink>
          <SidebarLink icon="▣" href="#learning-sections">My Learning</SidebarLink>
          <SidebarLink icon="▤" href="#assignments">Assignments</SidebarLink>
          <SidebarLink icon="▥" href="#progress">Results & Progress</SidebarLink>
          <SidebarLink icon="▱" href="#learning-sections">Study Material</SidebarLink>
        </nav>
        <div className="vico-sidebar-bottom">
          <div className="vico-mascot-note"><span className="vico-note-sparkle">✦</span><strong>Keep learning!</strong><span>You're doing great.</span></div>
          <div className="vico-robot" aria-hidden="true">🤖</div>
          <SidebarLink icon="⚙" href="#settings">Settings</SidebarLink>
          <SidebarLink icon="☺" href="#profile">Profile</SidebarLink>
        </div>
      </aside>

      <div className="vico-main-column">
        <header className="vico-topbar">
          <div className="vico-search"><span aria-hidden="true">⌕</span><input aria-label="Search lessons" placeholder="Search lessons, topics or activities…" /></div>
          <div className="vico-topbar-actions"><button className="vico-icon-button" aria-label="Notifications">♧<i>2</i></button><div className="vico-student-profile"><span className="vico-avatar">🧒</span><span><small>Hello,</small><strong>{studentName}</strong></span><span className="vico-chevron">⌄</span></div></div>
        </header>

        <main className="vico-dashboard-content">
          <section className="vico-welcome-banner">
            <div className="vico-welcome-copy"><span className="vico-eyebrow">WELCOME TO YOUR LEARNING SPACE</span><h1>Hello, {studentName}! <span>✋</span></h1><p>Ready to explore something new today?</p><Link className="vico-primary-button" to="/student/lessons/mouse">Continue Learning <span>→</span></Link></div>
            <div className="vico-hero-art" aria-hidden="true"><div className="vico-hero-sun">✦</div><div className="vico-hero-kid">🧑🏻‍💻</div><div className="vico-speech-bubble">Small steps today,<br/><strong>big skills tomorrow!</strong> ✨</div><div className="vico-hero-books">📚</div></div>
          </section>

          <section className="vico-curriculum-strip" aria-label="Current curriculum">
            <article className="vico-context-card context-purple"><span className="vico-context-icon">🎓</span><div><small>Current Foundation</small><strong>Foundation 1</strong><span>Grade 1</span></div></article>
            <article className="vico-context-card context-blue"><span className="vico-context-icon">📖</span><div><small>Current Chapter</small><strong>Chapter 1</strong><span>The Super Machine</span></div></article>
            <article className="vico-context-card context-green"><span className="vico-context-icon">🎯</span><div><small>Current Topic</small><strong>Topic 1</strong><span>What is a Machine?</span></div></article>
            <article className="vico-context-card context-yellow"><span className="vico-context-icon">▶️</span><div><small>Suggested Lesson</small><strong>Lesson 1</strong><span>Introduction</span></div></article>
          </section>

          <section className="vico-overview-grid" id="progress">
            <article className="vico-panel vico-progress-panel"><div className="vico-panel-heading"><span>▣</span><h2>Your Progress</h2></div><div className="vico-progress-inner"><div className="vico-progress-ring"><div><strong>Start</strong><span>your journey</span></div></div><div className="vico-progress-stats"><div><span className="vico-stat-icon blue">📘</span><p><small>Lessons</small><strong>Ready to begin</strong></p></div><div><span className="vico-stat-icon yellow">⭐</span><p><small>Activities</small><strong>Explore and practice</strong></p></div><div><span className="vico-stat-icon green">🏆</span><p><small>Achievements</small><strong>Waiting for you</strong></p></div></div></div><p className="vico-data-note">Your saved progress will appear here as you learn.</p></article>
            <article className="vico-panel vico-continue-panel"><div className="vico-panel-heading"><span>◷</span><h2>Continue Where You Left Off</h2></div><div className="vico-continue-content"><div className="vico-computer-art">🖥️</div><div className="vico-continue-copy"><small>CHAPTER 1 · COMPUTER BASICS</small><h3>Meet the Mouse</h3><p>Learn clicking, double-clicking and scrolling.</p><Link className="vico-primary-button vico-button-small" to="/student/lessons/mouse">Continue Lesson <span>→</span></Link></div></div></article>
            <article className="vico-panel vico-goal-panel"><div className="vico-panel-heading"><span>◎</span><h2>Today's Goal</h2></div><div className="vico-goal-illustration">⭐</div><h3>One step at a time</h3><p>Finish a lesson and celebrate what you learn.</p><span className="vico-goal-tag">You can do it!</span></article>
          </section>

          <section className="vico-section-block" id="learning-sections"><div className="vico-section-title"><div><span className="vico-eyebrow">EXPLORE AND DISCOVER</span><h2>Learning Sections</h2></div><a href="#lessons">View lessons <span>→</span></a></div><div className="vico-section-grid">{sections.map((section) => <a className={`vico-section-card tone-${section.tone}`} href="#lessons" key={section.title}><div className="vico-section-art">{section.icon}</div><div className="vico-section-card-copy"><strong>{section.title}</strong><span>{section.description}</span></div><span className="vico-round-arrow">›</span></a>)}</div></section>

          <section className="vico-bottom-grid" id="lessons"><article className="vico-panel vico-lessons-panel"><div className="vico-section-title compact"><h2>Your Lessons</h2><span className="vico-count-pill">5 lessons</span></div><div className="vico-lesson-list">{lessons.map((lesson, index) => <div className="vico-lesson-row" key={lesson.title}><span className={`vico-lesson-emoji tone-${lesson.tone}`}>{lesson.icon}</span><div className="vico-lesson-text"><strong>{lesson.title}</strong><small>{lesson.category} · {lesson.description}</small></div>{lesson.link ? <Link className="vico-lesson-action" to={lesson.link}>Start <span>→</span></Link> : <span className="vico-coming-soon">{index === 0 ? 'Start soon' : 'Coming next'}</span>}</div>)}</div></article><article className="vico-panel vico-assignments-panel" id="assignments"><div className="vico-panel-heading"><span>▤</span><h2>Next Up</h2></div><div className="vico-next-up-art">🧩</div><h3>Ready for a little challenge?</h3><p>Try a lesson, explore the pictures and practice a new computer skill.</p><Link className="vico-text-link" to="/student/lessons/mouse">Explore a lesson <span>→</span></Link></article></section>
          <footer className="vico-footer">Made for curious minds <span>♥</span> · VICO Learning</footer>
        </main>
      </div>
    </div>
  );
}
