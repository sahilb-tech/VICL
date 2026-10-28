import { getMockStudent } from './authService';
import { getFoundationForGrade } from './curriculumService';

const PROGRESS_KEY = 'vico-student-progress';

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  window.dispatchEvent(new CustomEvent('vico:progress-updated'));
}

function getStudentProgress(studentId = getMockStudent().id) {
  const progress = readProgress();
  return progress[studentId] || { activities: {}, quizzes: {}, recentActivity: [] };
}

function saveStudentProgress(studentId, studentProgress) {
  const progress = readProgress();
  progress[studentId] = studentProgress;
  writeProgress(progress);
}

export function recordActivityCompletion({ lessonId, activityId = lessonId, studentId = getMockStudent().id }) {
  const studentProgress = getStudentProgress(studentId);
  studentProgress.activities[activityId] = { lessonId, completedAt: new Date().toISOString() };
  studentProgress.recentActivity = [
    { title: 'Activity completed: What is a Machine?', type: 'Activity', time: 'Just now' },
    ...studentProgress.recentActivity.filter((item) => item.title !== 'Activity completed: What is a Machine?'),
  ].slice(0, 5);
  saveStudentProgress(studentId, studentProgress);
}

export function recordQuizResult({ quizId, lessonId, answers, questions, studentId = getMockStudent().id }) {
  const correct = questions.filter((question) => answers[question.id] === question.correctAnswer).length;
  const result = {
    quizId,
    lessonId,
    correct,
    total: questions.length,
    percentage: Math.round((correct / questions.length) * 100),
    answers,
    completedAt: new Date().toISOString(),
  };
  const studentProgress = getStudentProgress(studentId);
  studentProgress.quizzes[quizId] = result;
  studentProgress.recentActivity = [
    { title: `Quiz completed: ${result.percentage}%`, type: 'Quiz', time: 'Just now' },
    ...studentProgress.recentActivity.filter((item) => !item.title.startsWith('Quiz completed:')),
  ].slice(0, 5);
  saveStudentProgress(studentId, studentProgress);
  return result;
}

export function getQuizResult(quizId, studentId = getMockStudent().id) {
  return getStudentProgress(studentId).quizzes[quizId] || null;
}

export function getLessonProgress(lessonId, studentId = getMockStudent().id) {
  const studentProgress = getStudentProgress(studentId);
  const activity = Object.values(studentProgress.activities).find((item) => item.lessonId === lessonId);
  const quiz = Object.values(studentProgress.quizzes).find((item) => item.lessonId === lessonId);
  const activityDone = Boolean(activity);
  const quizDone = Boolean(quiz);
  return {
    activityDone,
    quizDone,
    progress: quizDone ? 100 : activityDone ? 55 : 0,
    status: quizDone ? 'Completed' : activityDone ? 'In Progress' : 'Available',
    quiz,
  };
}

export function getProgressOverview(grade = getMockStudent().grade, studentId = getMockStudent().id) {
  const foundation = getFoundationForGrade(grade);
  if (!foundation) return null;

  const lessons = foundation.chapters.flatMap((chapter) => chapter.lessons);
  const lessonProgress = lessons.map((lesson) => ({ ...lesson, ...getLessonProgress(lesson.id, studentId) }));
  const overall = lessons.length ? Math.round(lessonProgress.reduce((sum, lesson) => sum + lesson.progress, 0) / lessons.length) : 0;
  const chapterProgress = foundation.chapters.map((chapter) => {
    const chapterLessons = lessonProgress.filter((lesson) => lesson.chapterId === chapter.id);
    const value = chapterLessons.length
      ? Math.round(chapterLessons.reduce((sum, lesson) => sum + lesson.progress, 0) / chapterLessons.length)
      : 0;
    return { label: chapter.title, value };
  });
  const foundationProgress = chapterProgress.length
    ? Math.round(chapterProgress.reduce((sum, chapter) => sum + chapter.value, 0) / chapterProgress.length)
    : 0;

  return {
    overall,
    foundation: foundationProgress,
    chapterProgress,
    lessons: lessonProgress,
    todayMinutes: Math.min(30, Math.round(overall * 0.3)),
    recentActivity: getStudentProgress(studentId).recentActivity,
  };
}

export function getAchievements(studentId = getMockStudent().id) {
  const progress = getStudentProgress(studentId);
  const quizCompleted = Object.keys(progress.quizzes).length > 0;
  return [
    { title: 'First Lesson Completed', description: 'Complete your first learning flow.', icon: 'trophy', unlocked: quizCompleted },
    { title: 'First Quiz Completed', description: 'Finish a quiz and see your result.', icon: 'target', unlocked: quizCompleted },
    { title: 'Chapter 1 Explorer', description: 'Complete every lesson in Chapter 1.', icon: 'star', unlocked: false },
    { title: 'Learning Streak', description: 'Keep learning for five days in a row.', icon: 'flame', unlocked: false },
  ];
}

export function getRecentActivity(studentId = getMockStudent().id) {
  return getStudentProgress(studentId).recentActivity;
}
