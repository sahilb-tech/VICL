import { Link } from 'react-router-dom';

export default function ContinueLearning({ lesson }) {
  if (!lesson) return null;

  return (
    <div className="continue-card">
      <div>
        <span className="eyebrow">Continue learning</span>
        <h3>{lesson.title}</h3>
        <p>{lesson.chapter || 'Chapter 1: The Super Machine: Computer'}</p>
      </div>
      <Link to={`/student/lesson/${lesson.id}`} className="vico-btn vico-btn-primary">
        Resume
      </Link>
    </div>
  );
}
