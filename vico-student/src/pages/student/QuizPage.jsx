import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/common/Card';
import StateMessage from '../../components/common/StateMessage';
import { getLessonContent } from '../../services/curriculumService';
import { recordQuizResult } from '../../services/progressService';

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const lesson = quizId === 'quiz-what-is-machine' ? getLessonContent('lesson-what-is-machine') : null;
  const questions = lesson?.quiz?.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const currentQuestion = questions[currentIndex];

  if (!lesson || !currentQuestion) {
    return (
      <div className="page-stack">
        <StateMessage type="empty" title="Quiz not available" message="This quiz is not available in your assigned learning path." />
      </div>
    );
  }

  const handleAnswer = (option) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleNext = () => {
    if (!answers[currentQuestion.id]) return;
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    recordQuizResult({ quizId, lessonId: lesson.id, answers, questions });
    navigate(`/student/result/${quizId}`);
  };

  return (
    <div className="page-stack">
      <Card title={lesson.quiz.title} subtitle={`Question ${currentIndex + 1} of ${questions.length}`}>
        <div className="quiz-panel">
          <span className="eyebrow">Test</span>
          <h3>{currentQuestion.text}</h3>
          <div className="choice-grid vertical">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                type="button"
                className={`choice-button ${answers[currentQuestion.id] === option ? 'selected' : ''}`}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="action-row">
            <button type="button" className="vico-btn vico-btn-primary" onClick={handleNext} disabled={!answers[currentQuestion.id]}>
              {currentIndex === questions.length - 1 ? 'Submit quiz' : 'Next question'}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
