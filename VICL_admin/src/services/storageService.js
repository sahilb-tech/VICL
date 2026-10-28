// storageService.js - Educational Platform Storage Layer
// Source of truth: Grade 1, Chapter 1: "The Super Machine: Computer"
// Full educational management: Dashboard, Chapters (Grade 1), Exercises, Tests, Materials, Results, Students, Assets

const STORAGE_VERSION = 'v3_complete_platform_grade1_actual'

const STORAGE_KEYS = {
  VERSION: 'vicl_storage_version',
  GRADES: 'vicl_grades',
  CHAPTERS: 'vicl_chapters',
  EXERCISES: 'vicl_exercises',
  TESTS: 'vicl_tests',
  MATERIALS: 'vicl_materials',
  STUDENTS: 'vicl_students',
  RESULTS: 'vicl_results',
  ASSETS: 'vicl_assets',
  ACTIVITIES: 'vicl_activities',
  USER_ROLE: 'vicl_user_mode', // 'admin' or 'student'
}

export const SUPPORTED_GRADES = ['Grade 1']

// The EXACT Grade 1, Chapter 1 textbook content
export const GRADE_1_CHAPTER_1_CONTENT = {
  id: 'g1-ch1',
  grade: 'Grade 1',
  number: 1,
  title: 'The Super Machine: Computer',
  status: 'Published',
  description:
    'Learn what a machine is, different types of machines, why a computer is called a smart machine, and different types of computers.',
  sections: [
    {
      id: 'sec-1',
      number: 1,
      title: '1. What Is a Machine?',
      definition:
        'A machine is a man-made thing. It makes our life easier and faster. It helps save our time and energy. Machines are built to do specific tasks.',
      examples: [
        { name: 'Washing machine', description: 'A washing machine is used to wash clothes at home.', icon: '🧺' },
        { name: 'Iron', description: 'An iron is a machine which is used to press our clothes.', icon: '👔' },
        { name: 'Air conditioner', description: 'An air conditioner is a machine used to cool our homes in the summer.', icon: '❄️' },
        { name: 'Refrigerator', description: 'A refrigerator keeps fruits and vegetables fresh.', icon: '🧊' },
      ],
      fact: 'Machines can be very small, like a watch, and also very big, like a truck.',
      activity: {
        title: 'Activity: Machines Inside and Outside the House',
        instruction: 'Write O for machines found outside the house and I for machines found inside the house.',
        items: [
          { id: 'act-1', name: 'School bus', expected: 'O', label: 'Outside the house' },
          { id: 'act-2', name: 'Television', expected: 'I', label: 'Inside the house' },
          { id: 'act-3', name: 'Microwave oven', expected: 'I', label: 'Inside the house' },
          { id: 'act-4', name: 'ATM machine', expected: 'O', label: 'Outside the house' },
          { id: 'act-5', name: 'Excavator/backhoe loader', expected: 'O', label: 'Outside the house' },
          { id: 'act-6', name: 'Washing machine', expected: 'I', label: 'Inside the house' },
        ],
      },
    },
    {
      id: 'sec-2',
      number: 2,
      title: '2. Types of Machines',
      intro: 'The textbook introduces different machines based on how they work.',
      examples: [
        { name: 'Bicycle', description: 'Some machines work with our efforts.', icon: '🚲' },
        { name: 'Car', description: 'Some machines run on petrol or diesel.', icon: '🚗' },
        { name: 'Microwave', description: 'Some machines run on electricity.', icon: '📻' },
        { name: 'Wall Clock', description: 'Some machines run on batteries.', icon: '⏰' },
      ],
    },
    {
      id: 'sec-3',
      number: 3,
      title: '3. Computer: A Smart Machine',
      textbookQuote:
        'This is a machine called computer.\n\nOther machines help us do one or two things only. A computer helps us to do many things. It helps us solve sums, draw pictures, listen to music, play games and more. That is why a computer is called a smart machine.',
      points: [
        'A computer is a machine.',
        'Other machines help us do one or two things only. A computer helps us to do many things.',
        'A computer helps us solve sums, draw pictures, listen to music, play games, and learn new things.',
        'That is why a computer is called a smart machine.',
      ],
    },
    {
      id: 'sec-4',
      number: 4,
      title: '4. Types of Computers',
      types: [
        {
          name: 'Desktop Computer',
          icon: '🖥️',
          points: [
            'A computer kept on a desk or a table is called a desktop computer. It is also called a personal computer.',
            'We cannot carry it from one place to another.',
            'We can play games, draw pictures, watch videos and learn new things on a desktop computer.',
            'It is used in homes and offices. We need to plug it into electricity for it to work.',
          ],
        },
        {
          name: 'Laptop Computer',
          icon: '💻',
          points: [
            'A laptop computer is smaller than a desktop computer. It is about the size of a notebook.',
            'We can easily carry it from one place to another.',
            'Despite its small size, it can perform all the tasks that a desktop computer can do.',
            'We do not need to keep it plugged into electricity, as it works on a battery. It is used in offices, homes, meetings and more.',
          ],
        },
        {
          name: 'Other Types of Computers',
          icon: '📱',
          points: ['The textbook illustrates other portable smart devices that are types of computers:'],
          items: [
            { name: 'Smartphone', icon: '📱' },
            { name: 'Smartwatch', icon: '⌚' },
            { name: 'Tablet', icon: '📲' },
          ],
        },
      ],
    },
    {
      id: 'sec-5',
      number: 5,
      title: '5. Chapter Exercises',
      exercises: [
        {
          id: 'ex-1',
          number: 1,
          title: 'Exercise 1: Tick the Correct Option',
          type: 'mcq',
          questions: [
            {
              id: 'q1',
              question: '1. Which of the following is a machine?',
              options: [
                { key: 'a', text: '(a) A plate of food' },
                { key: 'b', text: '(b) A tree' },
                { key: 'c', text: '(c) An aeroplane' },
              ],
              correct: 'c',
            },
            {
              id: 'q2',
              question: '2. Which of the following machines need electricity?',
              options: [
                { key: 'a', text: '(a) Motorcycle' },
                { key: 'b', text: '(b) Bicycle' },
                { key: 'c', text: '(c) Electric fan' },
              ],
              correct: 'c',
            },
            {
              id: 'q3',
              question: '3. Which of the following machines need our efforts to work?',
              options: [
                { key: 'a', text: '(a) Bicycle' },
                { key: 'b', text: '(b) Microwave oven' },
                { key: 'c', text: '(c) Motorcycle' },
              ],
              correct: 'a',
            },
            {
              id: 'q4',
              question: '4. Which of the following is a laptop?',
              options: [
                { key: 'a', text: '(a) School bag' },
                { key: 'b', text: '(b) Open book' },
                { key: 'c', text: '(c) Laptop computer' },
              ],
              correct: 'c',
            },
          ],
        },
        {
          id: 'ex-2',
          number: 2,
          title: 'Exercise 2: Match the Following',
          type: 'match',
          pairs: [
            { id: 1, object: 'Desktop computer', matchText: '(c) Desktop Computer', matchKey: 'c' },
            { id: 2, object: 'Car', matchText: '(d) Work on diesel', matchKey: 'd' },
            { id: 3, object: 'Battery', matchText: '(b) Give power to remote and watch', matchKey: 'b' },
            { id: 4, object: 'Laptop', matchText: '(a) Laptop', matchKey: 'a' },
          ],
          options: [
            { key: 'a', text: '(a) Laptop' },
            { key: 'b', text: '(b) Give power to remote and watch' },
            { key: 'c', text: '(c) Desktop Computer' },
            { key: 'd', text: '(d) Work on diesel' },
          ],
        },
        {
          id: 'ex-3',
          number: 3,
          title: 'Exercise 3: Fill in the Blanks',
          type: 'fill',
          wordBank: ['Tablet', 'Machine', 'Monitor', 'Computer'],
          questions: [
            { id: 1, sentence: '1. A ______ makes our lives easier and faster.', answer: 'Machine' },
            { id: 2, sentence: '2. A ______ looks like a television screen.', answer: 'Monitor' },
            { id: 3, sentence: '3. A ______ helps us to solve sums, draw pictures and play games.', answer: 'Computer' },
            { id: 4, sentence: '4. A ______ is a type of computer.', answer: 'Tablet' },
          ],
        },
        {
          id: 'ex-4',
          number: 4,
          title: 'Exercise 4: Fill in Missing Letters and Identify the Machines',
          type: 'missing_letters',
          items: [
            { id: 1, prompt: '1. Picture of a fan: F _ N', pattern: 'F _ N', answer: 'FAN', missing: 'A' },
            { id: 2, prompt: '2. Picture of a car: _ A R', pattern: '_ A R', answer: 'CAR', missing: 'C' },
            { id: 3, prompt: '3. Picture of a watch: _ A T _ H', pattern: '_ A T _ H', answer: 'WATCH', missing: 'W, C' },
          ],
        },
      ],
    },
    {
      id: 'sec-6',
      number: 6,
      title: '6. Computer Lab Activity',
      type: 'lab_activity',
      description: 'Visit the computer lab and observe what a computer looks like.',
      rules: [
        'Listen to the teacher and follow the directions.',
        'Make a queue and move to the computer lab.',
        'Be gentle with computers and equipment.',
      ],
      checklistTitle: 'Activity: Tick the things that you see in the lab',
      checklist: [
        { id: 'lab-1', text: '1. Tables' },
        { id: 'lab-2', text: '2. Tablets' },
        { id: 'lab-3', text: '3. Chairs' },
        { id: 'lab-4', text: '4. Fan' },
        { id: 'lab-5', text: '5. Laptops' },
        { id: 'lab-6', text: '6. Desktop Computers' },
      ],
    },
  ],
}

// Initial seed: Grade 1 Chapter 1 is populated
const INITIAL_CHAPTERS = [GRADE_1_CHAPTER_1_CONTENT]

const INITIAL_EXERCISES = [
  {
    id: 1,
    grade: 'Grade 1',
    chapterId: 'g1-ch1',
    chapterTitle: 'The Super Machine: Computer',
    title: 'Chapter 1 Textbook Exercises (Pages 9 & 10)',
    questionsCount: 13,
    types: ['MCQs (Tick correct)', 'Match the following', 'Fill in blanks (Word bank)', 'Missing letters', 'Computer lab activity'],
    attempts: 42,
    average: 88,
    status: 'Published',
  },
]

const INITIAL_TESTS = [
  {
    id: 'PT-1',
    code: 'PT1',
    grade: 'Grade 1',
    title: 'Periodic Test 1',
    syllabus: 'Grade 1 · Chapter 1: The Super Machine: Computer (What is a Machine, Types of Machines, Computer & Types)',
    displayDate: 'Nov 15, 2026 · 10:00 AM',
    durationMinutes: 45,
    maxMarks: 25,
    passingMarks: 10,
    status: 'Scheduled',
    description: 'First periodic term assessment testing the fundamentals of machines and computers.',
  },
  {
    id: 'PT-2',
    code: 'PT2',
    grade: 'Grade 1',
    title: 'Periodic Test 2',
    syllabus: 'Grade 1 · Advanced Review & Lab Practical',
    displayDate: 'Dec 20, 2026 · 10:00 AM',
    durationMinutes: 45,
    maxMarks: 25,
    passingMarks: 10,
    status: 'Draft',
    description: 'Second periodic assessment.',
  },
]

const INITIAL_MATERIALS = [
  {
    id: 'MAT-1',
    title: 'Grade 1 Chapter 1: The Super Machine: Computer',
    subtitle: 'Official Grade 1 Unit 1 Computer Textbook & Exercises PDF',
    grade: 'Grade 1',
    type: 'Core Textbook',
    format: 'PDF',
    size: '14.2 MB',
    pages: 10,
    fileUrl: '/study-material/master-coding-robotics-foundation-1.pdf',
    status: 'Active',
  },
  {
    id: 'MAT-2',
    title: 'Grade 1 Chapter 1 Lab Activity & Practice Sheet',
    subtitle: 'Hands-on worksheets for machines inside/outside house and missing letters',
    grade: 'Grade 1',
    type: 'Workbook',
    format: 'PDF',
    size: '4.6 MB',
    pages: 4,
    fileUrl: '/study-material/foundation-1-lab-workbook.pdf',
    status: 'Active',
  },
]

const INITIAL_STUDENTS = [
  {
    id: 'VICO-1042',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    initials: 'RS',
    color: 'coral',
    grade: 'Grade 1',
    status: 'Active',
    enrolled: 'Jun 10, 2026',
    completedChapters: ['g1-ch1'],
    score: 92,
    progress: 100,
  },
  {
    id: 'VICO-1041',
    name: 'Priya Patil',
    email: 'priya.patil@email.com',
    initials: 'PP',
    color: 'lavender',
    grade: 'Grade 1',
    status: 'Active',
    enrolled: 'Jun 12, 2026',
    completedChapters: [],
    score: 80,
    progress: 0,
  },
  {
    id: 'VICO-1040',
    name: 'Aman Joshi',
    email: 'aman.joshi@email.com',
    initials: 'AJ',
    color: 'mint',
    grade: 'Grade 1',
    status: 'Active',
    enrolled: 'Jun 15, 2026',
    completedChapters: ['g1-ch1'],
    score: 85,
    progress: 100,
  },
  {
    id: 'VICO-1039',
    name: 'Neha Kulkarni',
    email: 'neha.k@email.com',
    initials: 'NK',
    color: 'sky',
    grade: 'Grade 1',
    status: 'Active',
    enrolled: 'Jun 05, 2026',
    completedChapters: ['g1-ch1'],
    score: 96,
    progress: 100,
  },
]

const INITIAL_RESULTS = [
  {
    id: 'RES-101',
    studentId: 'VICO-1042',
    student: 'Rahul Sharma',
    grade: 'Grade 1',
    testType: 'Periodic Test',
    assessmentName: 'Periodic Test 1',
    chapter: 'The Super Machine: Computer',
    marks: 24,
    totalMarks: 25,
    score: '24/25',
    percentage: 96,
    status: 'Passed',
    remarks: 'Excellent understanding of machines and types of computers.',
    date: 'Oct 24, 2026',
  },
  {
    id: 'RES-102',
    studentId: 'VICO-1039',
    student: 'Neha Kulkarni',
    grade: 'Grade 1',
    testType: 'Periodic Test',
    assessmentName: 'Periodic Test 1',
    chapter: 'The Super Machine: Computer',
    marks: 25,
    totalMarks: 25,
    score: '25/25',
    percentage: 100,
    status: 'Passed',
    remarks: 'Perfect score on Chapter 1 exercises and theory.',
    date: 'Oct 24, 2026',
  },
  {
    id: 'RES-103',
    studentId: 'VICO-1040',
    student: 'Aman Joshi',
    grade: 'Grade 1',
    testType: 'Chapter Exercise',
    assessmentName: 'Exercise 1: Tick Correct & Match',
    chapter: 'The Super Machine: Computer',
    marks: 11,
    totalMarks: 13,
    score: '11/13',
    percentage: 85,
    status: 'Passed',
    remarks: 'Good identification of inside/outside machines.',
    date: 'Oct 23, 2026',
  },
]

const INITIAL_ASSETS = [
  { id: 'AST-1', name: 'desktop-vs-laptop.png', type: 'Illustration', grade: 'Grade 1', chapter: 'The Super Machine: Computer', size: '320 KB', date: 'Oct 20, 2026', tone: 'coral', icon: '🖥️' },
  { id: 'AST-2', name: 'machines-around-us.svg', type: 'Diagram', grade: 'Grade 1', chapter: 'The Super Machine: Computer', size: '210 KB', date: 'Oct 21, 2026', tone: 'lavender', icon: '⚙️' },
  { id: 'AST-3', name: 'computer-lab-tour.mp4', type: 'Demonstration', grade: 'Grade 1', chapter: 'The Super Machine: Computer', size: '14.5 MB', date: 'Oct 22, 2026', tone: 'mint', icon: '▶' },
]

const INITIAL_ACTIVITIES = [
  { student: 'Rahul Sharma', initials: 'RS', chapter: 'Grade 1 · Chapter 1', activity: 'Completed Section 5 Exercises', status: 'Completed', date: 'Just now' },
  { student: 'Neha Kulkarni', initials: 'NK', chapter: 'Periodic Test 1', activity: 'Scored 25/25 on Chapter 1', status: 'Passed', date: '15 mins ago' },
  { student: 'Aman Joshi', initials: 'AJ', chapter: 'Computer Lab Activity', activity: 'Submitted lab checklist', status: 'Completed', date: '1 hour ago' },
  { student: 'Priya Patil', initials: 'PP', chapter: 'Grade 1 · Chapter 1', activity: 'Reading Section 1: What is a Machine', status: 'In progress', date: '2 hours ago' },
]

function ensureInitialSeed() {
  try {
    const version = localStorage.getItem(STORAGE_KEYS.VERSION)
    if (version !== STORAGE_VERSION) {
      localStorage.setItem(STORAGE_KEYS.VERSION, STORAGE_VERSION)
      localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(INITIAL_CHAPTERS))
      localStorage.setItem(STORAGE_KEYS.EXERCISES, JSON.stringify(INITIAL_EXERCISES))
      localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(INITIAL_TESTS))
      localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(INITIAL_MATERIALS))
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS))
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(INITIAL_RESULTS))
      localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(INITIAL_ASSETS))
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES))
      if (!localStorage.getItem(STORAGE_KEYS.USER_ROLE)) {
        localStorage.setItem(STORAGE_KEYS.USER_ROLE, 'admin')
      }
    }
  } catch (e) {
    console.error('Local storage seed error:', e)
  }
}

ensureInitialSeed()

function getJson(key, defaultVal) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : defaultVal
  } catch {
    return defaultVal
  }
}

function setJson(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val))
  } catch (e) {
    console.error('Failed to write to localStorage:', e)
  }
}

export const StorageService = {
  getGrades() {
    return SUPPORTED_GRADES
  },

  // Chapters (Grade 1)
  getChapters(gradeFilter = null) {
    ensureInitialSeed()
    const all = getJson(STORAGE_KEYS.CHAPTERS, INITIAL_CHAPTERS)
    if (gradeFilter) {
      return all.filter((c) => c.grade === gradeFilter)
    }
    return all
  },
  getChapterById(id) {
    return this.getChapters().find((c) => c.id === id) || null
  },
  saveChapter(chapter) {
    const all = this.getChapters()
    const existingIndex = all.findIndex((c) => c.id === chapter.id)
    let updated
    if (existingIndex >= 0) {
      updated = [...all]
      updated[existingIndex] = { ...updated[existingIndex], ...chapter, updatedAt: new Date().toISOString() }
    } else {
      const gradeChapters = all.filter((c) => c.grade === chapter.grade)
      const nextNum = gradeChapters.length + 1
      const newChap = {
        id: chapter.id || `${(chapter.grade || 'grade1').toLowerCase().replace(/\s+/g, '')}-ch${Date.now().toString().slice(-4)}`,
        number: chapter.number || nextNum,
        title: chapter.title || 'Untitled Chapter',
        grade: chapter.grade || 'Grade 1',
        status: chapter.status || 'Draft',
        description: chapter.description || '',
        sections: chapter.sections || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      updated = [...all, newChap]
    }
    setJson(STORAGE_KEYS.CHAPTERS, updated)
    return updated
  },
  deleteChapter(id) {
    const all = this.getChapters().filter((c) => c.id !== id)
    setJson(STORAGE_KEYS.CHAPTERS, all)
    return all
  },

  // Exercises
  getExercises() {
    return getJson(STORAGE_KEYS.EXERCISES, INITIAL_EXERCISES)
  },
  saveExercise(ex) {
    const list = this.getExercises()
    const idx = list.findIndex((e) => e.id === ex.id)
    let updated
    if (idx >= 0) {
      updated = [...list]
      updated[idx] = { ...updated[idx], ...ex }
    } else {
      const newEx = {
        id: ex.id || Date.now(),
        attempts: 0,
        average: 0,
        status: ex.status || 'Published',
        ...ex,
      }
      updated = [...list, newEx]
    }
    setJson(STORAGE_KEYS.EXERCISES, updated)
    return updated
  },
  deleteExercise(id) {
    const list = this.getExercises().filter((e) => e.id !== id)
    setJson(STORAGE_KEYS.EXERCISES, list)
    return list
  },

  // Periodic Tests
  getTests() {
    return getJson(STORAGE_KEYS.TESTS, INITIAL_TESTS)
  },
  saveTest(test) {
    const list = this.getTests()
    const idx = list.findIndex((t) => t.id === test.id)
    let updated
    if (idx >= 0) {
      updated = [...list]
      updated[idx] = { ...updated[idx], ...test }
    } else {
      const newTest = {
        id: test.id || `TEST-${Date.now().toString().slice(-4)}`,
        status: test.status || 'Scheduled',
        ...test,
      }
      updated = [...list, newTest]
    }
    setJson(STORAGE_KEYS.TESTS, updated)
    return updated
  },
  deleteTest(id) {
    const list = this.getTests().filter((t) => t.id !== id)
    setJson(STORAGE_KEYS.TESTS, list)
    return list
  },

  // Study Materials
  getMaterials() {
    return getJson(STORAGE_KEYS.MATERIALS, INITIAL_MATERIALS)
  },
  saveMaterial(mat) {
    const list = this.getMaterials()
    const idx = list.findIndex((m) => m.id === mat.id)
    let updated
    if (idx >= 0) {
      updated = [...list]
      updated[idx] = { ...updated[idx], ...mat }
    } else {
      const newMat = {
        id: mat.id || `MAT-${Date.now().toString().slice(-4)}`,
        status: 'Active',
        ...mat,
      }
      updated = [newMat, ...list]
    }
    setJson(STORAGE_KEYS.MATERIALS, updated)
    return updated
  },
  deleteMaterial(id) {
    const list = this.getMaterials().filter((m) => m.id !== id)
    setJson(STORAGE_KEYS.MATERIALS, list)
    return list
  },

  // Students
  getStudents() {
    return getJson(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS)
  },
  saveStudent(student) {
    const list = this.getStudents()
    const idx = list.findIndex((s) => s.id === student.id)
    let updated
    if (idx >= 0) {
      updated = [...list]
      updated[idx] = { ...updated[idx], ...student }
    } else {
      const initials = (student.name || 'S')
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
      const newStudent = {
        id: student.id || `VICO-${Math.floor(1000 + Math.random() * 9000)}`,
        initials,
        color: student.color || 'coral',
        grade: student.grade || 'Grade 1',
        status: student.status || 'Active',
        completedChapters: student.completedChapters || [],
        score: student.score || 85,
        progress: student.progress || 0,
        enrolled: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        ...student,
      }
      updated = [newStudent, ...list]
    }
    setJson(STORAGE_KEYS.STUDENTS, updated)
    return updated
  },
  deleteStudent(id) {
    const list = this.getStudents().filter((s) => s.id !== id)
    setJson(STORAGE_KEYS.STUDENTS, list)
    return list
  },

  // Results
  getResults() {
    return getJson(STORAGE_KEYS.RESULTS, INITIAL_RESULTS)
  },
  saveResult(result) {
    const list = this.getResults()
    const marks = Number(result.marks) || 0
    const totalMarks = Number(result.totalMarks) || 25
    const percentage = Math.round((marks / totalMarks) * 100)
    const status = percentage >= 40 ? 'Passed' : 'Needs Review'
    const newEntry = {
      id: result.id || `RES-${Date.now().toString().slice(-4)}`,
      score: `${marks}/${totalMarks}`,
      marks,
      totalMarks,
      percentage,
      status,
      date: result.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ...result,
    }
    const updated = [newEntry, ...list]
    setJson(STORAGE_KEYS.RESULTS, updated)
    return updated
  },
  deleteResult(id) {
    const list = this.getResults().filter((r) => r.id !== id)
    setJson(STORAGE_KEYS.RESULTS, list)
    return list
  },

  // Visual Assets
  getAssets() {
    return getJson(STORAGE_KEYS.ASSETS, INITIAL_ASSETS)
  },
  saveAsset(ast) {
    const list = this.getAssets()
    const newAst = {
      id: ast.id || `AST-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tone: ast.tone || 'coral',
      icon: (ast.name || 'A')[0].toUpperCase(),
      size: ast.size || '300 KB',
      ...ast,
    }
    const updated = [newAst, ...list]
    setJson(STORAGE_KEYS.ASSETS, updated)
    return updated
  },
  deleteAsset(id) {
    const list = this.getAssets().filter((a) => a.id !== id)
    setJson(STORAGE_KEYS.ASSETS, list)
    return list
  },

  // Activities
  getActivities() {
    return getJson(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES)
  },

  // Role Switcher
  getUserMode() {
    return localStorage.getItem(STORAGE_KEYS.USER_ROLE) || 'admin'
  },
  setUserMode(mode) {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, mode)
  },

  // Backup & Reset
  exportDatabase() {
    return {
      version: STORAGE_VERSION,
      exportedAt: new Date().toISOString(),
      chapters: this.getChapters(),
      exercises: this.getExercises(),
      tests: this.getTests(),
      materials: this.getMaterials(),
      students: this.getStudents(),
      results: this.getResults(),
      assets: this.getAssets(),
      activities: this.getActivities(),
    }
  },
  importDatabase(data) {
    if (!data) return false
    if (data.chapters) setJson(STORAGE_KEYS.CHAPTERS, data.chapters)
    if (data.exercises) setJson(STORAGE_KEYS.EXERCISES, data.exercises)
    if (data.tests) setJson(STORAGE_KEYS.TESTS, data.tests)
    if (data.materials) setJson(STORAGE_KEYS.MATERIALS, data.materials)
    if (data.students) setJson(STORAGE_KEYS.STUDENTS, data.students)
    if (data.results) setJson(STORAGE_KEYS.RESULTS, data.results)
    if (data.assets) setJson(STORAGE_KEYS.ASSETS, data.assets)
    return true
  },
  resetDatabase() {
    localStorage.clear()
    localStorage.setItem(STORAGE_KEYS.VERSION, STORAGE_VERSION)
    localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(INITIAL_CHAPTERS))
    localStorage.setItem(STORAGE_KEYS.EXERCISES, JSON.stringify(INITIAL_EXERCISES))
    localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(INITIAL_TESTS))
    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(INITIAL_MATERIALS))
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS))
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(INITIAL_RESULTS))
    localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(INITIAL_ASSETS))
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES))
    return true
  },
}
