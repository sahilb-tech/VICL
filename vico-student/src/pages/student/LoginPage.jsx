import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginStudent } from '../../services/authService';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('aarav@vico.app');
  const [password, setPassword] = useState('vico123');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = loginStudent({ email, password });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate('/student/dashboard');
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="logo-mark">V</div>
          <div>
            <strong>VICO</strong>
            <span>Visual & Interactive Computer Learning</span>
          </div>
        </div>

        <h1>Student Login</h1>
        <p className="auth-intro">Continue your learning journey with Grade 1 Foundation 1.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@vico.app" />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </label>

          {error && <p className="field-error">{error}</p>}

          <button type="submit" className="vico-btn vico-btn-primary full-width">
            Login to VICO
          </button>
        </form>
      </div>
    </div>
  );
}
