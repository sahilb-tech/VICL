import Card from '../../components/common/Card';
import { getStudentProfile } from '../../services/studentService';

export default function Profile() {
  const profile = getStudentProfile();

  return (
    <div className="page-stack">
      <Card title="Profile" subtitle="Student identity and learning details">
        <div className="profile-panel">
          <div className="profile-avatar">{profile.profileImage}</div>
          <div>
            <h3>{profile.name}</h3>
            <p>{profile.email}</p>
            <p>Grade {profile.grade} • {profile.foundation}</p>
          </div>
        </div>
      </Card>

      <div className="stats-grid compact">
        <Card title="Lessons completed" subtitle="Finished">
          <p className="metric-value">{profile.learningStats.lessonsCompleted}</p>
        </Card>
        <Card title="Quizzes" subtitle="Completed">
          <p className="metric-value">{profile.learningStats.quizzesCompleted}</p>
        </Card>
        <Card title="Streak" subtitle="Current streak">
          <p className="metric-value">{profile.learningStats.streak} days</p>
        </Card>
      </div>
    </div>
  );
}
