import { getMockStudent } from './authService';
import { getFoundationForGrade } from './curriculumService';

export function getStudentProfile() {
  const student = getMockStudent();
  const foundation = getFoundationForGrade(student.grade);
  return {
    ...student,
    foundation: foundation?.name || 'Not assigned',
    badge: 'Grade 1 Explorer',
    learningStats: {
      lessonsCompleted: 4,
      quizzesCompleted: 3,
      streak: 5,
      totalMinutes: 82,
    },
  };
}

export function getStudentOverview() {
  const student = getMockStudent();
  const foundation = getFoundationForGrade(student.grade);
  return {
    name: student.name,
    grade: student.grade,
    foundationLabel: foundation?.name || 'Not assigned',
    currentChapter: foundation?.chapters?.[0]?.title || 'No chapter available',
    currentTopic: foundation?.chapters?.[0]?.lessons?.[0]?.title || 'No topic available',
    dailyGoal: 30,
  };
}
