export default function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button
      type="button"
      className={`vico-btn vico-btn-${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
