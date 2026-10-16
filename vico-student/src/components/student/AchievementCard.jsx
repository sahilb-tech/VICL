export default function AchievementCard({ achievement }) {
  return (
    <article className={`achievement-card ${achievement.unlocked ? 'unlocked' : ''}`}>
      <div className="achievement-icon" aria-hidden="true">{achievement.icon}</div>
      <div>
        <h3>{achievement.title}</h3>
        <p>{achievement.description}</p>
      </div>
      <span className="achievement-state">{achievement.unlocked ? 'Unlocked' : 'Locked'}</span>
    </article>
  );
}
