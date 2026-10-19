export const students = [
  { id: 'VICO-1042', name: 'Rahul Sharma', email: 'rahul.sharma@email.com', initials: 'RS', color: 'coral', completed: 8, score: 86, status: 'Active', progress: 72 },
  { id: 'VICO-1041', name: 'Priya Patil', email: 'priya.patil@email.com', initials: 'PP', color: 'lavender', completed: 6, score: 78, status: 'Active', progress: 54 },
  { id: 'VICO-1040', name: 'Aman Joshi', email: 'aman.joshi@email.com', initials: 'AJ', color: 'mint', completed: 4, score: 72, status: 'Active', progress: 38 },
  { id: 'VICO-1039', name: 'Neha Kulkarni', email: 'neha.k@email.com', initials: 'NK', color: 'sky', completed: 11, score: 94, status: 'Active', progress: 92 },
  { id: 'VICO-1038', name: 'Vikram Singh', email: 'vikram.singh@email.com', initials: 'VS', color: 'yellow', completed: 2, score: 64, status: 'Inactive', progress: 21 },
]

export const lessons = [
  { id: 1, title: 'What is a Computer?', category: 'Computer Basics', type: 'Visual + Activity', completed: 96, status: 'Published', updated: 'Sep 24, 2026' },
  { id: 2, title: 'Monitor', category: 'Computer Basics', type: 'Visual', completed: 89, status: 'Published', updated: 'Sep 22, 2026' },
  { id: 3, title: 'Keyboard', category: 'Input Devices', type: 'Visual + Quiz', completed: 78, status: 'Published', updated: 'Sep 20, 2026' },
  { id: 4, title: 'Mouse', category: 'Input Devices', type: 'Interactive', completed: 72, status: 'Published', updated: 'Sep 18, 2026' },
  { id: 5, title: 'Files & Folders', category: 'Everyday Skills', type: 'Demonstration', completed: 41, status: 'Draft', updated: 'Sep 16, 2026' },
  { id: 6, title: 'Save, Copy & Paste', category: 'Everyday Skills', type: 'Interactive', completed: 34, status: 'Draft', updated: 'Sep 14, 2026' },
]

export const quizzes = [
  { id: 1, title: 'Computer Basics Quiz', lesson: 'What is a Computer?', questions: 8, attempts: 118, average: 82, status: 'Published' },
  { id: 2, title: 'Keyboard Basics Quiz', lesson: 'Keyboard', questions: 10, attempts: 96, average: 78, status: 'Published' },
  { id: 3, title: 'Mouse Basics Quiz', lesson: 'Mouse', questions: 6, attempts: 74, average: 86, status: 'Published' },
]

export const results = [
  { student: 'Rahul Sharma', quiz: 'Mouse Basics Quiz', lesson: 'Mouse', score: '5/6', percentage: 83, status: 'Passed', date: 'Sep 24, 2026' },
  { student: 'Priya Patil', quiz: 'Keyboard Basics Quiz', lesson: 'Keyboard', score: '7/10', percentage: 70, status: 'Passed', date: 'Sep 24, 2026' },
  { student: 'Aman Joshi', quiz: 'Computer Basics Quiz', lesson: 'What is a Computer?', score: '4/8', percentage: 50, status: 'Needs review', date: 'Sep 23, 2026' },
  { student: 'Neha Kulkarni', quiz: 'Mouse Basics Quiz', lesson: 'Mouse', score: '6/6', percentage: 100, status: 'Passed', date: 'Sep 22, 2026' },
]

export const activities = [
  { student: 'Rahul Sharma', initials: 'RS', lesson: 'Mouse Basics', activity: 'Lesson completed', status: 'Completed', date: 'Sep 24' },
  { student: 'Priya Patil', initials: 'PP', lesson: 'Keyboard', activity: 'Quiz attempted', status: 'In progress', date: 'Sep 24' },
  { student: 'Aman Joshi', initials: 'AJ', lesson: 'Computer Basics', activity: 'Lesson started', status: 'In progress', date: 'Sep 23' },
]

export const assets = [
  { name: 'mouse-anatomy.svg', type: 'Illustration', lesson: 'Mouse', date: 'Sep 18, 2026', tone: 'coral', icon: 'M' },
  { name: 'keyboard-keys.png', type: 'Image', lesson: 'Keyboard', date: 'Sep 17, 2026', tone: 'lavender', icon: 'K' },
  { name: 'desktop-tour.mp4', type: 'Demonstration', lesson: 'Desktop & Taskbar', date: 'Sep 12, 2026', tone: 'mint', icon: '▶' },
  { name: 'folder-flow.gif', type: 'Animation', lesson: 'Files & Folders', date: 'Sep 10, 2026', tone: 'yellow', icon: 'F' },
]
