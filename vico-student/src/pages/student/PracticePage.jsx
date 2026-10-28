import { Link, useParams } from 'react-router-dom';
import Card from '../../components/common/Card';
import { getLessonContent } from '../../services/curriculumService';

export default function PracticePage() {
  const { practiceId } = useParams();
  const lesson = getLessonContent(practiceId);

  return (
    <div className="page-stack">
      <Card title="Practice" subtitle={lesson.title}>
        <div className="practice-panel">
          <p>{lesson.practice}</p>
          <div className="practice-box">
            <strong>Try this task</strong>
            <span>Say the sentence aloud and then move to the quiz.</span>
          </div>
        </div>
      </Card>

      <div className="action-row">
        <Link to={`/student/quiz/${lesson.quiz.id}`} className="vico-btn vico-btn-primary">Take quiz</Link>
      </div>
    </div>
  );
}
