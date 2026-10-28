import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Lesson from './pages/Lesson';
import StudentPortal from './pages/StudentPortal';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
      <Route path="/student/dashboard" element={<StudentPortal page="dashboard" />} />
      <Route path="/student/learning" element={<StudentPortal page="learning" />} />
      <Route path="/student/learning/chapter/:id" element={<StudentPortal page="chapter" />} />
      <Route path="/student/assignments" element={<Navigate to="/student/exercises" replace />} />
      <Route path="/student/exercises" element={<StudentPortal page="exercises" />} />
      <Route path="/student/exercises/chapter/1" element={<StudentPortal page="chapter1exercise" />} />
      <Route path="/student/exercises/2" element={<StudentPortal page="exercise2" />} />
      <Route path="/student/exercises/chapter/2" element={<StudentPortal page="exercise2" />} />
      <Route path="/student/periodic-tests" element={<StudentPortal page="tests" />} />
      <Route path="/student/study-material" element={<StudentPortal page="material" />} />
      <Route path="/student/progress" element={<StudentPortal page="progress" />} />
      <Route path="/student/lessons/mouse" element={<Lesson />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
