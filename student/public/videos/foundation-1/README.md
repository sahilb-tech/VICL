# VICL Foundation 1 chapter videos

Place the nine lesson videos in this folder as `chapter-1.mp4` through `chapter-9.mp4`.
The chapter player loads the matching file automatically.

## Progress tracking in this build
- Video watch position, percent watched, and completion are stored in browser localStorage.
- Topic completion is stored separately.
- Chapter 1 activity completion is tracked across its seven topic activities.
- Chapter 1 quiz score is stored when the quiz is submitted.
- Results & Progress shows video progress, topics completed, activity status, quiz score, and derived chapter status.

This is browser-local persistence for the current prototype. It is not shared across browsers/devices or separate user accounts. Before production, save these records through the authenticated backend and associate them with the student's account.

The chapter quiz and interactive activity flows for Chapters 2–9 are not implemented yet; their video and topic progress can be tracked, but those chapters will remain In progress until their assessment features are added.
