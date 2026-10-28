export const gradeFoundationMap = {
  1: 'foundation-1',
  2: 'foundation-2',
  3: 'foundation-3',
  4: 'foundation-4',
  5: 'foundation-5',
};

export const foundationCatalog = [
  {
    id: 'foundation-1',
    name: 'Foundation 1',
    grade: 1,
    description: 'Learn the basics of computers, devices and simple digital tasks.',
    chapters: [
      {
        id: 'chapter-1',
        title: 'Chapter 1: The Super Machine: Computer',
        description: 'Understand what a computer is and how it helps us in everyday life.',
        lessons: [
          {
            id: 'lesson-what-is-machine',
            chapterId: 'chapter-1',
            foundationId: 'foundation-1',
            topicId: 'topic-what-is-machine',
            title: 'What is a Machine?',
            status: 'Available',
            duration: '8 min',
            type: 'Story',
          },
          {
            id: 'lesson-computer-smart-machine',
            chapterId: 'chapter-1',
            foundationId: 'foundation-1',
            topicId: 'topic-computer-smart-machine',
            title: 'Computer — A Smart Machine',
            status: 'In Progress',
            duration: '9 min',
            type: 'Visual Explanation',
          },
          {
            id: 'lesson-types-of-machines',
            chapterId: 'chapter-1',
            foundationId: 'foundation-1',
            topicId: 'topic-types-of-machines',
            title: 'Types of Machines',
            status: 'Available',
            duration: '7 min',
            type: 'Story',
          },
          {
            id: 'lesson-desktop-computer',
            chapterId: 'chapter-1',
            foundationId: 'foundation-1',
            topicId: 'topic-desktop-computer',
            title: 'Desktop Computer',
            status: 'Locked',
            duration: '10 min',
            type: 'Visual Explanation',
          },
        ],
      },
    ],
  },
  ...[2, 3, 4, 5].map((grade) => ({
    id: `foundation-${grade}`,
    name: `Foundation ${grade}`,
    grade,
    description: `Grade ${grade} learning foundation. Approved curriculum content will appear here when available.`,
    chapters: [],
  })),
];

export function getFoundationForGrade(grade) {
  const foundationId = gradeFoundationMap[grade];
  return foundationCatalog.find((item) => item.id === foundationId) || null;
}

export function getCurriculumByGrade(grade) {
  return getFoundationForGrade(grade);
}

export function getLessonContent(lessonId) {
  const lessonMap = {
    'lesson-what-is-machine': {
      id: 'lesson-what-is-machine',
      foundationId: 'foundation-1',
      chapterId: 'chapter-1',
      topicId: 'topic-what-is-machine',
      title: 'What is a Machine?',
      foundation: 'Foundation 1',
      chapter: 'Chapter 1: The Super Machine: Computer',
      topic: 'What is a Machine?',
      story: 'A machine helps us do work faster and easier. A computer is a smart machine that helps us write, draw, learn, and play.',
      visualExplanation: 'A computer has a screen, keyboard, mouse, and system unit. It follows instructions and helps us complete tasks.',
      animation: 'The robot helper shows the classroom computer turning on and helping with a picture, a letter, and a game.',
      interactiveActivity: {
        title: 'Find the Machine',
        description: 'Tap the object that is a machine and then click continue to finish the activity.',
        choices: ['Toy car', 'Computer', 'Book', 'Shoe'],
        correctAnswer: 'Computer',
      },
      practice: 'Practice saying: A computer is a smart machine that helps us learn and work.',
      quiz: {
        id: 'quiz-what-is-machine',
        title: 'Quick check: What is a Machine?',
        questions: [
          {
            id: 'q1',
            text: 'Which one is a machine?',
            options: ['Pen', 'Computer', 'Ball', 'Chair'],
            correctAnswer: 'Computer',
          },
          {
            id: 'q2',
            text: 'What does a computer help us do?',
            options: ['Only sleep', 'Learn, play, and work', 'Only eat', 'Only travel'],
            correctAnswer: 'Learn, play, and work',
          },
        ],
      },
    },
    'lesson-computer-smart-machine': {
      id: 'lesson-computer-smart-machine',
      foundationId: 'foundation-1',
      chapterId: 'chapter-1',
      topicId: 'topic-computer-smart-machine',
      title: 'Computer — A Smart Machine',
      foundation: 'Foundation 1',
      chapter: 'Chapter 1: The Super Machine: Computer',
      topic: 'Computer — A Smart Machine',
      story: 'A computer can remember, think, and follow instructions. It helps us complete many tasks quickly.',
      visualExplanation: 'A smart machine has parts that work together: the monitor shows information, the keyboard helps you type, and the mouse helps you point and click.',
      animation: 'The screen lights up while icons appear, a page opens, and the cursor moves across the desktop.',
      interactiveActivity: {
        title: 'Click the correct device',
        description: 'Identify which object is used to type letters on a computer.',
        choices: ['Monitor', 'Mouse', 'Keyboard', 'Printer'],
        correctAnswer: 'Keyboard',
      },
      practice: 'Try to name two parts of a computer: monitor and keyboard.',
      quiz: {
        id: 'quiz-smart-machine',
        title: 'Quick check: Parts of a computer',
        questions: [
          {
            id: 'q1',
            text: 'Which part helps you type?',
            options: ['Mouse', 'Keyboard', 'Speaker', 'CPU'],
            correctAnswer: 'Keyboard',
          },
          {
            id: 'q2',
            text: 'What does the monitor do?',
            options: ['Walks around', 'Shows information', 'Prints paper', 'Makes sound'],
            correctAnswer: 'Shows information',
          },
        ],
      },
    },
  };

  return lessonMap[lessonId] || null;
}
