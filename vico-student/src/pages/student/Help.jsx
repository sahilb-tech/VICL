import Card from '../../components/common/Card';

const faqs = [
  {
    question: 'How do I start learning?',
    answer: 'Open My Learning, choose the latest unlocked lesson, and follow the story, explanation, activity, practice, and quiz sequence.',
  },
  {
    question: 'How do activities work?',
    answer: 'Each lesson includes a short interactive task. Complete the task to unlock the next step and continue the learning flow.',
  },
  {
    question: 'How is my progress saved?',
    answer: 'Your student progress is tracked in the dashboard and progress pages so you can continue learning from where you left off.',
  },
];

export default function Help() {
  return (
    <div className="page-stack">
      <Card title="Help & Support" subtitle="Student learning guidance and FAQ">
        <div className="faq-list">
          {faqs.map((item) => (
            <div key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
