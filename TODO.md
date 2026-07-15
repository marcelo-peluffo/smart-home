# TODO

Planned work to get this project from a working prototype to something more solid.

## Docker integration

- [ ] Dockerfile for `backend/` (Node/Express).
- [ ] Dockerfile for `frontend/` (Vite build, served statically or via dev server).
- [ ] `docker-compose.yml` at the repo root wiring both services together, replacing `initialize.sh` as the way services are started (a multi-container app instead of two processes launched from one script).
- [ ] Decide how `pi.local:3000` (hardcoded in the frontend) maps to the backend service name/port under Compose.

## SQLite integration

Persistence needed for `backend/` (currently everything is an in-memory variable that resets on restart — see `hasDogEaten` in `backend/main.js`).

- [ ] Add SQLite as the storage layer for scan events/status (replaces the in-memory boolean).
- [ ] **Open decision — where SQLite lives:** leaning toward embedding it directly in the Express backend (e.g. via `better-sqlite3`), not a separate container. SQLite is a file-based embedded database with no network server/protocol, so it doesn't containerize the way Postgres/MySQL would — under Docker Compose this would most likely just mean the backend container mounts a volume for the `.db` file, not an additional service. Flagging as undecided until confirmed.
- [ ] Define the schema once the shape of "scan events" is settled (ties into the logging/timestamp work below).
- [ ] If Docker integration lands first, make sure the SQLite file path is on a mounted volume so data survives container restarts/rebuilds.

## Testing framework

- [ ] Pick and set up a test runner (backend currently has no test framework — `npm test` is a stub; frontend has none either).
- [ ] Backend: tests for the NFC-triggered routes (POST write endpoints, GET status endpoints), including the consume-once read behavior on `/status/dog-eat`.
- [ ] Frontend: component tests for the dashboard pieces (`GETButton`, `ClearButton`, `DogEatenLabel`, etc.).
- [ ] Wire test commands into `package.json` scripts for both `backend/` and `frontend/`.

## Backend: JS → TS migration

- [ ] Evaluate switching `backend/` from plain JS to TypeScript (frontend is already TS).
- [ ] If adopted, add a build/type-check step and update `initialize.sh` / Docker setup accordingly.

## Dashboard visual design

Right now the dashboard is unstyled — plain HTML buttons/text with no layout, spacing, color, or typography (Tailwind is installed but not really used yet). Give it an actual look:

- [ ] Establish a real layout: a page shell/header instead of a flat stack of buttons and a `<br>`.
- [ ] Apply Tailwind styling to existing components (`GETButton`, `ClearButton`, `DogEatenLabel`) — spacing, typography, color, button states (hover/active/disabled).
- [ ] Replace raw JSON/text dumps (e.g. the GET button showing `JSON.stringify(result)` as its label) with proper status cards/labels.
- [ ] Add visual feedback for state: loading state while a fetch is in flight, success/error styling instead of plain text swaps.
- [ ] Design each NFC-tracked item (e.g. "has the dog eaten") as its own card/tile, since the dashboard will show multiple tags/logs as the NFC features grow.
- [ ] Pick a color palette/theme and apply it consistently (dark mode optional but worth considering for a device likely checked at odd hours).
- [ ] Make the layout responsive so it's usable from a phone, since users will likely check the dashboard on mobile.

## Make NFC tags do more than fire a single HTTP request

- [ ] Move past the single hardcoded boolean-flip pattern (`hasDogEaten`) toward persisted, timestamped events (a real log of scans, not just a one-shot status).
- [ ] Support calendar-style views — e.g. see a history of scans over days/weeks, not just "did it happen since last check."
- [ ] Let a single NFC tag trigger more than one kind of action (not just a fixed POST to a fixed endpoint).
- [ ] Let users define custom actions per NFC tag from the dashboard (e.g. configure what a given tag does/logs without editing backend code).
- [ ] Figure out persistence (DB or file-backed storage) to support the above — current state is in-memory only and resets on server restart.
