import { Link, useParams } from 'react-router-dom';
import Card from '../../components/common/Card';
import StateMessage from '../../components/common/StateMessage';
import { getQuizResult } from '../../services/progressService';

export default function QuizResultPage() {
  const { resultId } = useParams();

  const result = getQuizResult(resultId);

  if (!result) {
    return (
      <div className="page-stack">
        <StateMessage type="empty" title="No result saved yet" message="Complete the quiz to see your score and progress update." />
      </div>
    );
  }

  return (
    <div className="page-stack">
      <Card title="Quiz result" subtitle={`Result ${resultId}`}>
        <div className="result-box">
          <div className="score-ring">{result.percentage}%</div>
          <div>
            <h3>{result.percentage < 75 ? 'Keep practicing!' : 'Great effort!'}</h3>
            <p>You answered {result.correct} out of {result.total} questions correctly. Your topic, chapter, foundation, and dashboard progress are now updated.</p>
            {result.percentage < 75 && <p className="retry-note">Score 75% or higher to complete this quiz.</p>}
          </div>
        </div>
      </Card>

      <div className="action-row">
        <Link to="/student/dashboard" className="vico-btn vico-btn-primary">Back to dashboard</Link>
        {result.percentage < 75 && (
          <Link to={`/student/quiz/${resultId}`} className="vico-btn vico-btn-secondary">Start again</Link>
        )}
        <Link to="/student/learning" className="vico-btn vico-btn-secondary">Continue learning</Link>
      </div>
    </div>
  );
}
