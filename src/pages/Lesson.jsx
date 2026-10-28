import { Link } from 'react-router-dom';

export default function Lesson() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><div className="brand-mark">V</div><div><div className="brand-name">VICL</div><div className="brand-tagline">Mouse Lesson</div></div></div>
        <Link className="top-link" to="/student/dashboard">← Dashboard</Link>
      </header>

      <main className="lesson-page">
        <div className="lesson-header"><span className="eyebrow">Lesson 01 • Computer Basics</span><h1>Meet the Mouse</h1><p>Learn the basic mouse actions through visual explanation and practice.</p></div>

        <section className="learning-card">
          <div className="big-visual">🖱️</div>
          <div className="learning-copy">
            <span className="mini-label">See & Understand</span>
            <h2>What is a mouse?</h2>
            <p>A mouse is a pointing device used to move the pointer and interact with items on a computer screen.</p>
            <div className="action-list"><div><strong>Left click</strong><span>Select or activate an item.</span></div><div><strong>Right click</strong><span>Open a context menu.</span></div><div><strong>Double click</strong><span>Open an item.</span></div><div><strong>Scroll</strong><span>Move through a page.</span></div></div>
          </div>
        </section>

        <section className="learning-card demo-card">
          <div><span className="mini-label">Demonstration</span><h2>Watch the action</h2><p>In the next activity, you will practice the basic mouse actions yourself.</p></div>
          <div className="demo-window"><div className="demo-bar"></div><div className="demo-target">Click me</div><div className="demo-cursor">➤</div></div>
        </section>

        <section className="practice-card">
          <div><span className="mini-label">Interact & Practice</span><h2>Mouse practice is next</h2><p>The interactive engine will detect the student's action, provide success/retry feedback, and record completion.</p></div>
          <button className="primary-button" onClick={() => alert('Interactive Mouse Activity is the next build step.')}>Start Practice</button>
        </section>
      </main>
    </div>
  );
}
