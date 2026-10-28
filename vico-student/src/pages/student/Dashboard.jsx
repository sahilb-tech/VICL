import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import ContinueLearning from '../../components/student/ContinueLearning';
import AchievementCard from '../../components/student/AchievementCard';
import NotificationCard from '../../components/student/NotificationCard';
import StateMessage from '../../components/common/StateMessage';
import { getStudentOverview } from '../../services/studentService';
import { getProgressOverview, getAchievements } from '../../services/progressService';
import { getNotifications } from '../../services/notificationService';
import { getCurriculumByGrade } from '../../services/curriculumService';

const foundationOneChapters = [
  'More about a Computer',
  'Applications of Computers',
  'Keyboard and Mouse',
  'Parts of a Computer',
  'IPO Cycle',
  'Fun with Tux Paint',
  'Sequencing and Decoding',
  'Instructions and Direction Sense',
  'AI and Robotics',
];

export default function Dashboard() {
  const student = getStudentOverview();
  const progress = getProgressOverview(student.grade);
  const achievements = getAchievements();
  const notifications = getNotifications();
  const foundation = getCurriculumByGrade(student.grade);
  const lesson = foundation?.chapters?.[0]?.lessons?.find((item) => item.status !== 'Locked');

  if (!foundation || !foundation.chapters.length || !progress) {
    return (
      <div className="page-stack">
        <StateMessage type="empty" title="Your foundation is not available yet" message={`There is no curriculum assigned for Grade ${student.grade}.`} />
      </div>
    );
  }

  const chapterOneProgress = progress.chapterProgress?.[0]?.value ?? 0;
  const chartChapters = foundationOneChapters.map((title, index) => ({
    number: index + 1,
    title,
    value: index === 0 ? chapterOneProgress : 0,
    status: index === 0 ? (chapterOneProgress > 0 ? 'In progress' : 'Not started') : 'Not started',
  }));

  return (
    <div className="page-stack dashboard-page">
      <section className="dashboard-welcome">
        <div className="dashboard-welcome-copy">
          <span className="eyebrow">Welcome back, learner!</span>
          <h2>Small steps today,<br />big skills tomorrow.</h2>
          <p>Your next adventure is waiting. Let’s learn something new!</p>
          <Link to="/student/learning" className="vico-btn vico-btn-primary">Continue learning <span aria-hidden="true">→</span></Link>
        </div>
        <div className="dashboard-welcome-art" aria-hidden="true"><span>🧑‍💻</span><span className="welcome-books">📚</span><span className="welcome-sparkle">✦</span></div>
      </section>

      <section className="dashboard-summary-grid" aria-label="Learning summary">
        <Link to="/student/learning" className="dashboard-summary-card">
          <span className="summary-icon purple">🎓</span><span className="summary-copy"><small>Current foundation</small><strong>{student.foundationLabel || 'Foundation 1'}</strong><small>Grade {student.grade}</small></span>
        </Link>
        <Link to="/student/learning" className="dashboard-summary-card">
          <span className="summary-icon blue">📖</span><span className="summary-copy"><small>Current chapter</small><strong>Chapter 1</strong><small>{foundationOneChapters[0]}</small></span><span className="summary-arrow" aria-label="Open My Learning">→</span>
        </Link>
        <div className="dashboard-summary-card">
          <span className="summary-icon yellow">⭐</span><span className="summary-copy"><small>Learning points</small><strong>{progress.overall > 0 ? `${progress.overall} points earned` : "Let's get started!"}</strong><small>Earn points as you learn</small></span>
        </div>
      </section>

      <Card title="Foundation 1 learning progress" subtitle="Your progress across all 9 chapters in the book">
        <div className="book-progress-header">
          <div><strong>{progress.foundation}%</strong><span>overall book progress</span></div>
          <div className="book-progress-track" role="progressbar" aria-label="Foundation 1 overall book progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress.foundation}><span style={{ width: `${progress.foundation}%` }} /></div>
        </div>
        <div className="chapter-progress-chart" role="img" aria-label="Chapter progress chart for all nine Foundation 1 chapters">
          {chartChapters.map((chapter) => (
            <Link to="/student/learning" className="chapter-progress-column" key={chapter.number} title={`Chapter ${chapter.number}: ${chapter.title} — ${chapter.value}%`}>
              <div className="chapter-bar-area"><span className={`chapter-bar ${chapter.value > 0 ? 'has-progress' : ''}`} style={{ height: `${Math.max(chapter.value, 3)}%` }} /></div>
              <strong>{String(chapter.number).padStart(2, '0')}</strong>
              <small>{chapter.value}%</small>
            </Link>
          ))}
        </div>
        <div className="chart-legend"><span><i className="legend-dot complete" /> Progress recorded</span><span><i className="legend-dot pending" /> Not started / no progress recorded</span></div>
      </Card>

      <Card title="Up next in Foundation 1" subtitle="Continue your learning journey with the next chapters">
        <div className="up-next-header"><span>After Chapter 1</span><Link to="/student/learning" className="vico-link">View all chapters <span aria-hidden="true">→</span></Link></div>
        <div className="up-next-grid">
          {foundationOneChapters.slice(1, 4).map((chapter, index) => (
            <Link to="/student/learning" className="up-next-chapter" key={chapter}>
              <span className="chapter-number">{String(index + 2).padStart(2, '0')}</span><strong>{chapter}</strong><span className="chapter-link-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </Card>

      <div className="content-grid">
        <div className="column-lg">
          <Card title="Pick up where you left off" subtitle="Jump back into your current lesson">
            {lesson ? <ContinueLearning lesson={lesson} /> : <StateMessage title="Ready to begin?" message="Open My Learning to start Chapter 1." />}
            <Link to="/student/learning" className="vico-btn vico-btn-primary dashboard-learning-cta">Go to My Learning <span aria-hidden="true">→</span></Link>
          </Card>
        </div>
        <div className="column-sm">
          <Card title="Notifications" subtitle="Latest updates"><div className="stacked-list">{notifications.slice(0, 2).map((item) => <NotificationCard key={item.id} notification={item} />)}</div></Card>
          <Card title="Achievements" subtitle="Milestones unlocked"><div className="stacked-list">{achievements.slice(0, 2).map((item) => <AchievementCard key={item.title} achievement={item} />)}</div></Card>
        </div>
      </div>
    </div>
  );
}
