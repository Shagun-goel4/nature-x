# Nature-X Backend

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Set up MongoDB (local or Atlas) and update `.env` if needed.
3. Seed lessons:
   ```
   npm run dev
   node src/seed.js
   ```
4. Start server:
   ```
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login
- `GET /api/user/me` — Get user profile
- `POST /api/user/progress` — Update progress/eco-points
- `GET /api/user/dashboard` — Dashboard (points, badges, progress)
- `GET /api/lessons` — List lessons
- `GET /api/lessons/:id` — Lesson detail (with quiz/game)
- `POST /api/lessons/:id/quiz` — Submit quiz
- `POST /api/lessons/:id/game` — Submit game result
- `GET /api/leaderboard` — Top eco-warriors
