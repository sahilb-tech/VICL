export default function ProtectedRoleCard({ title, description, action, onClick }) {
  return (
    <button className="role-card" onClick={onClick}>
      <span className="role-card-title">{title}</span>
      <span className="role-card-description">{description}</span>
      <span className="role-card-action">{action} →</span>
    </button>
  );
}
