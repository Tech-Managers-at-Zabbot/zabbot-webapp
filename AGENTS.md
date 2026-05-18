# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Zabbot is a **Next.js 15 frontend-only** language learning web application (Yoruba and other languages). It communicates with a separate backend API (not in this repo) via `NEXT_PUBLIC_API_URL`.

### Key commands

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (uses Turbopack, reads `.env.development`) |
| Build | `npm run build` |
| Lint | `npm run lint` |

### Environment

- **Node.js v22** is required (the VM has it pre-installed).
- A `.env.development` file must exist with at minimum `NEXT_PUBLIC_API_URL` set. Without this file, `npm run dev` will fail because the dev script uses `dotenv -e .env.development`.
- The backend API is external; most data-dependent features (auth, lessons, leaderboard) will show errors without it.

### Gotchas

- **No automated tests exist** in this repository. There are no test files or test runner configured beyond `@types/jest` in devDependencies.
- The dev script (`npm run dev`) uses `dotenv-cli` to load `.env.development` — if the file is missing, the command errors out immediately.
- The `next.config.ts` allows images from `res.cloudinary.com` only; adding other image domains requires updating this config.
- `npm run lint` is `next lint` and will succeed with warnings only (no errors in the current codebase).
