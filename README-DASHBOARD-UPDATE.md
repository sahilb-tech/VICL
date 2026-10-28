# VICO Dashboard Update

## Changes
- Added a clear arrow/link on the current Chapter 1 summary card. It opens `/student/learning`.
- Replaced the old learning preview with “Up next in Foundation 1”, linking the next chapter cards to My Learning.
- Added an overall Foundation 1 book progress bar and a nine-chapter progress chart.
- Progress values are read from the existing local progress service where available. Chapters without recorded curriculum/progress data are shown as 0% / not started rather than inventing progress.

## Run
From the `VICL-main/vico-student` directory:

```powershell
npm install
npm run dev
```

The dashboard uses the existing React Router route `/student/learning` for chapter navigation.
