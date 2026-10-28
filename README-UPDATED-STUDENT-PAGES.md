# VICO student pages update

## What's included
- Separate React Router pages: Dashboard, My Learning, Assignments, Periodic Tests 1 & 2, Study Material, Results & Progress.
- Persistent responsive sidebar navigation across the new student pages.
- Foundation 1 chapters listed in the supplied order, with a route for each chapter.
- Foundation 1 textbook PDF served from `student/public/study-material/master-coding-robotics-foundation-1.pdf`.
- Test and result states are clearly marked as pending until teacher/admin data is available.

## Run on Windows
1. Extract the ZIP.
2. Open a terminal in the `student` folder.
3. Run `npm install` (installs dependencies from `package.json`).
4. Run `npm run dev` (starts the Vite development server).
5. Open the local URL shown by Vite, usually `http://localhost:5173`.

If Vite reports a missing native dependency, delete `student/node_modules` and `student/package-lock.json`, then run `npm install` again. This project ZIP intentionally excludes `node_modules` so npm installs packages for your computer's operating system.

## Important implementation notes
- Chapter detail routes currently provide the chapter shell and textbook guidance; interactive lesson content must be mapped from the corresponding book pages before it can be considered book-aligned.
- Assignment question sets, actual test schedules, marks, and persistent progress are not fabricated. They need teacher/admin data and backend integration.
- The original login, admin dashboard, and mouse lesson routes are retained.
