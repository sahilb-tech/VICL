import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    // Phase 1 placeholder: real JWT authentication is implemented in the backend next.
    navigate(role === 'student' ? '/student/dashboard' : '/admin/dashboard');
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="auth-visual-inner">
          <Logo />
          <div className="hero-copy">
            <span className="eyebrow">Visual & Interactive Learning</span>
            <h1>Learn computers by seeing, doing and practicing.</h1>
            <p>
              VICL helps beginners understand computer concepts through visual explanations,
              demonstrations, interactive practice and simple tests.
            </p>
            <div className="learning-path">
              {['See', 'Understand', 'Interact', 'Practice', 'Test'].map((step, index) => (
                <div className="path-step" key={step}>
                  <span>{index + 1}</span>{step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <form className="login-card" onSubmit={submit}>
          <div className="login-heading">
            <span className="eyebrow">Welcome to VICL</span>
            <h2>Sign in</h2>
            <p>Choose your account type to continue.</p>
          </div>

          <div className="role-switch" aria-label="Account type">
            <button type="button" className={role === 'student' ? 'active' : ''} onClick={() => setRole('student')}>
              Student
            </button>
            <button type="button" className={role === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}>
              Admin
            </button>
          </div>

          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
          </label>

          {error && <div className="form-error">{error}</div>}

          <button className="primary-button" type="submit">Login</button>

          <p className="small-note">
            Prototype foundation: backend authentication will replace this temporary navigation in the next implementation step.
          </p>
        </form>
      </section>
    </main>
  );
}
