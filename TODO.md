# TODO

Planned work to get this project from a working prototype to something more solid.

## Docker integration

- [ ] Dockerfile for `backend/` (Node/Express).
- [ ] Dockerfile for `frontend/` (Vite build, served statically or via dev server).
- [ ] `docker-compose.yml` at the repo root wiring both services together, replacing `initialize.sh` as the way services are started (a multi-container app instead of two processes launched from one script).
- [ ] Decide how `pi.local:3000` (hardcoded in the frontend) maps to the backend service name/port under Compose.

## Testing framework

- [ ] Pick and set up a test runner (backend currently has no test framework — `npm test` is a stub; frontend has none either).
- [ ] Backend: tests for the NFC-triggered routes (POST write endpoints, GET status endpoints), including the consume-once read behavior on `/status/dog-eat`.
- [ ] Frontend: component tests for the dashboard pieces (`GETButton`, `ClearButton`, `DogEatenLabel`, etc.).
- [ ] Wire test commands into `package.json` scripts for both `backend/` and `frontend/`.

## Backend: JS → TS migration

- [ ] Evaluate switching `backend/` from plain JS to TypeScript (frontend is already TS).
- [ ] If adopted, add a build/type-check step and update `initialize.sh` / Docker setup accordingly.

## Make NFC tags do more than fire a single HTTP request

- [ ] Move past the single hardcoded boolean-flip pattern (`hasDogEaten`) toward persisted, timestamped events (a real log of scans, not just a one-shot status).
- [ ] Support calendar-style views — e.g. see a history of scans over days/weeks, not just "did it happen since last check."
- [ ] Let a single NFC tag trigger more than one kind of action (not just a fixed POST to a fixed endpoint).
- [ ] Let users define custom actions per NFC tag from the dashboard (e.g. configure what a given tag does/logs without editing backend code).
- [ ] Figure out persistence (DB or file-backed storage) to support the above — current state is in-memory only and resets on server restart.
