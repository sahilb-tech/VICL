# VICL Admin Panel

This directory is reserved for the future VICL Admin Panel. The panel is not implemented here yet; the existing UI and routes have not been moved or removed from the Student Panel.

The planned application structure is organized by responsibility:

- `src/components/` — reusable UI components
- `src/layouts/` — page-level layouts and navigation
- `src/pages/` — Admin Panel screens
- `src/routes/` — route definitions and access control
- `src/services/` — API clients for the shared backend
- `src/styles/` — application-wide styles

The Admin Panel will use the shared API in `../backend`; do not add a duplicate backend or database here.
