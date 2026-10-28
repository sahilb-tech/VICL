import Card from '../../components/common/Card';

const discoverCards = [
  { title: 'Computer Parts', description: 'Explore monitor, keyboard, mouse and CPU basics.', tag: 'Foundation 1' },
  { title: 'Typing Practice', description: 'Learn how to use the keyboard with guided steps.', tag: 'Practice' },
  { title: 'File Explorer', description: 'See how files and folders are organized on a desktop.', tag: 'Learning path' },
  { title: 'Mouse Skills', description: 'Build confidence with click, scroll and drag actions.', tag: 'Interactive' },
];

export default function Explore() {
  return (
    <div className="page-stack">
      <Card title="Explore" subtitle="Additional learning content for curious learners">
        <div className="explore-grid">
          {discoverCards.map((item) => (
            <article key={item.title} className="explore-card">
              <span className="eyebrow">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
