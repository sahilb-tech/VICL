# VICL Foundation 1 — Video-first chapter design

This update adds a responsive, video-first learning layout inspired by the supplied course interface reference.

## What's included
- Large 16:9 chapter video player in the main content area.
- Right-side Course Content panel with the current chapter's topics.
- Current-topic and completed-topic visual states.
- Purple VICL styling, rounded cards, responsive layout, and mobile stacking.
- Chapter 1 subtitled video bundled at `student/public/videos/foundation-1/chapter-1.mp4`.
- The same visual layout is available on all nine chapter routes.
- Chapter 1 keeps its existing interactive topic content, practice questions, quiz, and progress controls.

## Important video asset note
Only the Chapter 1 MP4 was available in the working files used to prepare this ZIP. Chapters 2–9 show a designed video-player placeholder until their MP4 files are copied into `student/public/videos/foundation-1/` and the `videoPath` mapping in `student/src/pages/StudentPortal.jsx` is updated.

Expected filenames:
- `chapter-2.mp4` — Applications of Computers
- `chapter-3.mp4` — Keyboard and Mouse
- `chapter-4.mp4` — Parts of a Computer
- `chapter-5.mp4` — IPO Cycle
- `chapter-6.mp4` — Fun with Tux Paint
- `chapter-7.mp4` — Sequencing and Decoding
- `chapter-8.mp4` — Instructions and Direction Sense
- `chapter-9.mp4` — AI and Robotics

See `student/public/videos/foundation-1/README.md` for the same instructions.

## Run locally
1. Extract the ZIP.
2. Open a terminal in the `VICL-main/student` folder.
3. Run `npm install` to install the frontend dependencies.
4. Run `npm run dev` to start the Vite development server.
5. Open the local URL shown in the terminal and sign in using your project's existing setup.

The existing project configuration and routes are preserved in this update.
