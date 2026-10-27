# VICO Exercise update

## Changes
- Renamed the student sidebar item from **Assignments** to **Exercises**.
- `/student/assignments` redirects to `/student/exercises` for backwards compatibility.
- Added Foundation 1 Chapter 1 Exercise 1 from the supplied visual exercise ZIP under `student/public/exercises/chapter1/`.
- Added `/student/exercises/chapter/1`, which keeps the VICO sidebar visible and embeds the interactive exercise.
- Exercise score, correct/wrong counts, and percentage appear on the exercise completion screen itself.
- Results & Progress now lists school test results only (Periodic Test 1, Half-yearly Test, Periodic Test 2, Annual Test); it no longer presents exercise results.
- The exercise completion screen's Back to Chapter and Next Chapter actions navigate to the corresponding VICO chapter pages.

## Run
```powershell
cd student
npm install
npm run dev
```

Open the local Vite URL and sign in, then choose **Exercises → Exercise 1 — More about a Computer**.

Note: the current environment cannot run `npm run build` because the installed Vite/Rolldown native optional binding is missing. The standalone exercise JavaScript passes `node --check`; run `npm install` in the student directory on your Windows machine if you see the same dependency error.
