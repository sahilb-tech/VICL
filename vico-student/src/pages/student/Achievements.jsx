import Card from '../../components/common/Card';
import AchievementCard from '../../components/student/AchievementCard';
import { getAchievements } from '../../services/progressService';

export default function Achievements() {
  const achievements = getAchievements();

  return (
    <div className="page-stack">
      <Card title="Achievements" subtitle="Milestones from your learning journey">
        <div className="stacked-list">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.title} achievement={achievement} />
          ))}
        </div>
      </Card>
    </div>
  );
}
