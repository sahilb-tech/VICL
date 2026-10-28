import Card from '../../components/common/Card';
import StateMessage from '../../components/common/StateMessage';
import ProgressCard from '../../components/student/ProgressCard';
import { getProgressOverview } from '../../services/progressService';

export default function Progress() {
  const progress = getProgressOverview();

  if (!progress) {
    return <StateMessage type="empty" title="Progress is not available" message="A foundation must be assigned before progress can be calculated." />;
  }

  return (
    <div className="page-stack">
      <Card title="My Progress" subtitle="Foundation overview and learning status">
        <div className="stacked-progress">
          <ProgressCard label="Overall progress" value={progress.overall} />
          <ProgressCard label="Foundation results" value={progress.foundation} accent="green" />
        </div>
      </Card>

      <Card title="Chapter progress" subtitle="Current areas of focus">
        <div className="stacked-progress">
          {progress.chapterProgress.map((chapter) => (
            <ProgressCard key={chapter.label} label={chapter.label} value={chapter.value} accent="peach" />
          ))}
        </div>
      </Card>

      <Card title="Topic and lesson progress" subtitle="Calculated from your completed activities and quizzes">
        <ul className="list-clean">
          {progress.lessons.map((lesson) => (
            <li key={lesson.title} className="list-row">
              <span>
                {lesson.title}
                <small className="list-row-detail">{lesson.progress}% complete</small>
              </span>
              <span className="status-pill">{lesson.status}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
