import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Card from '../../components/common/Card';
import StateMessage from '../../components/common/StateMessage';
import { getLessonContent } from '../../services/curriculumService';
import { recordActivityCompletion } from '../../services/progressService';

export default function ActivityPage() {
  const { activityId } = useParams();
  const lesson = getLessonContent(activityId);
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleCheck = () => {
    if (!selected) return;
    setChecked(true);

    if (selected === lesson.interactiveActivity.correctAnswer) {
      recordActivityCompletion({ lessonId: lesson.id, activityId });
      setCompleted(true);
    }
  };

  if (!lesson) {
    return <StateMessage type="error" title="Activity not found" message="This learning activity is not available." />;
  }

  return (
    <div className="page-stack">
      <Card title={lesson.interactiveActivity.title} subtitle={lesson.topic}>
        <div className="activity-panel">
          <p>{lesson.interactiveActivity.description}</p>
          <div className="choice-grid">
            {lesson.interactiveActivity.choices.map((choice) => (
              <button
                key={choice}
                type="button"
                className={`choice-button ${selected === choice ? 'selected' : ''} ${checked && selected === choice && selected !== lesson.interactiveActivity.correctAnswer ? 'incorrect' : ''}`}
                onClick={() => {
                  setSelected(choice);
                  setChecked(false);
                  setCompleted(false);
                }}
              >
                {choice}
              </button>
            ))}
          </div>

          {completed ? (
            <p className="success-message">Great job! You completed the activity.</p>
          ) : checked && selected !== lesson.interactiveActivity.correctAnswer ? (
            <p className="error-message" role="alert">Wrong answer. Try again.</p>
          ) : checked ? (
            <p className="success-message" role="status">Correct answer. Click Next to continue.</p>
          ) : (
            <p className="helper-text">Select the correct answer to continue.</p>
          )}
        </div>
      </Card>

      <div className="action-row">
        {!completed && (
          <button type="button" className="vico-btn vico-btn-primary" onClick={handleCheck} disabled={!selected}>
            Check answer
          </button>
        )}
        {completed && (
          <Link to={`/student/practice/${lesson.id}`} className="vico-btn vico-btn-primary">Next</Link>
        )}
      </div>
    </div>
  );
}
