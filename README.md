# VICL — Visual & Interactive Computer Literacy Learning

VICL is a beginner-focused computer literacy learning platform. This repository contains the Student Panel, a scaffold for future Admin Panel development, and the shared backend/database.

## Project structure

```text
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

```sh
npm install
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`. To create a production build, run `npm run build` from the same directory.

## Shared backend and database

The backend is shared by the Student and future Admin applications; it is not duplicated under either application folder. From `backend`, install dependencies with `npm install`, copy `.env.example` to `.env`, configure the environment, then run `npm run dev`. The backend uses the MySQL schema in `database/schema.sql`.

## Documentation

The product requirements, software requirements, system architecture, UI/UX specification, and development plan are in `docs/`.
