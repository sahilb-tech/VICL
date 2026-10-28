# VICL — Visual & Interactive Computer Literacy Learning

<<<<<<< HEAD
VICL is a beginner-focused computer literacy learning platform. This package contains the active React + Vite student application, a scaffold for the future admin panel, a shared backend, and project documentation.
=======
VICL is a beginner-focused computer literacy learning platform. This repository contains the Student Panel, a scaffold for future Admin Panel development, and the shared backend/database.
>>>>>>> origin/main

## Project structure

```text
<<<<<<< HEAD
VICL-main/
├── student/                 # Active React + Vite student application
│   └── public/videos/foundation-1/  # Foundation 1 chapter videos
├── admin/                   # Admin panel scaffold
├── backend/                 # Shared Node.js + Express API
├── database/                # Database schema and setup files
└── docs/                    # Canonical project specifications
```

## Run the student application

Open a terminal in `student/`, then run:
=======
VICL/
├── student/                 # React + Vite Student Panel
├── admin/                   # Admin Panel scaffold; not implemented yet
├── backend/                 # Shared Node.js + Express API
├── database/                # Shared MySQL schema and setup files
├── assets/
├── docs/                    # Project specifications and implementation status
└── README.md
```

## Run the Student Panel

From the `student` directory:
>>>>>>> origin/main

```sh
npm install
npm run dev
```

<<<<<<< HEAD
`npm install` installs the student app dependencies. `npm run dev` starts the Vite development server; open the local URL printed in the terminal. To verify a production build, run `npm run build` from `student/`.

## Add chapter videos

Place MP4 files in `student/public/videos/foundation-1/`. Use `chapter-1.mp4` through `chapter-9.mp4`. Chapter 1 is currently connected in `student/src/pages/StudentPortal.jsx`; chapters 2–9 still need their video paths connected in that file after their MP4s are added. See `README-VIDEO-FIRST-VISUAL-DESIGN.md` for details.

## Backend

The backend is separate from the student frontend. Follow the configuration instructions in `backend/` and use the example environment file before starting it. Do not put real secrets in source control.

## Documentation

The canonical PRD, SRS, system architecture, UI/UX specification, and development plan are stored in `docs/`.
=======
Vite prints the local URL, normally `http://localhost:5173`. To create a production build, run `npm run build` from the same directory.

## Shared backend and database

The backend is shared by the Student and future Admin applications; it is not duplicated under either application folder. From `backend`, install dependencies with `npm install`, copy `.env.example` to `.env`, configure the environment, then run `npm run dev`. The backend uses the MySQL schema in `database/schema.sql`.

## Documentation

The product requirements, software requirements, system architecture, UI/UX specification, and development plan are in `docs/`.
>>>>>>> origin/main
