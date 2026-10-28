// Foundation 1 progress storage.
// This version uses localStorage for the current single-browser prototype.
// For multi-device/student-account persistence, mirror these records through the authenticated backend.
export const PROGRESS_KEYS = {
  topics: 'vico-foundation1-completed-topics',
  chapters: 'vico-foundation1-completed-chapters',
  videos: 'vicl-foundation1-video-progress',
  activities: 'vicl-foundation1-activity-progress',
  quizzes: 'vicl-foundation1-quiz-results',
};

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event('vico-progress-updated'));
}

export const readTopicProgress = () => readJson(PROGRESS_KEYS.topics, {});
export const readVideoProgress = () => readJson(PROGRESS_KEYS.videos, {});
export const readActivityProgress = () => readJson(PROGRESS_KEYS.activities, {});
export const readQuizResults = () => readJson(PROGRESS_KEYS.quizzes, {});

export function saveVideoProgress(chapter, progress) {
  const all = readVideoProgress();
  all[chapter] = { ...(all[chapter] || {}), ...progress, updatedAt: new Date().toISOString() };
  writeJson(PROGRESS_KEYS.videos, all);
}

export function saveActivityProgress(chapter, activity) {
  const all = readActivityProgress();
  all[chapter] = { ...(all[chapter] || {}), ...activity, updatedAt: new Date().toISOString() };
  writeJson(PROGRESS_KEYS.activities, all);
}

export function saveQuizResult(chapter, result) {
  const all = readQuizResults();
  all[chapter] = { ...result, updatedAt: new Date().toISOString() };
  writeJson(PROGRESS_KEYS.quizzes, all);
}

export function getChapterProgress(chapter, topicCounts) {
  const topics = readTopicProgress()[chapter] || [];
  const videos = readVideoProgress()[chapter] || {};
  const activity = readActivityProgress()[chapter] || {};
  const quiz = readQuizResults()[chapter] || null;
  const totalTopics = topicCounts[chapter - 1] || 0;
  const completedTopics = [...new Set(topics)].length;
  const videoPercent = Math.max(0, Math.min(100, Math.round(videos.percent || 0)));
  const activityComplete = Boolean(activity.completed);
  const quizAttempted = Boolean(quiz && Number.isFinite(quiz.score));
  const quizScore = quizAttempted ? `${quiz.score}/${quiz.total}` : 'Not attempted';
  // A chapter is automatically completed when its lesson video reaches the end.
  // The topic/activity/quiz completion rule remains as an alternative completion path.
  const completedChapters = readJson(PROGRESS_KEYS.chapters, []);
  const videoFinishedChapter = Array.isArray(completedChapters) && completedChapters.includes(chapter);
  const complete = videoFinishedChapter || (totalTopics > 0 &&
    completedTopics >= totalTopics &&
    activityComplete &&
    quizAttempted &&
    quiz.score >= Math.ceil(quiz.total * 0.7));
  const status = complete ? 'Completed' :
    (completedTopics > 0 || videoPercent > 0 || activityComplete || quizAttempted ? 'In progress' : 'Not started');
  return {
    chapter,
    totalTopics,
    completedTopics: Math.min(completedTopics, totalTopics),
    videoPercent,
    videoCompleted: Boolean(videos.completed),
    activityComplete,
    quizAttempted,
    quizScore,
    quiz,
    status,
  };
}
