---
name: write-planned-article
description: >-
  Write overthinkingit guide articles that are planned in CONTENT_PLAN.md but
  not yet created. Requires a voice exemplar source (and a named brief/slug or
  “next” gap). Discovers planned gaps, drafts concepts/*.njk or suttas/*.njk
  from the matching brief, creates hero/thumb assets, audits voice, runs an
  imitation≠theft plagiarism pass against the exemplar, wires guide.js /
  related links / pali.js, marks the brief written in CONTENT_PLAN.md, and
  rebuilds so /guide/ shows the page live. Use when the user asks to write the
  next planned page, draft from the content plan, fill a guide "Planned" item,
  or create a missing concept/sutta article from CONTENT_PLAN.md.
---

# Write planned article — overthinking it

End-to-end workflow for turning a **CONTENT_PLAN brief** into a live concept page, calibrated to a **voice exemplar the user supplies**.

Voice, tone, Pali spans, clear contemplative cadence, audit criteria, exemplar handling, and plagiarism pass live in the companion skill — **always read it before drafting**:
[`.cursor/skills/content-voice/SKILL.md`](../content-voice/SKILL.md)

Prose reference (cadence, diction, no-memoir perspective):
[`.cursor/skills/content-voice/clear-contemplative-voice.md`](../content-voice/clear-contemplative-voice.md)

Briefs and publish conventions:
[`CONTENT_PLAN.md`](../../../CONTENT_PLAN.md)

Guide source of truth for Planned badges:
[`_data/guide.js`](../../../_data/guide.js)

---

## Required inputs

| Input | Required? | Examples |
|-------|-----------|----------|
| **Target** | Yes | Named brief/title, slug, guide “Planned” item, or “next” / “early win” |
| **Exemplar source** | Yes | On-site page, local file/PDF path, URL, or named corpus the agent can read |

**If the exemplar is missing, ask once** and wait. Do not default to a fixed on-site “canonical” trio.

Optional: constraints on the exemplar (e.g. “no first person,” “cadence only”). Honor those when sampling.

Invocation shape:

> write planned *How to read a sutta* with exemplar `concepts/second-arrow.njk`

> next planned article, exemplar `C:\path\to\source`

---

## When to use

- User asks for the next planned article, an early-win draft, or a named CONTENT_PLAN title **and** supplies (or is asked for) an exemplar
- User points at a guide item still marked Planned
- User says write / draft / create a missing page from the content plan

Do **not** use this skill to rewrite live pages (use [full-rewrite-article](../full-rewrite-article/SKILL.md) for a from-scratch rewrite, or content-voice Audit mode for surgical edits) or to invent pages outside CONTENT_PLAN unless the user explicitly expands the plan first.

---

## Workflow

Copy and track:

```
Planned article progress:
- [ ] 1. Discover gaps (guide.js planned:true vs concepts/*.njk)
- [ ] 2. Confirm which brief to write (user pick or suggested early win) + exemplar source
- [ ] 3. Read brief + content-voice + clear-contemplative-voice; sample the exemplar
- [ ] 4. Draft concepts/<slug>.njk or suttas/<slug>.njk per brief (front matter + body in clear contemplative voice)
- [ ] 5. Run content-voice Audit mode; fix Must/Should issues
- [ ] 6. Imitation ≠ theft pass against the exemplar; rewrite fingerprint lines
- [ ] 7. Create hero image; scale/copy for thumb (required — not TBD)
- [ ] 8. Publish wiring (guide.js, related backlinks, pali.js)
- [ ] 9. Mark brief written in CONTENT_PLAN.md (required — keep plan in sync with guide.js)
- [ ] 10. Rebuild site (`npm run build`) and verify /guide/ shows the item live (linked, no Planned badge)
```

### 1. Discover gaps

A page is a **gap** when `_data/guide.js` has `planned: true` for that title **and** no matching page file exists at the brief’s section (`concepts/<slug>.njk` or `suttas/<slug>.njk`).

Cross-check:
- `CONTENT_PLAN.md` section headings / slug table (note **Section** — concepts vs suttas)
- Existing files under `concepts/` and `suttas/`
- Live guide items (have `url`, no `planned: true`) — skip these even if a brief remains in CONTENT_PLAN

If the user did not name a page, list remaining gaps briefly and recommend from CONTENT_PLAN “Early momentum wins,” skipping any already live.

### 2. Confirm the target + exemplar

Before writing, state:
- Title + slug + order from the brief
- Est. word count
- Related links and backlinks listed in the brief
- Exemplar source (path/URL) and any user constraints on it

If the user already named the article, skip the menu and proceed — but still confirm the exemplar.

### 3. Read before drafting

Required reads (in order):
1. Matching brief in `CONTENT_PLAN.md` (front matter draft, outline, related, backlinks)
2. [content-voice skill](../content-voice/SKILL.md) — Voice pillars + **Exemplar source** + **Imitation ≠ theft** + Draft mode checklist + **Hero imagery**
3. [clear-contemplative-voice.md](../content-voice/clear-contemplative-voice.md) — cadence, diction, perspective (no memoir)
4. The **user-supplied exemplar** — sample for cadence and rhetorical moves; site voice pillars and Pali/canon accuracy still win on conflict

Do **not** fall back to a hard-coded on-site exemplar list when the user provided one.

Defaults from `concepts/concepts.11tydata.json` (`layout`, `section`, `navSection`) — do not duplicate those in front matter.

### 4. Draft the page

Create `<section>/<slug>.njk` where **Section** and `<slug>` match the brief (e.g. `how-to-sit` → `concepts/how-to-sit.njk`; `sallatha` → `suttas/sallatha.njk`).

**Front matter** — copy from the brief; fill required fields:

```yaml
title: …
subtitle: …
description: …
image: <slug>.jpg       # required before handoff — see §7 Assets
imageAlt: "…"           # visible description + what it evokes
meta: …
excerpt: …
thumb: <slug>.jpg       # required matching thumb under images/thumbs/
order: N                # from brief
related:
  - title: "…"
    url: /…
```

For **sutta** pages, also set `reference:` (e.g. `SN 36.6`) and match peers under `suttas/`. Concept pages use defaults from `concepts/concepts.11tydata.json` — do not duplicate those in front matter.

**Do not leave `image` / `thumb` as `TBD.jpg` when shipping** — generate or obtain assets first (or get an explicit reuse decision), then set the real filenames.

**Body** — follow content-voice Article shape, written in clear contemplative voice, **imitating** the exemplar’s register where useful:
1. Hook — cold open claim + negation-correction and/or lived universal scene (not memoir); optional brief *you* / *we* opening
2. `<hr>` + thematic `<h2>` sections matching the brief outline: confusion → mechanism → practice implication (note intentional deviations)
3. If the brief’s stage/neighbors earn it: a subtle guide-placement bridge (optional `Why Here`) per content-voice **Guide placement** — link `/guide/`, do not assume the reader followed the path
4. Optional `<blockquote>` + `<cite>— … (adapted)</cite>` when a real canonical line carries the point
5. Closing synthesis — implication for attention or understanding (not a bullet recap or hype CTA)

**Hard rules**
- Every Pali term uses `<span class="pali" data-pali="…" data-en="…">…</span>`
- Stay inside est. word count (±15% ok if clarity needs it)
- No first-person memoir or “in my experience” as Dhamma authority; rare humility framing only if site peers use it
- Metaphysics (kamma, rebirth, etc.): pragmatic “as if” per content-voice pillar 3 — neither dogma nor erasure
- Cadence: varied sentence length, turn words (*But* / *However* / *Of course*), punch seals sparingly; canonical simile preferred over invented metaphor
- Do not silently reuse an existing `images/thumbs/` file — create a new pair or get an explicit reuse decision
- When briefing or choosing a hero, follow **Hero imagery** in the content-voice skill (symbolic/illustrated house style; not literal photoreal staging)
- Planned pages live under `/concepts/` or `/suttas/` as the brief specifies (no `/practice/`)

### 5. Voice audit

Run **Workflow B — Audit mode** from the content-voice skill on the new file, including clear-contemplative prose checks (memoir, soft lead-in, cadence, diction). Fix all **Must fix** and **Should fix** findings before the plagiarism pass / publish wiring.

### 6. Imitation ≠ theft pass (required)

Follow **Imitation ≠ theft** in [content-voice](../content-voice/SKILL.md). Goal: **imitation, not theft**.

Compare distinctive phrasing against the exemplar; rewrite fingerprint seals and near-verbatim skeletons. **Must not ship** unattributed near-copies. Handback notes that the pass ran (or “no fingerprint overlaps found”).

### 7. Assets (required)

Before publish wiring / handoff:

1. Generate or obtain a **new** hero at `images/<slug>.jpg` (or `.png` if matching site peers like `flame`) — **one** generation only.
2. Derive `images/thumbs/<slug>.jpg` by **scaling/copying that same file** (same composition and aspect ratio; compress so the thumb is not a multi‑MB clone). Do **not** generate a second image for the thumb.
3. Set front matter `image` / `thumb` to those filenames; write `imageAlt` per content-voice.
4. Follow house style (content-voice **Hero imagery** / **Hero → thumb**). Reject wellness stock, blank meditators, and literal staged parables.
5. Add the new thumb name to the **Claimed thumbs** list in `CONTENT_PLAN.md` Assets when shipping.

Leaving assets as `TBD.jpg` is only allowed mid-draft if the user explicitly asks to stop before assets — never as a completed handoff.

### 8. Publish wiring

After the draft passes audit **and** the plagiarism pass **and** assets are in place:

1. **`_data/guide.js`** — on the matching item: set `url` to the slug path (trailing slash), add `meta` if the brief/live peers use it, **remove** `planned: true`. Keep `title` and `annotation`.
2. **Backlinks** — add this page to `related:` (or equivalent) on pages listed under the brief’s “Backlinks once live,” only where those files exist.
3. **`js/pali.js`** — add any new Pali terms introduced in the article.
4. Proceed to **§9 Mark CONTENT_PLAN written** (required — do not leave the plan listing a live page as Planned).
5. **Rebuild / verify** — run `npm run build` and confirm `_site/guide/index.html` lists the item as a **link** (not `guide-item--planned`). If `eleventy --serve` is already running, either rely on the `_data` require-cache bust in `.eleventy.js`, or restart the serve process after editing `_data/guide.js` — a stale Node module cache previously left Planned badges in place even after source was correct.

### 9. Mark CONTENT_PLAN written (required)

When the page ships, **sync `CONTENT_PLAN.md` automatically** so the plan matches `guide.js`. Do this every time — do not wait for the user to ask. Keep full brief text only if useful for provenance; prefer moving the item out of **Planned pages** into **Written briefs**.

Required edits in [`CONTENT_PLAN.md`](../../../CONTENT_PLAN.md):

1. **Status table** — set **Planned in guide.js** count to the number of remaining `planned: true` items in `_data/guide.js`; update the Notes link/list to the remaining brief(s) only (or “none” if the plan is clear).
2. **Planned pages (writing briefs)** — remove the shipped brief from this section (do not leave a live page under Planned).
3. **Written briefs (no longer gaps)** — add a row: Title | URL | Stage. Create the section if missing. One-line note is enough — do not paste the full outline back.
4. **Current guide arc** — drop `*(planned)*` / italics-planned markup for the shipped title; leave remaining gaps marked `*(planned)*`.
5. **Early momentum wins** (if the title appears there) — strike through or mark **written**; leave only still-planned items active.
6. **Claimed thumbs** — add the new thumb slug if not already listed; clear any “hero still needed” note for this page.
7. **Stale “(planned)” mentions** — fix congruency / checklist / neighbor notes that still call this page planned (e.g. R# related targets). Leave true remaining gaps (other planned titles) alone.
8. **Suggested writing order / checklist A** — if they name a default queue, point at the next remaining planned gap (or say the planned queue is empty).

Do **not** delete the Shipped archive or Written briefs tables. Do **not** invent new planned titles here.

### 10. Hand back

Report briefly:
- Path created
- Guide stage updated **and** rebuild verified (Planned badge gone)
- CONTENT_PLAN marked written (Status count + Written briefs row)
- Exemplar used + plagiarism-pass result
- Image + thumb paths (never “still TBD” on a completed ship)
- Backlinks / pali.js changes (or “none”)
- Any outline deviations from the brief

Do not commit unless the user asks.

---

## Gap quick-reference

Truth for “still planned” is `planned: true` in `_data/guide.js`, not the presence of a CONTENT_PLAN brief. After wiring, truth for “user can see it live” is the **built** `/guide/` output — rebuild before claiming done. Truth for “plan is up to date” is: Status count matches `guide.js`, and the shipped title is under **Written briefs**, not **Planned pages**.

When the user says “next” or “an early win”: use remaining `planned: true` items in guide order (stages 1 → 5), skipping anything already live. Prefer CONTENT_PLAN “Early momentum wins” / “Suggested writing order” only for titles that are still planned.

---

## Anti-patterns

- Drafting without an exemplar source (or inventing a default without asking)
- Drafting without reading the content-voice skill and clear-contemplative-voice reference
- Shipping near-verbatim lines from the exemplar (theft, not imitation)
- Soft influencer lead-ins or first-person memoir as teaching authority
- Creating a page not in CONTENT_PLAN / guide.js without updating the plan first
- Reusing a claimed thumb without an explicit decision
- Handing off with `image: TBD.jpg` / `thumb: TBD.jpg`
- Shipping a literal photoreal / staged-parable hero instead of the symbolic illustrated house style (content-voice Hero imagery)
- Leaving `planned: true` after the page exists and is meant to be live
- Shipping a live page but leaving its brief under **Planned pages** / Status count stale / guide-arc still marked `(planned)`
- Updating `_data/guide.js` but skipping `npm run build` / not verifying `_site/guide/`
- Assuming a long-lived `eleventy --serve` picked up `guide.js` when `_site/guide/` still shows Planned (verify the built HTML; restart serve if needed)
- Wellness/therapy register, attainment-flex, or dogmatic metaphysics — or secular erasure of kamma/rebirth when the subject needs them (prefer content-voice pillar 3: pragmatic “as if”)
- Dumping glossary lists instead of in-sentence Pali spans
