import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ContinueLearning from '../../components/student/ContinueLearning';
import ProgressCard from '../../components/student/ProgressCard';
import AchievementCard from '../../components/student/AchievementCard';
import NotificationCard from '../../components/student/NotificationCard';
import StateMessage from '../../components/common/StateMessage';
import { getStudentOverview } from '../../services/studentService';
import { getProgressOverview, getAchievements } from '../../services/progressService';
import { getNotifications } from '../../services/notificationService';
import { getCurriculumByGrade } from '../../services/curriculumService';

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

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">Welcome back</span>
          <h2>{student.name}</h2>
          <p>Grade {student.grade} • {student.foundationLabel}</p>
        </div>
        <div className="hero-panel-stats">
          <div>
            <strong>{progress.todayMinutes} min</strong>
            <span>Today</span>
          </div>
          <div>
            <strong>{progress.overall}%</strong>
            <span>Progress</span>
          </div>
        </div>
      </section>

      <div className="stats-grid">
        <Card title="Grade" subtitle="Current level">
          <p className="metric-value">{student.grade}</p>
        </Card>
        <Card title="Assigned Foundation" subtitle="Primary path">
          <p className="metric-value">{student.foundationLabel}</p>
        </Card>
        <Card title="Current chapter" subtitle="Active learning">
          <p className="metric-value">Chapter 1</p>
        </Card>
        <Card title="Daily goal" subtitle="Learning target">
          <p className="metric-value">{progress.todayMinutes}/{student.dailyGoal} min</p>
        </Card>
      </div>

      <div className="content-grid">
        <div className="column-lg">
          <ContinueLearning lesson={lesson} />

          <Card title="Overall learning progress" subtitle="Your momentum this week">
            <div className="stacked-progress">
              <ProgressCard label="Foundation progress" value={progress.foundation} />
              <ProgressCard label="Lessons completed" value={progress.overall} accent="green" />
            </div>
          </Card>

          <Card title="Recent activity" subtitle="Latest learning updates">
            <ul className="list-clean">
              {progress.recentActivity.length ? progress.recentActivity.map((item) => (
                <li key={`${item.title}-${item.time}`} className="list-row">
                  <span>{item.title}</span>
                  <small>{item.type}</small>
                </li>
              )) : <li><StateMessage title="No activity yet" message="Complete the first activity to see your learning history." /></li>}
            </ul>
          </Card>
        </div>

        <div className="column-sm">
          <Card title="Notifications" subtitle="Latest updates">
            <div className="stacked-list">
              {notifications.slice(0, 2).map((item) => (
                <NotificationCard key={item.id} notification={item} />
              ))}
            </div>
          </Card>

          <Card title="Achievements" subtitle="Milestones unlocked">
            <div className="stacked-list">
              {achievements.slice(0, 2).map((item) => (
                <AchievementCard key={item.title} achievement={item} />
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="action-row">
        <Link to="/student/learning" className="vico-btn vico-btn-primary">Open My Learning</Link>
        <Button variant="secondary">Review progress</Button>
      </div>
    </div>
  );
}
