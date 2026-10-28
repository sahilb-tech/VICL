import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import StateMessage from '../../components/common/StateMessage';
import { getCurriculumByGrade } from '../../services/curriculumService';
import { getMockStudent } from '../../services/authService';
import { getProgressOverview } from '../../services/progressService';

export default function MyLearning() {
  const student = getMockStudent();
  const foundation = getCurriculumByGrade(student.grade);
  const progress = getProgressOverview(student.grade);

  if (!foundation || !foundation.chapters.length || !progress) {
    return (
      <div className="page-stack">
        <StateMessage type="empty" title="No curriculum assigned" message={`Grade ${student.grade} does not have an available Foundation yet.`} />
      </div>
    );
  }

  return (
    <div className="page-stack">
      <Card title="My Learning" subtitle={`Grade ${student.grade} • ${foundation.name}`}>
        <div className="foundation-panel">
          <div>
            <span className="eyebrow">Current pathway</span>
            <h3>{foundation.name}</h3>
            <p>{foundation.description}</p>
          </div>
          <Link to={`/student/foundation/${foundation.id}`} className="vico-btn vico-btn-primary">
            View foundation
          </Link>
        </div>
      </Card>

      {foundation.chapters.map((chapter) => (
        <Card key={chapter.id} title={chapter.title} subtitle={chapter.description}>
          <div className="lesson-list">
            {chapter.lessons.map((lesson) => {
              const lessonState = progress.lessons.find((item) => item.id === lesson.id) || lesson;
              return (
              <div key={lesson.id} className={`lesson-item ${lessonState.status.toLowerCase().replace(/\s+/g, '-')}`}>
                <div>
                  <strong>{lesson.title}</strong>
                  <small>{lesson.type}</small>
                </div>
                <div className="lesson-meta">
                  <span>{lesson.duration}</span>
                  <span className="status-pill">{lessonState.status}</span>
                </div>
                <Link to={`/student/lesson/${lesson.id}`} className="vico-link" aria-disabled={lessonState.status === 'Locked'}>
                  {lessonState.status === 'Locked' ? 'Locked' : 'Open'}
                </Link>
              </div>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}
