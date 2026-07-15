# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project purpose

This is a self-hosted smart home system built around NFC stickers as physical "endpoints." Each NFC tag is programmed to fire an HTTP request at the backend when scanned by a phone (e.g. scanning a tag mounted near the dog's food bowl POSTs to `/api/dog-eat`). The frontend is a dashboard, meant to be visited on the local network, that shows the current status derived from those scans (e.g. "has the dog eaten today, and when").

Everything runs locally — no cloud, no auth. The backend is intended to run on a Raspberry Pi on the home network (see `pi.local:3000` references in the frontend and `initialize.sh`).

The pattern used for the dog-eating feature (`/api/dog-eat` POST from the NFC scan, `/status/dog-eat` GET polled by the frontend) is the template for adding new NFC-triggered features — e.g. a counter that increments per scan, or a log of scan timestamps. When extending, follow this same shape: one write endpoint the tag hits, one read endpoint the dashboard polls.

**Current state (see recent commits):** the dog-eat status is tracked as a single in-memory boolean (`hasDogEaten` in `backend/main.js`) that resets to `false` once read. There is no persistence (no DB/file storage) and no timestamp/log yet — that's flagged as not-yet-implemented work.

## Repository layout

- `backend/` — Express (v5) API server, single-file (`main.js`), plain JS (no TS, no build step).
- `frontend/` — React 19 + TypeScript + Vite dashboard, styled with Tailwind v4.
- `initialize.sh` — starts both backend and frontend for local dev (see below).

Do not browse `node_modules/` in either `backend/` or `frontend/` — it's dependency code, not project code, and irrelevant to this project's logic.

## Commands

Run from the repo root:
```bash
./initialize.sh   # starts backend (node backend/main.js) in background + frontend dev server (foreground)
```

Backend (`backend/`):
```bash
node main.js       # run the API server directly (listens on port 3000)
```
No lint, build, or test scripts are configured for the backend (`npm test` is a stub that exits with an error).

Frontend (`frontend/`):
```bash
npm run dev        # Vite dev server with --host (accessible on LAN)
npm run build       # tsc -b && vite build
npm run lint         # oxlint
npm run preview     # preview the production build
```
No frontend test runner is configured.

## Architecture notes

- **Backend → frontend coupling is by convention, not by shared types.** The frontend hardcodes the backend base URL (`http://pi.local:3000`) directly in components (see `frontend/src/App.tsx`, `frontend/src/components/DogEatenLabel.tsx`). When adding a new backend route, wire the frontend call to the same host.
- **Status endpoints are consume-once GETs.** `/status/dog-eat` returns `{ dogEat: true }` once, then flips the underlying state back to `false` on read. Keep this in mind if adding polling/refresh logic — reading a status endpoint can itself change backend state.
- **Express responses must always call `res.send`/`res.json`.** This was a deliberate fix (see commit history) — every route handler needs an explicit response or the request hangs.
- **Frontend components are small and single-purpose**, one component per file in `frontend/src/components/`, no shared state/store library — state is lifted to `App.tsx` and passed via props (see `GETButton`, `ClearButton`, `DogEatenLabel`).
