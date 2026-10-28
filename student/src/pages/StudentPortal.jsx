import { NavLink, Link, useLocation, useParams } from 'react-router-dom';
<<<<<<< HEAD
import { useEffect, useRef, useState } from 'react';
import {
  getChapterProgress, readVideoProgress, readActivityProgress, readQuizResults, readTopicProgress, saveVideoProgress, saveActivityProgress, saveQuizResult,
} from '../services/progressService';
=======
import { useEffect, useState } from 'react';
>>>>>>> origin/main

const COMPLETED_CHAPTERS_KEY = 'vico-foundation1-completed-chapters';
const COMPLETED_TOPICS_KEY = 'vico-foundation1-completed-topics';
// Starter learning points organised around the supplied Foundation 1 chapter titles.
// Replace/refine these labels against the actual textbook pages when the PDF is available.
const chapterTopics = [
<<<<<<< HEAD
  ['What Is a Computer?', 'Types of Computers', 'Parts of a Computer', 'Other Computer Devices', 'Turning On a Computer', 'Shutting Down a Computer', 'Human vs Computer'],
=======
  ['What is a computer?', 'Types of computers', 'Parts of a computer', 'What a computer can do'],
>>>>>>> origin/main
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
<<<<<<< HEAD
    const saved = JSON.parse(localStorage.getItem(COMPLETED_CHAPTERS_KEY) || '[]').filter(n => Number.isInteger(n) && n >= 1 && n <= 9);
    return [...new Set(saved)];
  } catch { return []; }
}
function markChapterCompletedFromVideo(chapterNumber) {
  const current = readCompletedChapters();
  if (!current.includes(chapterNumber)) {
    localStorage.setItem(COMPLETED_CHAPTERS_KEY, JSON.stringify([...current, chapterNumber]));
  }
  window.dispatchEvent(new Event('vico-progress-updated'));
}
=======
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
>>>>>>> origin/main
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
<<<<<<< HEAD
   <Link to="/student/dashboard" className="portal-brand"><span className="portal-brand-mark">V</span><span><b>VICL</b><small>LEARN · CREATE · EXPLORE</small></span></Link>
=======
   <Link to="/student/dashboard" className="portal-brand"><span className="portal-brand-mark">V</span><span><b>VICO</b><small>LEARN · CREATE · EXPLORE</small></span></Link>
>>>>>>> origin/main
   <div className="portal-nav-label">YOUR LEARNING</div>
   <nav>{nav.map(item=><NavLink key={item.to} to={item.to} onClick={()=>setMobileOpen(false)} className={({isActive})=>`portal-nav-link ${isActive?'active':''}`}><span className="portal-nav-icon">{item.icon}</span>{item.label}{item.to==='/student/learning'&&<span className="portal-nav-count">9</span>}</NavLink>)}</nav>
   <div className="portal-sidebar-bottom"><div className="portal-mascot">🤖<div><b>Keep it up!</b><small>Every little step counts.</small></div></div><NavLink to="/student/profile" className="portal-nav-link">☺ <span>Profile & Settings</span></NavLink></div>
  </aside>
  <div className="portal-main"><header className="portal-topbar"><button className="portal-menu-button" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">☰</button><div className="portal-breadcrumb">Student space <span>/</span> <b>{title}</b></div><div className="portal-top-actions"><span className="portal-grade">🎓 Foundation 1 · Grade 1</span><span className="portal-avatar">🧒</span><span className="portal-student-name">Learner</span></div></header>
   <main className="portal-content"><div className="portal-page-heading"><div><div className="portal-eyebrow">YOUR VICO LEARNING SPACE</div><h1>{title}</h1><p>{subtitle}</p></div></div>{children}<footer className="portal-footer">Made for curious minds <span>♥</span> · VICO Learning</footer></main>
  </div>
 </div>
}
<<<<<<< HEAD
function Dashboard(){
 const [, refresh] = useState(0);
 useEffect(() => {
   const update = () => refresh(value => value + 1);
   window.addEventListener('vico-progress-updated', update);
   window.addEventListener('storage', update);
   return () => { window.removeEventListener('vico-progress-updated', update); window.removeEventListener('storage', update); };
 }, []);
 const videos = readVideoProgress();
 const activities = readActivityProgress();
 const quizzes = readQuizResults();
 const topics = readTopicProgress();
 const topicCounts = chapterTopics.map(items => items.length);
 const chapterStats = chapters.map((title, index) => getChapterProgress(index + 1, topicCounts));
 const completedChapters = chapterStats.filter(item => item.status === 'Completed').length;
 const overallPercent = Math.round(chapterStats.reduce((sum, item) => sum + (item.totalTopics ? item.completedTopics / item.totalTopics : 0), 0) / 9 * 100);
 const activityCount = Object.values(activities).filter(item => item?.completed || (item?.topicsCompleted || []).length > 0).length;
 const quizEntries = Object.entries(quizzes).filter(([, result]) => result && Number.isFinite(result.score)).map(([chapter, result]) => ({ chapter: Number(chapter), ...result })).sort((a,b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
 const activityChapters = Object.entries({ ...videos, ...activities, ...quizzes }).map(([chapter, value]) => ({ chapter: Number(chapter), updatedAt: value?.updatedAt || '' })).filter(item => item.chapter >= 1 && item.chapter <= 9 && item.updatedAt).sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
 const lastTouched = activityChapters[0]?.chapter || chapterStats.find(item => item.status === 'In progress')?.chapter || 1;
 const lastVideo = videos[lastTouched] || {};
 const lastTopicList = topics[lastTouched] || [];
 const currentTitle = chapters[lastTouched - 1];
 const currentTopic = chapterTopics[lastTouched - 1]?.[Math.min(lastTopicList.length, chapterTopics[lastTouched - 1].length - 1)] || chapterTopics[lastTouched - 1]?.[0] || 'Start this chapter';
 const currentStats = chapterStats[lastTouched - 1];
 const nextIncomplete = chapterStats.find(item => item.status !== 'Completed') || chapterStats[0];
 const continueChapter = (lastVideo.percent > 0 || currentStats.status === 'In progress') ? lastTouched : nextIncomplete.chapter;
 const continueTitle = chapters[continueChapter - 1];
 const continueVideo = videos[continueChapter] || {};
 const continueTopicProgress = (topics[continueChapter] || []).length;
 const achievementList = [
   { icon: '🚀', title: 'First Steps', description: 'Start your first chapter', earned: Object.values(videos).some(item => (item?.percent || 0) > 0) || Object.values(topics).some(list => Array.isArray(list) && list.length > 0) },
   { icon: '🎬', title: 'Video Explorer', description: 'Watch a chapter video', earned: Object.values(videos).some(item => item?.completed) },
   { icon: '🧩', title: 'Practice Star', description: 'Try a learning activity', earned: Object.values(activities).some(item => (item?.topicsCompleted || []).length > 0 || item?.completed) },
   { icon: '🏆', title: 'Quiz Champion', description: 'Submit a chapter quiz', earned: quizEntries.length > 0 },
 ];
 const earnedAchievements = achievementList.filter(item => item.earned).length;
 return <><Shell title="Dashboard" subtitle="Your learning journey, all in one place.">
   <section className="portal-welcome"><div><span className="portal-welcome-tag">WELCOME BACK, LEARNER!</span><h2>Small steps today,<br/>big skills tomorrow.</h2><p>You're making progress one lesson at a time. Ready to continue?</p><Link className="portal-primary" to={`/student/learning/chapter/${continueChapter}`}>Continue Learning <span>→</span></Link></div><div className="portal-welcome-art">🧑‍💻<span>✦</span><i>📚</i></div></section>
   <section className="portal-stats"><article><span className="stat-icon purple">📈</span><small>Overall topic progress</small><b>{overallPercent}%</b><em>{chapterStats.reduce((sum,item)=>sum+item.completedTopics,0)} of {chapterStats.reduce((sum,item)=>sum+item.totalTopics,0)} topics completed</em></article><article><span className="stat-icon blue">📖</span><small>Chapters completed</small><b>{completedChapters} of 9</b><em>{9-completedChapters} chapters to explore</em></article><article><span className="stat-icon yellow">🏆</span><small>Achievements earned</small><b>{earnedAchievements} of {achievementList.length}</b><em>Keep learning to unlock more</em></article></section>
   <section className="portal-card portal-current-learning"><div className="portal-card-head"><div><h2>Continue where you left off</h2><p>Your most recent chapter activity</p></div><Link to="/student/learning">View all chapters →</Link></div><div className="portal-current-learning-body"><div className="portal-current-book-icon" aria-hidden="true">{lastVideo.percent > 0 ? '▶️' : '📖'}</div><div className="portal-current-learning-copy"><span className="portal-pill">FOUNDATION 1 · CHAPTER {continueChapter}</span><h3>{continueTitle}</h3><p><strong>Video progress:</strong> {Math.max(0, Math.min(100, Math.round(continueVideo.percent || 0)))}% · <strong>Topics:</strong> {continueTopicProgress}/{chapterTopics[continueChapter-1].length}</p><p className="portal-current-hint">{continueVideo.currentTime > 0 && continueVideo.duration > 0 ? `Resume near ${Math.floor(continueVideo.currentTime/60)}:${String(Math.floor(continueVideo.currentTime%60)).padStart(2,'0')} in the video.` : 'Pick up this chapter and continue learning at your own pace.'}</p><div className="portal-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={continueVideo.percent || 0}><span style={{width:`${Math.max(0,Math.min(100,continueVideo.percent||0))}%`}} /></div></div><Link className="portal-primary portal-resume-button" to={`/student/learning/chapter/${continueChapter}`}>Resume Chapter <span>→</span></Link></div></section>
   <section className="portal-card"><div className="portal-card-head"><div><h2>Chapter progress</h2><p>See how far you've travelled in Foundation 1.</p></div><Link to="/student/progress">Detailed progress →</Link></div><div className="portal-dashboard-chapter-list">{chapterStats.map((item,index)=><Link className="portal-dashboard-chapter" to={`/student/learning/chapter/${index+1}`} key={item.chapter}><span className={`portal-chapter-number color-${index%5}`}>{index+1}</span><span className="portal-dashboard-chapter-copy"><b>{chapters[index]}</b><small>{item.completedTopics}/{item.totalTopics} topics · Video {item.videoPercent}%</small><span className="portal-progress-track"><i style={{width:`${item.totalTopics ? item.completedTopics/item.totalTopics*100 : 0}%`}} /></span></span><span className={`portal-dashboard-status ${item.status==='Completed'?'is-complete':''}`}>{item.status}</span><span className="portal-chevron">›</span></Link>)}</div></section>
   <section className="portal-dashboard-lower-grid"><article className="portal-card"><div className="portal-card-head"><div><h2>Recent quiz results</h2><p>Your latest submitted chapter quizzes</p></div><Link to="/student/progress">All results →</Link></div>{quizEntries.length ? <div className="portal-result-list">{quizEntries.slice(0,4).map(result=><div className="portal-result-row" key={result.chapter}><span className="portal-result-num">{result.chapter}</span><div className="portal-dashboard-result-copy"><b>{chapters[result.chapter-1]}</b><small>{result.updatedAt ? new Date(result.updatedAt).toLocaleDateString() : 'Quiz submitted'}</small></div><span className="portal-dashboard-score">{result.score}/{result.total} ({result.total ? Math.round(result.score/result.total*100) : 0}%)</span></div>)}</div> : <div className="portal-dashboard-empty"><span>📝</span><b>No quiz results yet</b><p>Complete a chapter quiz and your score will appear here.</p><Link to={`/student/learning/chapter/${continueChapter}`}>Continue learning →</Link></div>}</article>
   <article className="portal-card"><div className="portal-card-head"><div><h2>Learning achievements</h2><p>Little milestones worth celebrating</p></div></div><div className="portal-achievement-list">{achievementList.map(item=><div className={`portal-achievement-item ${item.earned?'earned':''}`} key={item.title}><span>{item.icon}</span><div><b>{item.title}</b><small>{item.description}</small></div><strong>{item.earned?'✓':'Locked'}</strong></div>)}</div></article></section>
   <section className="portal-card"><div className="portal-card-head"><div><h2>Recommended next activity</h2><p>A simple next step based on your progress</p></div></div><div className="portal-upcoming"><span>🧩</span><div><b>{currentStats.completedTopics < currentStats.totalTopics ? `Explore: ${currentTopic}` : 'Try a chapter quiz'}</b><p>{currentStats.completedTopics < currentStats.totalTopics ? `Continue ${currentTitle} by opening a topic and completing its practice activity.` : `Review ${currentTitle} and check what you remember with the chapter quiz.`}</p></div><Link to={`/student/learning/chapter/${continueChapter}`}>Start activity →</Link></div></section>
 </Shell></>;
}
=======
function Dashboard(){return <><Shell title="Dashboard" subtitle="Ready to explore something new today?"><section className="portal-welcome"><div><span className="portal-welcome-tag">WELCOME BACK, LEARNER!</span><h2>Small steps today,<br/>big skills tomorrow.</h2><p>Your next adventure is waiting. Let's learn something new!</p><Link className="portal-primary" to="/student/learning">Continue learning <span>→</span></Link></div><div className="portal-welcome-art">🧑‍💻<span>✦</span><i>📚</i></div></section><section className="portal-stats"><article><span className="stat-icon purple">🎓</span><small>Current foundation</small><b>Foundation 1</b><em>Grade 1</em></article><article><span className="stat-icon blue">📖</span><small>Current chapter</small><b>Chapter 1</b><em>More about a Computer</em></article><article><span className="stat-icon yellow">⭐</span><small>Learning points</small><b>Let's get started!</b><em>Earn points as you learn</em></article></section><section className="portal-card portal-current-learning"><FoundationProgress compact /><div className="portal-card-head"><div><h2>What you're learning now</h2><p>Your current place in the Foundation 1 book</p></div><Link to="/student/learning">View all chapters →</Link></div><div className="portal-current-learning-body"><div className="portal-current-book-icon" aria-hidden="true">📖</div><div className="portal-current-learning-copy"><span className="portal-pill">CURRENTLY LEARNING · FOUNDATION 1</span><h3>Chapter 1: More about a Computer</h3><p><strong>Current point:</strong> Start at the beginning of this chapter</p><p className="portal-current-hint">Your exact lesson point will update here as learning progress is saved.</p></div><Link className="portal-primary portal-resume-button" to="/student/learning/chapter/1">Continue Chapter 1 <span>→</span></Link></div></section><section className="portal-card"><div className="portal-card-head"><div><h2>Coming up</h2><p>Practice what you've learned</p></div></div><div className="portal-upcoming"><span>🧩</span><div><b>Chapter-wise exercises</b><p>Try fill in the blanks, match the pairs and multiple-choice questions.</p></div><Link to="/student/exercises">Explore →</Link></div></section></Shell></>}
>>>>>>> origin/main
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
<<<<<<< HEAD
function Learning(){
 const [,refresh]=useState(0);
 const [expandedChapters,setExpandedChapters]=useState([]);
 useEffect(()=>{const update=()=>refresh(v=>v+1);window.addEventListener('vico-progress-updated',update);return ()=>window.removeEventListener('vico-progress-updated',update)},[]);
 function toggleChapter(chapterNumber){setExpandedChapters(current=>current.includes(chapterNumber)?current.filter(n=>n!==chapterNumber):[...current,chapterNumber]);}
 return <Shell title="My Learning" subtitle="Choose a chapter and learn one small step at a time.">
  <div className="portal-course-banner"><span>📘</span><div><small>YOUR CURRENT COURSE</small><h2>Master Coding & Robotics · Foundation 1</h2><p>9 chapters · Grade 1 · Learn at your own pace</p></div><span className="portal-course-grade">GRADE 1</span></div>
  <div className="portal-card portal-learning-path-progress"><FoundationProgress /></div>
  <div className="portal-chapter-list portal-chapter-topic-list">{chapters.map((chapter,i)=>{
   const chapterNumber=i+1;
   const complete=readCompletedChapters().includes(chapterNumber);
   const isExpanded=expandedChapters.includes(chapterNumber);
   const points=chapterTopics[i]||[];
   const completedTopics=(readCompletedTopics()[chapterNumber]||[]).length;
   const topicPercent=points.length?Math.round(completedTopics/points.length*100):0;
   return <article key={chapter} className={`portal-chapter-learning-card ${isExpanded?'is-expanded':''}`}>
    <div className="portal-chapter-row">
     <button type="button" className="portal-chapter-expand" onClick={()=>toggleChapter(chapterNumber)} aria-expanded={isExpanded} aria-controls={`chapter-topics-${chapterNumber}`} aria-label={`${isExpanded?'Collapse':'Expand'} Chapter ${chapterNumber}: ${chapter}`}>
      <span className={`portal-chapter-number color-${i%5} ${complete?'chapter-number-complete':''}`}>{complete?'✓':chapterNumber}</span>
      <span className="portal-chapter-info"><b>{chapter}</b><small>Chapter {chapterNumber} · Foundation 1</small></span>
      <span className="portal-chapter-inline-progress">{completedTopics} of {points.length} topics read</span>
      <span className={`portal-chevron ${isExpanded?'is-open':''}`} aria-hidden="true">›</span>
     </button>
     <Link to={`/student/learning/chapter/${chapterNumber}`} className={`portal-chapter-status ${complete?'is-complete':''}`} onClick={event=>event.stopPropagation()}>{complete?'Review chapter':'Start Chapter →'}</Link>
    </div>
    <div className="portal-chapter-mini-track" role="progressbar" aria-label={`Chapter ${chapterNumber} topic progress`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={topicPercent}><span style={{width:`${topicPercent}%`}} /></div>
    {isExpanded&&<div id={`chapter-topics-${chapterNumber}`} className="portal-chapter-expanded-content"><ChapterTopicProgress chapterNumber={chapterNumber}/></div>}
   </article>;
  })}</div>
  <p className="portal-note">Select a chapter name or arrow to show its topics. Use Start learning to open the chapter lesson.</p>
 </Shell>
}
const chapterOneLessons = [
 {title:'What Is a Computer?', icon:'🖥️', objective:'Learn what a computer is and what it can help us do.', intro:'A computer is an electronic machine that helps us do many tasks quickly. We can use it to learn, draw, play games, listen to music, watch videos, type documents and solve sums.', example:'Computers are used in schools, banks, hospitals and airports.', visual:[['🖥️','Learn'],['🎨','Draw'],['🎵','Listen'],['🧮','Solve sums']], activity:'Which one is a task a computer can help with?', options:['Draw a picture','Grow a tree by itself','Eat lunch'], answer:0, feedback:'A computer can help us draw pictures. It is a useful machine, but it cannot eat lunch or grow a tree by itself.', questions:[{q:'What is a computer?',opts:['An electronic machine','A kind of fruit','A pet'],a:0,why:'A computer is an electronic machine.'},{q:'Where can we find computers?',opts:['Only in space','Schools, banks and hospitals','Only in the sea'],a:1,why:'Computers are used in many places, including schools, banks and hospitals.'}]},
 {title:'Types of Computers',icon:'💻',objective:'Recognise desktop, laptop, tablet, smartphone, smartwatch and smart glasses.',intro:'Computers come in different shapes and sizes. Some stay on a desk. Some can be carried in a bag. Small computers can fit in our hands, and some can be worn.',example:'A desktop is usually placed on a desk. A laptop can be carried. A tablet has a touch screen. A smartphone can make calls. Smartwatches and smart glasses are wearable computers.',visual:[['🖥️','Desktop'],['💻','Laptop'],['📱','Smartphone'],['📲','Tablet'],['⌚','Smartwatch'],['🥽','Smart glasses']],activity:'Which computer is designed to be worn on your wrist?',options:['Desktop','Smartwatch','Tablet'],answer:1,feedback:'A smartwatch is worn on the wrist. It is a wearable computer.',questions:[{q:'Which computer is easy to carry and use on your lap?',opts:['Laptop','Desktop tower only','Printer'],a:0,why:'A laptop is portable and can be used in different places.'},{q:'Which device usually has a large touch screen and no physical keyboard?',opts:['Tablet','UPS','Speaker'],a:0,why:'A tablet is a portable computer with a touch screen.'}]},
 {title:'Parts of a Computer',icon:'🧩',objective:'Name the monitor, CPU/system unit, keyboard and mouse.',intro:'A desktop computer has parts that work together. The monitor shows pictures and words. The keyboard helps us type. The mouse helps us point and click. The CPU processes information and controls computer activities.',example:'Click a part below to learn its name and job.',visual:[['🖥️','Monitor — shows words and pictures'],['🗄️','CPU / System Unit — processes information'],['⌨️','Keyboard — lets us type'],['🖱️','Mouse — helps us point, click and drag']],activity:'Which part do you use to type letters?',options:['Monitor','Keyboard','Mouse'],answer:1,feedback:'The keyboard has keys that we press to type letters and numbers.',questions:[{q:'Which part shows pictures and words?',opts:['Monitor','Keyboard','Mouse'],a:0,why:'The monitor is the computer screen.'},{q:'Which part helps you point and click?',opts:['Mouse','Monitor','CPU case only'],a:0,why:'The mouse is a pointing device.'}]},
 {title:'Other Computer Devices',icon:'🔊',objective:'Learn about a printer, speakers and a UPS.',intro:'Some devices work with a computer to help us do more things.',example:'A printer prints text and pictures on paper. Speakers play sound. A UPS provides backup power for a short time when electricity goes off.',visual:[['🖨️','Printer — prints on paper'],['🔊','Speakers — play sound'],['🔋','UPS — backup power']],activity:'Which device can print your picture on paper?',options:['Speaker','Printer','Mouse'],answer:1,feedback:'A printer can print text and pictures on paper.',questions:[{q:'What do speakers do?',opts:['Play sound','Print pages','Show typing keys'],a:0,why:'Speakers let us hear sound from a computer.'},{q:'What does a UPS provide?',opts:['Backup power','Paper','A touch screen'],a:0,why:'A UPS can provide backup power when electricity goes off.'}]},
 {title:'Turning On a Computer',icon:'⏻',objective:'Remember the safe steps for starting a desktop computer.',intro:'Follow the steps in order when turning on a computer. Your setup may be different, so follow your teacher’s instructions.',example:'1. Connect the computer to a power source. 2. Switch on the UPS if one is used. 3. Press the computer’s power button. 4. Wait for the computer to start. 5. If a login screen appears, enter your details as instructed.',visual:[['🔌','Connect power'],['🔋','Switch on UPS if used'],['⏻','Press power button'],['⏳','Wait for startup'],['🔐','Sign in if asked']],activity:'What should you do after pressing the power button?',options:['Wait for the computer to start','Unplug the computer','Press every key quickly'],answer:0,feedback:'Wait for the computer to finish starting. Never unplug it to make it start faster.',questions:[{q:'What should you do before turning on a desktop?',opts:['Make sure it is connected to power','Pour water on it','Pull out every cable'],a:0,why:'The computer needs a proper power connection.'},{q:'After pressing the power button, you should…',opts:['Wait for it to start','Unplug it immediately','Hit the monitor'],a:0,why:'Give the computer time to start.'}]},
 {title:'Shutting Down a Computer',icon:'🌙',objective:'Learn to close your work and shut down safely.',intro:'Shut down the computer properly so you do not lose your work.',example:'1. Save your documents. 2. Close programs and windows. 3. Open the Start menu. 4. Choose Shut Down. 5. Wait until the computer has fully shut down before switching off power.',visual:[['💾','Save your work'],['✖️','Close programs'],['🪟','Open Start menu'],['🌙','Choose Shut Down'],['⏳','Wait until it turns off']],activity:'What should you do first before shutting down?',options:['Save your work','Unplug the computer','Turn off the monitor only'],answer:0,feedback:'Save your work first so you do not lose it.',questions:[{q:'Which option should you choose in the Start menu?',opts:['Shut Down','Random keys','Delete everything'],a:0,why:'Choose Shut Down to turn the computer off safely.'},{q:'When can you turn off the power?',opts:['After the computer has fully shut down','While files are saving','As soon as you see the desktop'],a:0,why:'Wait until the computer has completely shut down.'}]},
 {title:'Human vs Computer',icon:'🧑‍💻',objective:'Compare people and computers in simple ways.',intro:'People and computers can both do tasks, but they are different. Computers can work very quickly and store lots of information. People have feelings, need food and rest, and can make decisions using their experiences.',example:'The textbook compares speed, power, mistakes, memory, feelings and decision-making. Computers need electricity and people need food, water and rest.',visual:[['🧑','Human'],['🤖','Computer']],activity:'Which one has feelings?',options:['A human','A computer'],answer:0,feedback:'Humans have feelings. Computers can process information, but they do not have human feelings.',questions:[{q:'What does a computer need to work?',opts:['Electricity','Sleep and lunch','Water to drink'],a:0,why:'A computer needs electrical power to operate.'},{q:'Which can get tired and need rest?',opts:['A human','A computer'],a:0,why:'People need rest. Computers do not get tired in the same human way.'}]}
];
function Chapter(){
 const {id}=useParams(); const n=Math.max(1,Math.min(9,Number(id)||1)); const title=chapters[n-1];
 const videoRef=useRef(null);
 const lastVideoSaveRef=useRef(0);
 const [videoProgress, setVideoProgress] = useState(() => readVideoProgress()[n] || { currentTime: 0, duration: 0, percent: 0, completed: false });
 useEffect(() => {
   setVideoProgress(readVideoProgress()[n] || { currentTime: 0, duration: 0, percent: 0, completed: false });
 }, [n]);
 function handleVideoMetadata(event) {
   const video = event.currentTarget;
   const saved = readVideoProgress()[n];
   if (saved?.currentTime > 0 && saved.currentTime < (video.duration || Infinity) - 1) video.currentTime = saved.currentTime;
   if (Number.isFinite(video.duration)) setVideoProgress(previous => ({ ...previous, duration: video.duration }));
 }
 function handleVideoTimeUpdate(event) {
   const video = event.currentTarget;
   if (!Number.isFinite(video.duration) || video.duration <= 0) return;
   const percent = Math.round((video.currentTime / video.duration) * 100);
   const record = { currentTime: video.currentTime, duration: video.duration, percent, completed: percent >= 95 };
   setVideoProgress(record);
   if (Math.abs(video.currentTime - lastVideoSaveRef.current) >= 4) {
     saveVideoProgress(n, record);
     lastVideoSaveRef.current = video.currentTime;
   }
 }
 function handleVideoPause(event) {
   const video = event.currentTarget;
   if (!Number.isFinite(video.duration) || video.duration <= 0) return;
   const percent = Math.round((video.currentTime / video.duration) * 100);
   const record = { currentTime: video.currentTime, duration: video.duration, percent, completed: percent >= 95 };
   setVideoProgress(record);
   saveVideoProgress(n, record);
   lastVideoSaveRef.current = video.currentTime;
 }
 function handleVideoEnded(event) {
   const video = event.currentTarget;
   const record = { currentTime: video.duration || video.currentTime, duration: video.duration || 0, percent: 100, completed: true };
   setVideoProgress(record);
   saveVideoProgress(n, record);
   // Finishing the chapter video automatically marks this chapter complete.
   markChapterCompletedFromVideo(n);
   setCompleted(true);
 }
 function startChapter(){const video=videoRef.current; if(!video)return; video.scrollIntoView({behavior:'smooth',block:'center'}); video.play().catch(()=>{video.focus();});}
 const [topicIndex,setTopicIndex]=useState(0); const [activityAnswers,setActivityAnswers]=useState({}); const [practiceAnswers,setPracticeAnswers]=useState({}); const [quizSubmitted,setQuizSubmitted]=useState(false);
 const [done,setDone]=useState(()=>{try{return JSON.parse(localStorage.getItem(COMPLETED_TOPICS_KEY)||'{}')[n]||[]}catch{return []}});
 const [completed,setCompleted]=useState(()=>readCompletedChapters().includes(n));
 useEffect(()=> {
   try { setDone(JSON.parse(localStorage.getItem(COMPLETED_TOPICS_KEY)||'{}')[n] || []); } catch { setDone([]); }
   setCompleted(readCompletedChapters().includes(n));
   setTopicIndex(0); setActivityAnswers({}); setPracticeAnswers({}); setQuizSubmitted(false);
 }, [n]);
 const lesson=n===1?chapterOneLessons[topicIndex]:null;
 const topics=n===1?chapterOneLessons.map(x=>x.title):(chapterTopics[n-1]||[]).map(x=>({title:x}));
 const quizQuestions=chapterOneLessons.flatMap((l,i)=>l.questions.slice(0,1).map(q=>({...q,topic:i})));
 function saveTopic(index){const current=(()=>{try{return JSON.parse(localStorage.getItem(COMPLETED_TOPICS_KEY)||'{}')}catch{return {}}})();const old=current[n]||[];const next=old.includes(index)?old:[...old,index];current[n]=next;localStorage.setItem(COMPLETED_TOPICS_KEY,JSON.stringify(current));setDone(next);window.dispatchEvent(new Event('vico-progress-updated'))}
 function finishChapter(){const all=chapterOneLessons.every((_,i)=>done.includes(i));const quizScore=quizQuestions.filter((q,i)=>practiceAnswers[`quiz-${i}`]===q.a).length;const activity=(()=>{try{return JSON.parse(localStorage.getItem('vicl-foundation1-activity-progress')||'{}')[n]}catch{return null}})();if(!all||!quizSubmitted||quizScore<Math.ceil(quizQuestions.length*0.7)||!activity?.completed)return;const current=readCompletedChapters();if(!current.includes(n)){localStorage.setItem(COMPLETED_CHAPTERS_KEY,JSON.stringify([...current,n]));setCompleted(true);window.dispatchEvent(new Event('vico-progress-updated'))}}
 const pct=Math.round(done.length/Math.max(1,topics.length)*100);
 const videoPath = `/videos/foundation-1/chapter-${n}.mp4`;
 const posterPath = n === 1 ? '/videos/foundation-1/chapter-1-poster.png' : undefined;
 const videoAndContents = <div className="vicl-video-course-layout">
   <section className="vicl-video-column">
    <div className="vicl-video-frame">
     {videoPath ? <video key={n} ref={videoRef} className="vicl-chapter-video" controls playsInline preload="metadata" poster={posterPath} aria-label={`Chapter ${n} lesson video`} onLoadedMetadata={handleVideoMetadata} onTimeUpdate={handleVideoTimeUpdate} onPause={handleVideoPause} onEnded={handleVideoEnded}><source src={videoPath} type="video/mp4"/>Your browser does not support HTML video.</video> : <div className="vicl-video-placeholder"><span className="vicl-video-play">▶</span><span className="portal-pill">CHAPTER {n} VIDEO</span><h3>{title}</h3><p>The video player is ready for this chapter. Add the exported MP4 file to <code>public/videos/foundation-1/</code> and connect its filename in <code>StudentPortal.jsx</code>.</p></div>}
    </div>
    <div className="vicl-video-caption"><div><span className="portal-progress-eyebrow">FOUNDATION 1 · CHAPTER {n}</span><h2>{title}</h2><p>Watch the animated lesson, then explore each topic and try the practice activities.</p><div className="vicl-video-progress-summary"><span>Video progress: <b>{videoProgress.percent || 0}%</b></span><span>{videoProgress.completed ? '✓ Watched' : videoProgress.currentTime > 0 ? 'Resume available' : 'Not started'}</span></div></div><span className="vicl-video-tag">▶ Video lesson</span></div>
   </section>
   <aside className="vicl-course-contents"><div className="vicl-course-contents-head"><div><h3>Course content</h3><p>Chapter {n} · {topics.length} topics</p></div><span>▤</span></div>
    <div className="vicl-course-chapter-label"><b>{String(n).padStart(2,'0')}: {title}</b><span>{done.length}/{topics.length}</span></div>
    <div className="vicl-course-topic-list">{topics.map((topic,i)=><button type="button" key={typeof topic==='string'?topic:topic.title} className={`vicl-course-topic ${n===1&&topicIndex===i?'current':''} ${done.includes(i)?'completed':''}`} onClick={()=>{if(n===1){setTopicIndex(i);setQuizSubmitted(false);document.querySelector('.vicl-chapter-learning')?.scrollIntoView({behavior:'smooth',block:'start'})}else{document.getElementById(`vicl-topic-${i}`)?.scrollIntoView({behavior:'smooth',block:'center'})}}}><span className="vicl-course-topic-state">{done.includes(i)?'✓':n===1&&topicIndex===i?'▶':i+1}</span><span>{typeof topic==='string'?topic:topic.title}</span><small>{done.includes(i)?'Done':n===1&&topicIndex===i?'Now':''}</small></button>)}</div>
    <div className="vicl-course-sidebar-foot"><span>✦</span><div><b>Keep learning!</b><small>Small steps make big progress.</small></div></div>
   </aside>
  </div>;
 if(n!==1)return <Shell title={`Chapter ${n}`} subtitle={title}><div className="portal-course-banner"><span>📖</span><div><small>FOUNDATION 1 · CHAPTER {n}</small><h2>{title}</h2><p>Explore this chapter's animated lesson and learning topics.</p></div><span className="portal-course-grade">GRADE 1</span><button type="button" className="portal-primary portal-start-chapter" onClick={startChapter}>▶ Start Chapter</button></div>{videoAndContents}<section className="portal-card"><div className="portal-card-head"><div><h2>Topics in this chapter</h2><p>Choose a topic from the course content panel to jump to its learning point.</p></div></div><div className="vicl-topic-preview-grid">{topics.map((topic,i)=><article id={`vicl-topic-${i}`} className="vicl-topic-preview" key={typeof topic==='string'?topic:topic.title}><span>{done.includes(i)?'✓':i+1}</span><div><b>{typeof topic==='string'?topic:topic.title}</b><p>Watch the chapter video, then review this topic with your teacher.</p></div><button type="button" className="portal-outline-button" onClick={()=>{const current=(()=>{try{return JSON.parse(localStorage.getItem(COMPLETED_TOPICS_KEY)||'{}')}catch{return {}}})();const previous=current[n]||[];const next=previous.includes(i)?previous.filter(index=>index!==i):[...previous,i];current[n]=next;localStorage.setItem(COMPLETED_TOPICS_KEY,JSON.stringify(current));setDone(next);window.dispatchEvent(new Event('vico-progress-updated'));}}>{done.includes(i)?'Mark incomplete':'Mark topic complete'}</button></article>)}</div><p className="portal-note">Watch the chapter lesson, then use the course content panel to explore each topic.</p><Link className="portal-outline-button" to="/student/learning">← Back to My Learning</Link></section></Shell>;
 return <Shell title="Chapter 1" subtitle="More about a Computer">
  <div className="portal-course-banner"><span>📖</span><div><small>FOUNDATION 1 · CHAPTER 1</small><h2>More about a Computer</h2><p>Discover computers, learn their parts, and practise using them safely.</p></div><span className="portal-course-grade">GRADE 1</span><button type="button" className="portal-primary portal-start-chapter" onClick={startChapter}>▶ Start Chapter</button></div>
  {videoAndContents}
  <div className="portal-card portal-learning-path-progress"><div className="portal-learning-progress-top"><div><span className="portal-progress-eyebrow">FOUNDATION 1 · GRADE 1</span><h3>Your chapter progress</h3></div><strong>{pct}%</strong></div><div className="portal-learning-progress-track"><span style={{width:`${pct}%`}}/></div><div className="portal-learning-progress-bottom"><span><b>{done.length} of 7</b> topics completed</span><span>{7-done.length} topics left to learn</span></div></div>
  <section className="portal-card vicl-chapter-learning"><div className="portal-card-head"><div><h2>Your learning journey</h2><p>Choose a topic, read the explanation, try the activity, then answer the practice questions.</p></div><span className="portal-pill">TOPIC {topicIndex+1} OF 7</span></div>
   <div className="vicl-topic-tabs">{chapterOneLessons.map((item,i)=><button key={item.title} className={`${topicIndex===i?'active':''} ${done.includes(i)?'done':''}`} onClick={()=>{setTopicIndex(i);setQuizSubmitted(false)}}><span>{done.includes(i)?'✓':i+1}</span>{item.title}</button>)}</div>
   <article className="vicl-lesson-card"><div className="vicl-lesson-heading"><span className="vicl-lesson-icon">{lesson.icon}</span><div><span className="portal-progress-eyebrow">LEARN · TOPIC {topicIndex+1}</span><h2>{lesson.title}</h2><p>{lesson.objective}</p></div></div><div className="vicl-lesson-copy"><h3>Let's learn!</h3><p>{lesson.intro}</p><div className="vicl-example-box"><b>Remember</b><p>{lesson.example}</p></div></div>
    <div className="vicl-visual-grid">{lesson.visual.map(([icon,label])=><div className="vicl-visual-tile" key={label}><span>{icon}</span><b>{label}</b></div>)}</div>
    <div className="vicl-activity"><span className="portal-progress-eyebrow">TRY IT YOURSELF</span><h3>{lesson.activity}</h3><div className="vicl-answer-options">{lesson.options.map((option,i)=><button key={option} className={activityAnswers[topicIndex]===i?'selected':''} onClick={()=>{setActivityAnswers({...activityAnswers,[topicIndex]:i});if(i===lesson.answer){const previous=(()=>{try{return JSON.parse(localStorage.getItem('vicl-foundation1-activity-progress')||'{}')[n]?.topicsCompleted||[]}catch{return []}})();const topicsCompleted=[...new Set([...previous,topicIndex])];saveActivityProgress(n,{topicsCompleted,completed:topicsCompleted.length>=chapterTopics[n-1].length,topicIndex,answer:i});}}}>{option}</button>)}</div>{activityAnswers[topicIndex]!==undefined&&<p className={`vicl-feedback ${activityAnswers[topicIndex]===lesson.answer?'correct':'try-again'}`}>{activityAnswers[topicIndex]===lesson.answer?'✓ Great job! ':'Not quite. '}{lesson.feedback}</p>}</div>
    <div className="vicl-practice"><h3>Quick practice</h3>{lesson.questions.map((q,qi)=><div className="vicl-question" key={q.q}><b>{qi+1}. {q.q}</b><div className="vicl-answer-options">{q.opts.map((option,oi)=><button key={option} className={practiceAnswers[`${topicIndex}-${qi}`]===oi?'selected':''} onClick={()=>setPracticeAnswers({...practiceAnswers,[`${topicIndex}-${qi}`]:oi})}>{option}</button>)}</div>{practiceAnswers[`${topicIndex}-${qi}`]!==undefined&&<p className={`vicl-feedback ${practiceAnswers[`${topicIndex}-${qi}`]===q.a?'correct':'try-again'}`}>{practiceAnswers[`${topicIndex}-${qi}`]===q.a?'✓ Correct!':'Try again.'} {q.why}</p>}</div>)}</div>
    <div className="vicl-lesson-actions"><button className="portal-outline-button" disabled={topicIndex===0} onClick={()=>setTopicIndex(v=>Math.max(0,v-1))}>← Previous topic</button><button className="portal-primary" onClick={()=>{if(activityAnswers[topicIndex]===lesson.answer&&lesson.questions.every((q,qi)=>practiceAnswers[`${topicIndex}-${qi}`]===q.a)){saveTopic(topicIndex);if(topicIndex<6)setTopicIndex(topicIndex+1)}}}>{done.includes(topicIndex)?'Topic completed ✓':'Complete topic & continue →'}</button><button className="portal-outline-button" disabled={topicIndex===6} onClick={()=>setTopicIndex(v=>Math.min(6,v+1))}>Next topic →</button></div>
    <p className="vicl-completion-hint">To complete a topic, answer its activity and all practice questions correctly. You can revisit topics at any time.</p>
   </article>
  </section>
  <section className="portal-card vicl-chapter-quiz"><div className="portal-card-head"><div><h2>Chapter quiz</h2><p>Check what you remember after studying the topics.</p></div><span className="portal-pill">7 QUESTIONS</span></div>{quizSubmitted?<div className="vicl-quiz-result"><span>🏆</span><h3>Quiz complete!</h3><p>You answered {quizQuestions.filter((q,i)=>practiceAnswers[`quiz-${i}`]===q.a).length} out of {quizQuestions.length} questions correctly.</p><button className="portal-outline-button" onClick={()=>setQuizSubmitted(false)}>Try quiz again</button></div>:<><div className="vicl-quiz-list">{quizQuestions.map((q,i)=><div className="vicl-question" key={q.q}><b>{i+1}. {q.q}</b><div className="vicl-answer-options">{q.opts.map((option,oi)=><button key={option} className={practiceAnswers[`quiz-${i}`]===oi?'selected':''} onClick={()=>setPracticeAnswers({...practiceAnswers,[`quiz-${i}`]:oi})}>{option}</button>)}</div></div>)}</div><button className="portal-primary" onClick={()=>{const score=quizQuestions.filter((q,i)=>practiceAnswers[`quiz-${i}`]===q.a).length;saveQuizResult(n,{score,total:quizQuestions.length,attempted:true});setQuizSubmitted(true);}} disabled={quizQuestions.some((_,i)=>practiceAnswers[`quiz-${i}`]===undefined)}>Submit chapter quiz</button></>}</section>
  <div className="vicl-chapter-footer"><button className={`portal-outline-button portal-complete-chapter ${completed?'completed':''}`} disabled={!completed&&(done.length<7||!quizSubmitted||quizQuestions.filter((q,i)=>practiceAnswers[`quiz-${i}`]===q.a).length<Math.ceil(quizQuestions.length*0.7)||!((()=>{try{return JSON.parse(localStorage.getItem('vicl-foundation1-activity-progress')||'{}')[n]?.completed}catch{return false}})()))} onClick={finishChapter}>{completed?'✓ Chapter completed':'Finish chapter'}</button><span>{completed?'Great work! Chapter 1 is complete.':'Complete all seven topics and activities, then score at least 70% on the quiz to finish the chapter.'}</span></div>
  <div className="portal-chapter-pager"><Link to="/student/learning">← Back to My Learning</Link><Link to="/student/exercises/chapter/1">Practise with Exercise 1 →</Link></div>
 </Shell>
}
=======
function Learning(){const [,refresh]=useState(0);useEffect(()=>{const update=()=>refresh(v=>v+1);window.addEventListener('vico-progress-updated',update);return ()=>window.removeEventListener('vico-progress-updated',update)},[]);return <Shell title="My Learning" subtitle="Choose a chapter and learn one small step at a time."><div className="portal-course-banner"><span>📘</span><div><small>YOUR CURRENT COURSE</small><h2>Master Coding & Robotics · Foundation 1</h2><p>9 chapters · Grade 1 · Learn at your own pace</p></div><span className="portal-course-grade">GRADE 1</span></div><div className="portal-card portal-learning-path-progress"><FoundationProgress /></div><div className="portal-chapter-list portal-chapter-topic-list">{chapters.map((chapter,i)=>{const complete=readCompletedChapters().includes(i+1);return <article key={chapter} className="portal-chapter-learning-card"><Link to={`/student/learning/chapter/${i+1}`} className="portal-chapter-row"><span className={`portal-chapter-number color-${i%5} ${complete?'chapter-number-complete':''}`}>{complete ? '✓' : i+1}</span><div className="portal-chapter-info"><b>{chapter}</b><small>Chapter {i+1} · Foundation 1</small></div><span className={`portal-chapter-status ${complete ? 'is-complete' : ''}`}>{complete ? 'Completed' : 'Start learning'}</span><span className="portal-chevron">›</span></Link><ChapterTopicProgress chapterNumber={i+1}/></article>})}</div><p className="portal-note">These are starter learning points based on the chapter titles. Match them to the exact headings in the authorized textbook PDF before publishing the final curriculum.</p></Shell>}
function Chapter(){const {id}=useParams();const n=Math.max(1,Math.min(9,Number(id)||1));const title=chapters[n-1];const [completed,setCompleted]=useState(()=>readCompletedChapters().includes(n));function toggleComplete(){const current=readCompletedChapters();const next=completed?current.filter(ch=>ch!==n):[...new Set([...current,n])];localStorage.setItem(COMPLETED_CHAPTERS_KEY,JSON.stringify(next));setCompleted(!completed);window.dispatchEvent(new Event('vico-progress-updated'))}return <Shell title={`Chapter ${n}`} subtitle={title}><div className="portal-course-banner"><span>📖</span><div><small>FOUNDATION 1 · CHAPTER {n}</small><h2>{title}</h2><p>Follow the lesson, explore examples and practice what you learn.</p></div></div><div className="portal-card portal-learning-path-progress"><FoundationProgress /></div><section className="portal-card"><div className="portal-card-head"><div><h2>Your learning journey</h2><p>Lesson content will follow the Foundation 1 textbook.</p></div></div><div className="portal-lesson-placeholder"><span>🌟</span><h3>Ready to begin?</h3><p>Open the textbook in Study Material to read the original chapter. Lesson-by-lesson interactive content can be added from the corresponding book pages.</p><Link className="portal-primary" to="/student/study-material">Open Study Material →</Link><button className={`portal-outline-button portal-complete-chapter ${completed ? 'completed' : ''}`} onClick={toggleComplete}>{completed ? '✓ Marked complete · Undo' : 'Mark chapter as completed'}</button></div><div className="portal-chapter-pager">{n>1?<Link to={`/student/learning/chapter/${n-1}`}>← Previous chapter</Link>:<span/>}{n<9?<Link to={`/student/learning/chapter/${n+1}`}>Next chapter →</Link>:<Link to="/student/exercises">Go to exercises →</Link>}</div></section></Shell>}
>>>>>>> origin/main
function Exercises(){return <Shell title="Exercises" subtitle="Practise what you learn, chapter by chapter."><div className="portal-course-banner"><span>✏️</span><div><small>FOUNDATION 1 · GRADE 1</small><h2>Chapter exercises</h2><p>Complete activities and see your score on the exercise page.</p></div><span className="portal-course-grade">9 CHAPTERS</span></div><article className="portal-card portal-exercise-feature"><div className="portal-exercise-art">🖥️</div><div className="portal-exercise-copy"><span className="portal-pill">CHAPTER 1 · PAGES 10–12</span><h2>Exercise 1 — More about a Computer</h2><p>Try multiple-choice questions, matching, fill in the blanks, missing letters and a computer-lab activity.</p><div className="portal-exercise-meta"><span>🧩 13 questions / activities</span><span>⭐ Earn points</span><span>📊 Instant result</span></div><Link className="portal-primary" to="/student/exercises/chapter/1">Start Exercise 1 →</Link></div></article><article className="portal-card portal-exercise-feature"><div className="portal-exercise-art">🖱️</div><div className="portal-exercise-copy"><span className="portal-pill">FOUNDATION 1 · EXERCISE 2</span><h2>Exercise 2 — Computer Parts</h2><p>Practise identifying the keyboard, monitor, CPU, printer and mouse with the uploaded interactive quiz. Answer one question at a time and see your score on this same page.</p><div className="portal-exercise-meta"><span>🧩 26 questions</span><span>⭐ Instant feedback</span><span>📊 Final score</span></div><Link className="portal-primary" to="/student/exercises/2">Start Exercise 2 →</Link></div></article><div className="portal-card"><div className="portal-card-head"><div><h2>More chapter exercises</h2><p>Exercises for the remaining chapters can be added as their textbook activities are prepared.</p></div></div><div className="portal-chapter-list">{chapters.slice(1).map((chapter,i)=><div className="portal-chapter-row portal-exercise-disabled" key={chapter}><span className={`portal-chapter-number color-${(i+1)%5}`}>{i+2}</span><div className="portal-chapter-info"><b>{chapter}</b><small>Chapter {i+2} · Exercise content not added yet</small></div><span className="portal-chapter-status">Coming soon</span></div>)}</div></div></Shell>}
function ChapterOneExercise(){return <Shell title="Exercise 1" subtitle="Chapter 1 · More about a Computer"><div className="portal-exercise-toolbar"><Link to="/student/exercises">← Back to Exercises</Link><span>Foundation 1 · Grade 1</span></div><div className="portal-exercise-frame-wrap"><iframe className="portal-exercise-frame" title="Foundation 1 Chapter 1 Exercise" src="/exercises/chapter1/index.html" /></div><p className="portal-note">Your score and completion summary appear inside the exercise when you finish. Exercise results are kept here; the Results & Progress page is reserved for periodic and school test results.</p></Shell>}
function ExerciseTwo(){return <Shell title="Exercise 2" subtitle="Foundation 1 · Computer Parts"><div className="portal-exercise-toolbar"><Link to="/student/exercises">← Back to Exercises</Link><span>Foundation 1 · Grade 1</span></div><div className="portal-exercise-frame-wrap"><iframe className="portal-exercise-frame" title="Foundation 1 Exercise 2 — Computer Parts" src="/exercises/exercise2/index.html" /></div><p className="portal-note">Your answers, feedback, final score and completion summary appear inside this exercise page. Exercise results stay here; Results & Progress is reserved for periodic and school test results.</p></Shell>}
function Tests(){return <Shell title="Periodic Tests 1 & 2" subtitle="Check your test information and prepare with confidence."><div className="portal-test-grid">{[{n:1,title:'Periodic Test 1',icon:'📝',desc:'First periodic assessment',status:'Schedule to be announced'},{n:2,title:'Periodic Test 2',icon:'📋',desc:'Second periodic assessment',status:'Schedule to be announced'}].map(t=><article className="portal-card portal-test-card" key={t.n}><div className="portal-test-icon">{t.icon}</div><span className="portal-pill">TEST {t.n}</span><h2>{t.title}</h2><p>{t.desc}</p><div className="portal-test-detail"><span>📅 Schedule</span><b>{t.status}</b></div><div className="portal-test-detail"><span>📚 Syllabus</span><b>As assigned by teacher</b></div><button className="portal-outline-button" disabled>Test not yet available</button></article>)}</div></Shell>}
function StudyMaterial(){return <Shell title="Study Material" subtitle="Your textbook and learning resources in one place."><article className="portal-book-card"><div className="portal-book-art"><span>📘</span><small>FOUNDATION 1</small><b>MASTER CODING<br/>& ROBOTICS</b><i>Learn · Think · Create</i></div><div className="portal-book-info"><span className="portal-pill">GRADE 1 · TEXTBOOK</span><h2>Master Coding & Robotics — Foundation 1</h2><p>Use the textbook while following the nine-chapter learning path. The original book is provided as a PDF.</p><div className="portal-book-meta"><span>PDF textbook</span><span>9 chapters</span></div><div className="portal-book-actions"><a className="portal-primary" href="/study-material/master-coding-robotics-foundation-1.pdf" target="_blank" rel="noreferrer">Read online ↗</a><a className="portal-outline-button" href="/study-material/master-coding-robotics-foundation-1.pdf" download>↓ Download book</a></div></div></article><p className="portal-note">If the textbook does not open, ask your teacher or administrator to upload the authorized PDF.</p></Shell>}
<<<<<<< HEAD
function Progress(){
 const tests=['Periodic Test 1','Half-yearly Test','Periodic Test 2','Annual Test'];
 const [,refresh]=useState(0);
 useEffect(()=>{const update=()=>refresh(v=>v+1);window.addEventListener('vico-progress-updated',update);return ()=>window.removeEventListener('vico-progress-updated',update)},[]);
 const topicCounts=chapterTopics.map(points=>points.length);
 const records=chapters.map((title,index)=>({title,...getChapterProgress(index+1,topicCounts)}));
 return <Shell title="Results & Progress" subtitle="Track your lessons, activities, quizzes, and school assessments.">
  <section className="portal-card">
   <div className="portal-card-head"><div><h2>Foundation 1 learning progress</h2><p>Progress is updated as you watch videos, complete topics and activities, and submit quizzes.</p></div></div>
   <div className="portal-progress-table-wrap"><table className="portal-progress-table"><thead><tr><th>Chapter</th><th>Video</th><th>Topics</th><th>Activity</th><th>Quiz score</th><th>Status</th></tr></thead>
   <tbody>{records.map(record=><tr key={record.chapter}><td><Link to={`/student/learning/chapter/${record.chapter}`}>Chapter {record.chapter}: {record.title}</Link></td><td>{record.videoCompleted?'✓ Watched':`${record.videoPercent}%`}</td><td>{record.completedTopics}/{record.totalTopics}</td><td>{record.activityComplete?'Completed':'Not completed'}</td><td>{record.quizScore}</td><td><span className={`portal-progress-status ${record.status.toLowerCase().replace(' ','-')}`}>{record.status}</span></td></tr>)}</tbody></table></div>
   <p className="portal-note">A chapter is marked Completed when all topics are complete, its activity is completed, and a quiz score of at least 70% is recorded. Some chapter quizzes are not yet implemented, so those chapters cannot currently reach Completed status.</p>
  </section>
  <section className="portal-card"><div className="portal-card-head"><div><h2>School test results</h2><p>Formal assessment results published by your school appear here.</p></div></div><div className="portal-result-list">{tests.map((t,i)=><div className="portal-result-row" key={t}><span className="portal-result-num">{i+1}</span><b>{t}</b><span className="portal-result-pending">Awaiting result</span></div>)}</div></section>
 </Shell>
}
=======
function Progress(){const tests=['Periodic Test 1','Half-yearly Test','Periodic Test 2','Annual Test'];return <Shell title="Results & Progress" subtitle="View results published for your school assessments."><section className="portal-card"><div className="portal-card-head"><div><h2>Test results</h2><p>Only periodic and school test results appear here. Exercise scores are shown on each exercise page.</p></div></div><div className="portal-result-list">{tests.map((t,i)=><div className="portal-result-row" key={t}><span className="portal-result-num">{i+1}</span><b>{t}</b><span className="portal-result-pending">Awaiting result</span></div>)}</div></section></Shell>}
>>>>>>> origin/main
export default function StudentPortal({page}){const pages={dashboard:<Dashboard/>,learning:<Learning/>,exercises:<Exercises/>,chapter1exercise:<ChapterOneExercise/>,exercise2:<ExerciseTwo/>,tests:<Tests/>,material:<StudyMaterial/>,progress:<Progress/>};return page==='chapter'?<Chapter/>:pages[page]||<Dashboard/>}
