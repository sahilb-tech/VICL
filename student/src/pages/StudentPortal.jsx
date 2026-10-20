import { NavLink, Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const COMPLETED_CHAPTERS_KEY = 'vico-foundation1-completed-chapters';
const COMPLETED_TOPICS_KEY = 'vico-foundation1-completed-topics';
// Starter learning points organised around the supplied Foundation 1 chapter titles.
// Replace/refine these labels against the actual textbook pages when the PDF is available.
const chapterTopics = [
  ['What is a computer?', 'Types of computers', 'Parts of a computer', 'What a computer can do'],
  ['Uses of computers at home', 'Computers at school', 'Computers in offices and shops', 'Computers in hospitals and other places'],
  ['Getting to know the keyboard', 'Alphabet and number keys', 'Enter, Spacebar and Backspace keys', 'Getting to know the mouse', 'Clicking and double-clicking'],
  ['Monitor', 'CPU / system unit', 'Keyboard and mouse', 'Printers and speakers', 'Other computer parts'],
  ['Input', 'Processing', 'Output', 'Understanding the IPO cycle'],
  ['Getting started with Tux Paint', 'Tux Paint tools', 'Colours and shapes', 'Drawing and saving a picture'],
  ['What is a sequence?', 'Put steps in order', 'Recognising patterns', 'Decode a simple pattern'],
  ['Following instructions', 'Left and right', 'Forward and backward', 'Finding a route using directions'],
  ['What is artificial intelligence?', 'Smart devices around us', 'What is a robot?', 'How robots follow instructions']
];
function readCompletedTopics() {
  try { return JSON.parse(localStorage.getItem(COMPLETED_TOPICS_KEY) || '{}'); }
  catch { return {}; }
}
function readCompletedChapters() {
  try {
    const manual = JSON.parse(localStorage.getItem(COMPLETED_CHAPTERS_KEY) || '[]').filter(n => Number.isInteger(n) && n >= 1 && n <= 9);
    const topicState = readCompletedTopics();
    const topicCompleted = chapterTopics.reduce((all, points, index) => {
      const done = topicState[index + 1] || [];
      if (points.length && points.every((_, topicIndex) => done.includes(topicIndex))) all.push(index + 1);
      return all;
    }, []);
    return [...new Set([...manual, ...topicCompleted])];
  } catch { return []; }
}
function FoundationProgress({ compact = false }) {
  const [, refresh] = useState(0);
  useEffect(() => { const update = () => refresh(v => v + 1); window.addEventListener('vico-progress-updated', update); return () => window.removeEventListener('vico-progress-updated', update); }, []);
  const completed = readCompletedChapters().length;
  const remaining = 9 - completed;
  const percent = Math.round((completed / 9) * 100);
  return <section className={`portal-learning-progress ${compact ? 'compact' : ''}`} aria-label="Foundation 1 learning progress">
    <div className="portal-learning-progress-top"><div><span className="portal-progress-eyebrow">FOUNDATION 1 · GRADE 1</span><h3>{compact ? 'Your book progress' : 'Your learning progress'}</h3></div><strong>{percent}%</strong></div>
    <div className="portal-learning-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={percent} aria-label={`${percent}% of Foundation 1 chapters completed`}><span style={{ width: `${percent}%` }} /></div>
    <div className="portal-learning-progress-bottom"><span><b>{completed} of 9</b> chapters completed</span><span><b>{remaining}</b> {remaining === 1 ? 'chapter' : 'chapters'} left to learn</span></div>
  </section>;
}

const chapters = [
  'More about a Computer', 'Applications of Computers', 'Keyboard and Mouse', 'Parts of a Computer', 'IPO Cycle', 'Fun with Tux Paint', 'Sequencing and Decoding', 'Instructions and Direction Sense', 'AI and Robotics'
];
const nav = [
  {to:'/student/dashboard', label:'Dashboard', icon:'⌂'},
  {to:'/student/learning', label:'My Learning', icon:'▤'},
  {to:'/student/exercises', label:'Exercises', icon:'✏️'},
  {to:'/student/periodic-tests', label:'Periodic Tests 1 & 2', icon:'▦'},
  {to:'/student/study-material', label:'Study Material', icon:'▱'},
  {to:'/student/progress', label:'Results & Progress', icon:'🏆'},
];
function Shell({children, title, subtitle}) {
 const [mobileOpen,setMobileOpen] = useState(false);
 return <div className="portal-shell">
  <aside className={`portal-sidebar ${mobileOpen?'mobile-open':''}`}>
   <Link to="/student/dashboard" className="portal-brand"><span className="portal-brand-mark">V</span><span><b>VICO</b><small>LEARN · CREATE · EXPLORE</small></span></Link>
   <div className="portal-nav-label">YOUR LEARNING</div>
   <nav>{nav.map(item=><NavLink key={item.to} to={item.to} onClick={()=>setMobileOpen(false)} className={({isActive})=>`portal-nav-link ${isActive?'active':''}`}><span className="portal-nav-icon">{item.icon}</span>{item.label}{item.to==='/student/learning'&&<span className="portal-nav-count">9</span>}</NavLink>)}</nav>
   <div className="portal-sidebar-bottom"><div className="portal-mascot">🤖<div><b>Keep it up!</b><small>Every little step counts.</small></div></div><NavLink to="/student/profile" className="portal-nav-link">☺ <span>Profile & Settings</span></NavLink></div>
  </aside>
  <div className="portal-main"><header className="portal-topbar"><button className="portal-menu-button" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">☰</button><div className="portal-breadcrumb">Student space <span>/</span> <b>{title}</b></div><div className="portal-top-actions"><span className="portal-grade">🎓 Foundation 1 · Grade 1</span><span className="portal-avatar">🧒</span><span className="portal-student-name">Learner</span></div></header>
   <main className="portal-content"><div className="portal-page-heading"><div><div className="portal-eyebrow">YOUR VICO LEARNING SPACE</div><h1>{title}</h1><p>{subtitle}</p></div></div>{children}<footer className="portal-footer">Made for curious minds <span>♥</span> · VICO Learning</footer></main>
  </div>
 </div>
}
function Dashboard(){return <><Shell title="Dashboard" subtitle="Ready to explore something new today?"><section className="portal-welcome"><div><span className="portal-welcome-tag">WELCOME BACK, LEARNER!</span><h2>Small steps today,<br/>big skills tomorrow.</h2><p>Your next adventure is waiting. Let's learn something new!</p><Link className="portal-primary" to="/student/learning">Continue learning <span>→</span></Link></div><div className="portal-welcome-art">🧑‍💻<span>✦</span><i>📚</i></div></section><section className="portal-stats"><article><span className="stat-icon purple">🎓</span><small>Current foundation</small><b>Foundation 1</b><em>Grade 1</em></article><article><span className="stat-icon blue">📖</span><small>Current chapter</small><b>Chapter 1</b><em>More about a Computer</em></article><article><span className="stat-icon yellow">⭐</span><small>Learning points</small><b>Let's get started!</b><em>Earn points as you learn</em></article></section><section className="portal-card portal-current-learning"><FoundationProgress compact /><div className="portal-card-head"><div><h2>What you're learning now</h2><p>Your current place in the Foundation 1 book</p></div><Link to="/student/learning">View all chapters →</Link></div><div className="portal-current-learning-body"><div className="portal-current-book-icon" aria-hidden="true">📖</div><div className="portal-current-learning-copy"><span className="portal-pill">CURRENTLY LEARNING · FOUNDATION 1</span><h3>Chapter 1: More about a Computer</h3><p><strong>Current point:</strong> Start at the beginning of this chapter</p><p className="portal-current-hint">Your exact lesson point will update here as learning progress is saved.</p></div><Link className="portal-primary portal-resume-button" to="/student/learning/chapter/1">Continue Chapter 1 <span>→</span></Link></div></section><section className="portal-card"><div className="portal-card-head"><div><h2>Coming up</h2><p>Practice what you've learned</p></div></div><div className="portal-upcoming"><span>🧩</span><div><b>Chapter-wise exercises</b><p>Try fill in the blanks, match the pairs and multiple-choice questions.</p></div><Link to="/student/exercises">Explore →</Link></div></section></Shell></>}
function ChapterTopicProgress({chapterNumber}) {
  const points = chapterTopics[chapterNumber - 1] || [];
  const [done, setDone] = useState(() => readCompletedTopics()[chapterNumber] || []);
  const count = done.length;
  const percent = points.length ? Math.round((count / points.length) * 100) : 0;
  function toggleTopic(topicIndex) {
    const next = done.includes(topicIndex) ? done.filter(i => i !== topicIndex) : [...done, topicIndex];
    const all = readCompletedTopics();
    all[chapterNumber] = next;
    localStorage.setItem(COMPLETED_TOPICS_KEY, JSON.stringify(all));
    setDone(next);
    window.dispatchEvent(new Event('vico-progress-updated'));
  }
  return <div className="portal-topic-progress">
    <div className="portal-topic-progress-head"><span>Chapter content</span><b>{count} of {points.length} topics read</b></div>
    <div className="portal-topic-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label={`Chapter ${chapterNumber}: ${percent}% of topics read`}><span style={{width:`${percent}%`}} /></div>
    <div className="portal-topic-list">{points.map((point, topicIndex) => {
      const isDone = done.includes(topicIndex);
      return <button type="button" key={point} className={`portal-topic-item ${isDone ? 'topic-done' : ''}`} onClick={() => toggleTopic(topicIndex)} aria-pressed={isDone}>
        <span className="portal-topic-check">{isDone ? '✓' : ''}</span><span>{point}</span><small>{isDone ? 'Read' : 'Mark read'}</small>
      </button>;
    })}</div>
  </div>;
}
function Learning(){const [,refresh]=useState(0);useEffect(()=>{const update=()=>refresh(v=>v+1);window.addEventListener('vico-progress-updated',update);return ()=>window.removeEventListener('vico-progress-updated',update)},[]);return <Shell title="My Learning" subtitle="Choose a chapter and learn one small step at a time."><div className="portal-course-banner"><span>📘</span><div><small>YOUR CURRENT COURSE</small><h2>Master Coding & Robotics · Foundation 1</h2><p>9 chapters · Grade 1 · Learn at your own pace</p></div><span className="portal-course-grade">GRADE 1</span></div><div className="portal-card portal-learning-path-progress"><FoundationProgress /></div><div className="portal-chapter-list portal-chapter-topic-list">{chapters.map((chapter,i)=>{const complete=readCompletedChapters().includes(i+1);return <article key={chapter} className="portal-chapter-learning-card"><Link to={`/student/learning/chapter/${i+1}`} className="portal-chapter-row"><span className={`portal-chapter-number color-${i%5} ${complete?'chapter-number-complete':''}`}>{complete ? '✓' : i+1}</span><div className="portal-chapter-info"><b>{chapter}</b><small>Chapter {i+1} · Foundation 1</small></div><span className={`portal-chapter-status ${complete ? 'is-complete' : ''}`}>{complete ? 'Completed' : 'Start learning'}</span><span className="portal-chevron">›</span></Link><ChapterTopicProgress chapterNumber={i+1}/></article>})}</div><p className="portal-note">These are starter learning points based on the chapter titles. Match them to the exact headings in the authorized textbook PDF before publishing the final curriculum.</p></Shell>}
function Chapter(){const {id}=useParams();const n=Math.max(1,Math.min(9,Number(id)||1));const title=chapters[n-1];const [completed,setCompleted]=useState(()=>readCompletedChapters().includes(n));function toggleComplete(){const current=readCompletedChapters();const next=completed?current.filter(ch=>ch!==n):[...new Set([...current,n])];localStorage.setItem(COMPLETED_CHAPTERS_KEY,JSON.stringify(next));setCompleted(!completed);window.dispatchEvent(new Event('vico-progress-updated'))}return <Shell title={`Chapter ${n}`} subtitle={title}><div className="portal-course-banner"><span>📖</span><div><small>FOUNDATION 1 · CHAPTER {n}</small><h2>{title}</h2><p>Follow the lesson, explore examples and practice what you learn.</p></div></div><div className="portal-card portal-learning-path-progress"><FoundationProgress /></div><section className="portal-card"><div className="portal-card-head"><div><h2>Your learning journey</h2><p>Lesson content will follow the Foundation 1 textbook.</p></div></div><div className="portal-lesson-placeholder"><span>🌟</span><h3>Ready to begin?</h3><p>Open the textbook in Study Material to read the original chapter. Lesson-by-lesson interactive content can be added from the corresponding book pages.</p><Link className="portal-primary" to="/student/study-material">Open Study Material →</Link><button className={`portal-outline-button portal-complete-chapter ${completed ? 'completed' : ''}`} onClick={toggleComplete}>{completed ? '✓ Marked complete · Undo' : 'Mark chapter as completed'}</button></div><div className="portal-chapter-pager">{n>1?<Link to={`/student/learning/chapter/${n-1}`}>← Previous chapter</Link>:<span/>}{n<9?<Link to={`/student/learning/chapter/${n+1}`}>Next chapter →</Link>:<Link to="/student/exercises">Go to exercises →</Link>}</div></section></Shell>}
function Exercises(){return <Shell title="Exercises" subtitle="Practise what you learn, chapter by chapter."><div className="portal-course-banner"><span>✏️</span><div><small>FOUNDATION 1 · GRADE 1</small><h2>Chapter exercises</h2><p>Complete activities and see your score on the exercise page.</p></div><span className="portal-course-grade">9 CHAPTERS</span></div><article className="portal-card portal-exercise-feature"><div className="portal-exercise-art">🖥️</div><div className="portal-exercise-copy"><span className="portal-pill">CHAPTER 1 · PAGES 10–12</span><h2>Exercise 1 — More about a Computer</h2><p>Try multiple-choice questions, matching, fill in the blanks, missing letters and a computer-lab activity.</p><div className="portal-exercise-meta"><span>🧩 13 questions / activities</span><span>⭐ Earn points</span><span>📊 Instant result</span></div><Link className="portal-primary" to="/student/exercises/chapter/1">Start Exercise 1 →</Link></div></article><article className="portal-card portal-exercise-feature"><div className="portal-exercise-art">🖱️</div><div className="portal-exercise-copy"><span className="portal-pill">FOUNDATION 1 · EXERCISE 2</span><h2>Exercise 2 — Computer Parts</h2><p>Practise identifying the keyboard, monitor, CPU, printer and mouse with the uploaded interactive quiz. Answer one question at a time and see your score on this same page.</p><div className="portal-exercise-meta"><span>🧩 26 questions</span><span>⭐ Instant feedback</span><span>📊 Final score</span></div><Link className="portal-primary" to="/student/exercises/2">Start Exercise 2 →</Link></div></article><div className="portal-card"><div className="portal-card-head"><div><h2>More chapter exercises</h2><p>Exercises for the remaining chapters can be added as their textbook activities are prepared.</p></div></div><div className="portal-chapter-list">{chapters.slice(1).map((chapter,i)=><div className="portal-chapter-row portal-exercise-disabled" key={chapter}><span className={`portal-chapter-number color-${(i+1)%5}`}>{i+2}</span><div className="portal-chapter-info"><b>{chapter}</b><small>Chapter {i+2} · Exercise content not added yet</small></div><span className="portal-chapter-status">Coming soon</span></div>)}</div></div></Shell>}
function ChapterOneExercise(){return <Shell title="Exercise 1" subtitle="Chapter 1 · More about a Computer"><div className="portal-exercise-toolbar"><Link to="/student/exercises">← Back to Exercises</Link><span>Foundation 1 · Grade 1</span></div><div className="portal-exercise-frame-wrap"><iframe className="portal-exercise-frame" title="Foundation 1 Chapter 1 Exercise" src="/exercises/chapter1/index.html" /></div><p className="portal-note">Your score and completion summary appear inside the exercise when you finish. Exercise results are kept here; the Results & Progress page is reserved for periodic and school test results.</p></Shell>}
function ExerciseTwo(){return <Shell title="Exercise 2" subtitle="Foundation 1 · Computer Parts"><div className="portal-exercise-toolbar"><Link to="/student/exercises">← Back to Exercises</Link><span>Foundation 1 · Grade 1</span></div><div className="portal-exercise-frame-wrap"><iframe className="portal-exercise-frame" title="Foundation 1 Exercise 2 — Computer Parts" src="/exercises/exercise2/index.html" /></div><p className="portal-note">Your answers, feedback, final score and completion summary appear inside this exercise page. Exercise results stay here; Results & Progress is reserved for periodic and school test results.</p></Shell>}
function Tests(){return <Shell title="Periodic Tests 1 & 2" subtitle="Check your test information and prepare with confidence."><div className="portal-test-grid">{[{n:1,title:'Periodic Test 1',icon:'📝',desc:'First periodic assessment',status:'Schedule to be announced'},{n:2,title:'Periodic Test 2',icon:'📋',desc:'Second periodic assessment',status:'Schedule to be announced'}].map(t=><article className="portal-card portal-test-card" key={t.n}><div className="portal-test-icon">{t.icon}</div><span className="portal-pill">TEST {t.n}</span><h2>{t.title}</h2><p>{t.desc}</p><div className="portal-test-detail"><span>📅 Schedule</span><b>{t.status}</b></div><div className="portal-test-detail"><span>📚 Syllabus</span><b>As assigned by teacher</b></div><button className="portal-outline-button" disabled>Test not yet available</button></article>)}</div></Shell>}
function StudyMaterial(){return <Shell title="Study Material" subtitle="Your textbook and learning resources in one place."><article className="portal-book-card"><div className="portal-book-art"><span>📘</span><small>FOUNDATION 1</small><b>MASTER CODING<br/>& ROBOTICS</b><i>Learn · Think · Create</i></div><div className="portal-book-info"><span className="portal-pill">GRADE 1 · TEXTBOOK</span><h2>Master Coding & Robotics — Foundation 1</h2><p>Use the textbook while following the nine-chapter learning path. The original book is provided as a PDF.</p><div className="portal-book-meta"><span>PDF textbook</span><span>9 chapters</span></div><div className="portal-book-actions"><a className="portal-primary" href="/study-material/master-coding-robotics-foundation-1.pdf" target="_blank" rel="noreferrer">Read online ↗</a><a className="portal-outline-button" href="/study-material/master-coding-robotics-foundation-1.pdf" download>↓ Download book</a></div></div></article><p className="portal-note">If the textbook does not open, ask your teacher or administrator to upload the authorized PDF.</p></Shell>}
function Progress(){const tests=['Periodic Test 1','Half-yearly Test','Periodic Test 2','Annual Test'];return <Shell title="Results & Progress" subtitle="View results published for your school assessments."><section className="portal-card"><div className="portal-card-head"><div><h2>Test results</h2><p>Only periodic and school test results appear here. Exercise scores are shown on each exercise page.</p></div></div><div className="portal-result-list">{tests.map((t,i)=><div className="portal-result-row" key={t}><span className="portal-result-num">{i+1}</span><b>{t}</b><span className="portal-result-pending">Awaiting result</span></div>)}</div></section></Shell>}
export default function StudentPortal({page}){const pages={dashboard:<Dashboard/>,learning:<Learning/>,exercises:<Exercises/>,chapter1exercise:<ChapterOneExercise/>,exercise2:<ExerciseTwo/>,tests:<Tests/>,material:<StudyMaterial/>,progress:<Progress/>};return page==='chapter'?<Chapter/>:pages[page]||<Dashboard/>}
