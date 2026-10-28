import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import StudentLayout from '../components/student/StudentLayout';
import Dashboard from '../pages/student/Dashboard';
import MyLearning from '../pages/student/MyLearning';
import Explore from '../pages/student/Explore';
import Progress from '../pages/student/Progress';
import Achievements from '../pages/student/Achievements';
import Notifications from '../pages/student/Notifications';
import Profile from '../pages/student/Profile';
import Settings from '../pages/student/Settings';
import Help from '../pages/student/Help';
import LoginPage from '../pages/student/LoginPage';
import LessonDetail from '../pages/student/LessonDetail';
import ActivityPage from '../pages/student/ActivityPage';
import PracticePage from '../pages/student/PracticePage';
import QuizPage from '../pages/student/QuizPage';
import QuizResultPage from '../pages/student/QuizResultPage';
import { isStudentAuthenticated } from '../services/authService';

function ProtectedRoute() {
  return isStudentAuthenticated() ? <Outlet /> : <Navigate to="/student/login" replace />;
}

function StudentAuthRoute() {
  return isStudentAuthenticated() ? <Navigate to="/student/dashboard" replace /> : <Outlet />;
}

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/student/login" replace />} />

      <Route element={<StudentAuthRoute />}>
        <Route path="/student/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<Dashboard />} />
          <Route path="/student/learning" element={<MyLearning />} />
          <Route path="/student/explore" element={<Explore />} />
          <Route path="/student/progress" element={<Progress />} />
          <Route path="/student/achievements" element={<Achievements />} />
          <Route path="/student/notifications" element={<Notifications />} />
          <Route path="/student/profile" element={<Profile />} />
          <Route path="/student/settings" element={<Settings />} />
          <Route path="/student/help" element={<Help />} />
          <Route path="/student/foundation/:foundationId" element={<MyLearning />} />
          <Route path="/student/chapter/:chapterId" element={<MyLearning />} />
          <Route path="/student/lesson/:lessonId" element={<LessonDetail />} />
          <Route path="/student/activity/:activityId" element={<ActivityPage />} />
          <Route path="/student/practice/:practiceId" element={<PracticePage />} />
          <Route path="/student/quiz/:quizId" element={<QuizPage />} />
          <Route path="/student/result/:resultId" element={<QuizResultPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
