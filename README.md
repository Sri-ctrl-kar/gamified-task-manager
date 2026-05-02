# Gamified Task Manager

A student-style React capstone project that turns tasks into XP rewards. Users can add tasks, complete them for XP, level up every 100 XP, and keep progress saved through `localStorage`.

## Features

- Task dashboard with active and completed task sections
- XP progress bar and leveling system
- Reward modal when the user levels up
- Search, filter, and sort for active missions
- Dark mode toggle
- Report route with lazy loading
- Motivational quote API with offline fallback
- Browser persistence using `localStorage`
- React architecture split into components, hooks, assets, and CSS files

## SOP Alignment

- Domain: Education / productivity
- Frontend: React with Vite
- State Management: Context API plus React hooks
- Routing: React Router
- API/Data Integration: Fetch API for motivational quote data
- CRUD: Add, complete, and delete tasks
- Advanced Features: Search + filter + sort, dark mode toggle, memoized task filtering, lazy-loaded report route
- Styling: Vanilla CSS organized by component

## Tech Stack

- React
- Vite
- React Router
- Context API
- Vanilla CSS
- `useState`, `useEffect`, and `useMemo`

## Run Locally

```bash
npm install
npm run dev
```
