# VICO Foundation 1 Progress Bar Update

This update adds a Foundation 1 learning-progress bar to both the Dashboard's “What you're learning now” card and the My Learning chapter list.

## What changed
- Shows completed chapters out of 9, percentage complete, and chapters remaining.
- Uses a visual progress bar with accessible progress-bar attributes.
- My Learning marks completed chapters with a check and a Completed label.
- Each chapter page has a “Mark chapter as completed” toggle. Completion is saved in browser local storage under `vico-foundation1-completed-chapters` and updates the progress display when the pages are opened again.
- Existing routes, sidebar navigation, chapter names, and study material/exercise/test pages are preserved.

## Run on Windows
1. Extract the ZIP.
2. Open the extracted `VICL-main` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

```powershell
cd student
npm install
npm run dev
```

5. Open the localhost URL printed by Vite (usually `http://localhost:5173`).

Note: chapter completion is currently a learner-controlled prototype indicator; it is not yet connected to a server/database or validated against lesson completion.
