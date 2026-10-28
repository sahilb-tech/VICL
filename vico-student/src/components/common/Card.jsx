export default function Card({ title, subtitle, children, className = '', action }) {
  return (
    <section className={`vico-card ${className}`.trim()}>
      {(title || subtitle || action) && (
        <div className="vico-card-header">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
