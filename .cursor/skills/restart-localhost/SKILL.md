---
name: restart-localhost
description: >-
  Restart the overthinkingit Eleventy dev server on http://localhost:8080/ by
  freeing port 8080 then running npm start. Use when the user asks to restart
  localhost, restart the server, recycle 8080, or the site is stuck/stale and
  needs a fresh Eleventy serve.
---

# Restart localhost (port 8080)

Stop whatever is on **port 8080**, then start a fresh Eleventy server. Do this immediately — do not explore the codebase first.

## Steps

1. **Repo root** — run commands from the workspace root (where `package.json` lives).
2. **Free port 8080** (PowerShell on Windows):

   ```powershell
   $pids = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue |
     Select-Object -ExpandProperty OwningProcess -Unique
   if ($pids) { $pids | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue } }
   ```

   If nothing was listening, continue anyway.
3. **Start** — in the background:

   ```powershell
   npm start
   ```

   This runs `eleventy --serve` on **8080**.
4. **Confirm** — wait until the terminal shows `Server at http://localhost:8080/`. If start fails (port still busy, build error), report the error and stop.
5. **Reply** — one short line that the server restarted at `http://localhost:8080/`.

## Rules

- Always kill listeners on 8080 before starting — that is the restart.
- Do not change the port unless the user asks.
- For a cold start with nothing running, [start-localhost](../start-localhost/SKILL.md) is enough; this skill still works (no-op kill, then start).
