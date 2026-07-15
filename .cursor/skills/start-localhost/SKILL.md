---
name: start-localhost
description: >-
  Start the overthinkingit Eleventy dev server on http://localhost:8080/.
  Use when the user asks to start localhost, start the server, run the site
  locally, bring up 8080, or npm start after a reboot or with no active terminal.
---

# Start localhost (port 8080)

Start the site’s Eleventy watcher/server on **port 8080**. Do this immediately — do not explore the codebase first.

## Steps

1. **Repo root** — run commands from the workspace root (where `package.json` lives).
2. **Already up?** — if something is already listening on 8080 and serving the site, tell the user `http://localhost:8080/` is ready and stop. Do not start a second server.
3. **Start** — in the background:

   ```powershell
   npm start
   ```

   This runs `eleventy --serve`, which binds to **8080** by default.
4. **Confirm** — wait until the terminal shows `Server at http://localhost:8080/` (or equivalent). If the build fails, report the error; do not claim the server is up.
5. **Reply** — one short line with the URL: `http://localhost:8080/`.

## Rules

- Prefer `npm start` (or `npm run dev`) — same script.
- Do not change the port unless the user asks.
- Do not kill an existing healthy server; use [restart-localhost](../restart-localhost/SKILL.md) for that.
