const AUTH_KEY = 'vico-student-auth';

const mockStudent = {
  id: 'student-001',
  name: 'Aarav Sharma',
  email: 'aarav@vico.app',
  grade: 1,
  foundationId: 'foundation-1',
  profileImage: 'AS',
  createdAt: '2026-09-01',
};

export function loginStudent({ email, password }) {
  const trimmedEmail = String(email || '').trim();
  const trimmedPassword = String(password || '').trim();

  if (!trimmedEmail || !trimmedPassword) {
    return { success: false, message: 'Enter your email and password to continue.' };
  }

  if (trimmedEmail.includes('@') && trimmedPassword.length >= 4) {
    const session = {
      authenticated: true,
      user: mockStudent,
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { success: true, user: mockStudent };
  }

  return { success: false, message: 'The demo account is not recognized. Use any valid email plus a 4+ character password.' };
}

export function logoutStudent() {
  localStorage.removeItem(AUTH_KEY);
}

export function getStudentSession() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isStudentAuthenticated() {
  return Boolean(getStudentSession()?.authenticated);
}

export function getMockStudent() {
  return mockStudent;
}
