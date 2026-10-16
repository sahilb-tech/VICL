import { Link, useParams } from 'react-router-dom';
import Card from '../../components/common/Card';
import StateMessage from '../../components/common/StateMessage';
import { getLessonContent } from '../../services/curriculumService';

export default function LessonDetail() {
  const { lessonId } = useParams();
  const lesson = getLessonContent(lessonId);

  if (!lesson) {
    return <StateMessage type="error" title="Lesson not found" message="This lesson is not available in your assigned curriculum." />;
  }

  return (
    <div className="page-stack">
      <Card title={lesson.title} subtitle={`${lesson.foundation} • ${lesson.chapter}`}>
        <div className="lesson-detail-wrap">
          <div className="lesson-detail-main">
            <h3>Story / Hook</h3>
            <p>{lesson.story}</p>

            <h3>Visual explanation</h3>
            <p>{lesson.visualExplanation}</p>

            <h3>Animation / demonstration</h3>
            <p>{lesson.animation}</p>

            <h3>Practice</h3>
            <p>{lesson.practice}</p>
          </div>

          <div className="lesson-aside">
            <div className="mini-panel">
              <span className="eyebrow">Next learning step</span>
              <strong>{lesson.interactiveActivity.title}</strong>
            </div>
            <div className="mini-panel">
              <span className="eyebrow">Progress</span>
              <strong>{lesson.progress}%</strong>
            </div>
          </div>
        </div>
      </Card>

      <div className="action-row">
        <Link to={`/student/activity/${lesson.id}`} className="vico-btn vico-btn-primary">Start activity</Link>
        <Link to={`/student/quiz/${lesson.quiz.id}`} className="vico-btn vico-btn-secondary">Take quiz</Link>
      </div>
    </div>
  );
}
