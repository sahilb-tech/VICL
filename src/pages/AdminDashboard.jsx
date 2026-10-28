import Logo from '../components/Logo';

const cards = [
  ['Students', '0'],
  ['Lessons', '5'],
  ['Quizzes', '0'],
  ['Results', '0']
];

export default function AdminDashboard() {
  return (
    <div className="app-shell">
      <header className="topbar"><Logo /><nav className="topnav"><a href="#students">Students</a><a href="#lessons">Lessons</a><a href="#quizzes">Quizzes</a><a href="#results">Results</a><a href="/login">Logout</a></nav></header>
      <main className="dashboard-content">
        <section className="admin-heading"><span className="eyebrow">Admin Dashboard</span><h1>Manage VICL</h1><p>Maintain students, learning content, quizzes and results from one place.</p></section>
        <div className="stat-grid">{cards.map(([label, value]) => <div className="stat-card" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
        <section className="management-grid">
          {['Student Management', 'Lesson Management', 'Visual Content', 'Quiz Management', 'Results Management'].map((item) => <div className="management-card" key={item}><h3>{item}</h3><p>Management screen foundation is ready for the next backend-connected phase.</p><button className="secondary-button disabled">Coming next</button></div>)}
        </section>
      </main>
    </div>
  );
}
