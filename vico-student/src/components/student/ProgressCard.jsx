export default function ProgressCard({ label, value, accent = 'purple' }) {
  return (
    <div className="progress-card">
      <div className="progress-header">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="progress-track">
        <span className={`progress-fill ${accent}` } style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
