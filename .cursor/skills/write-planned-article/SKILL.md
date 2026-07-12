---
name: write-planned-article
description: >-
  Write overthinkingit guide articles that are planned in CONTENT_PLAN.md but
  not yet created. Discovers planned gaps, drafts concepts/*.njk from the matching
  brief, creates hero/thumb assets, audits voice, wires guide.js / related links /
  pali.js, and rebuilds so /guide/ shows the page live. Use when the user asks to
  write the next planned page, draft from the content plan, fill a guide "Planned"
  item, or create a missing concept article from CONTENT_PLAN.md.
---

# Write planned article — overthinking it

End-to-end workflow for turning a **CONTENT_PLAN brief** into a live concept page.

Voice, tone, Pali spans, and audit criteria live in the companion skill — **always read it before drafting**:
[`.cursor/skills/content-voice/SKILL.md`](../content-voice/SKILL.md)

Briefs and publish conventions:
[`CONTENT_PLAN.md`](../../../CONTENT_PLAN.md)

Guide source of truth for Planned badges:
[`_data/guide.js`](../../../_data/guide.js)

---

## When to use

- User asks for the next planned article, an early-win draft, or a named CONTENT_PLAN title
- User points at a guide item still marked Planned
- User says write / draft / create a missing page from the content plan

Do **not** use this skill to rewrite live pages (use content-voice Audit mode) or to invent pages outside CONTENT_PLAN unless the user explicitly expands the plan first.

---

## Workflow

Copy and track:

```
Planned article progress:
- [ ] 1. Discover gaps (guide.js planned:true vs concepts/*.njk)
- [ ] 2. Confirm which brief to write (user pick or suggested early win)
- [ ] 3. Read brief + content-voice + one exemplar
- [ ] 4. Draft concepts/<slug>.njk (front matter + body)
- [ ] 5. Run content-voice Audit mode; fix Must/Should issues
- [ ] 6. Create hero image + matching thumb (required — not TBD)
- [ ] 7. Publish wiring (guide.js, related backlinks, pali.js)
- [ ] 8. Rebuild site (`npm run build`) and verify /guide/ shows the item live (linked, no Planned badge)
```

### 1. Discover gaps

A page is a **gap** when `_data/guide.js` has `planned: true` for that title **and** no matching `concepts/<slug>.njk` exists.

Cross-check:
- `CONTENT_PLAN.md` section headings / slug table
- Existing files under `concepts/`
- Live guide items (have `url`, no `planned: true`) — skip these even if a brief remains in CONTENT_PLAN

If the user did not name a page, list remaining gaps briefly and recommend from CONTENT_PLAN “Early momentum wins,” skipping any already live.

### 2. Confirm the target

Before writing, state:
- Title + slug + order from the brief
- Est. word count
- Related links and backlinks listed in the brief

If the user already named the article, skip the menu and proceed.

### 3. Read before drafting

Required reads (in order):
1. Matching brief in `CONTENT_PLAN.md` (front matter draft, outline, related, backlinks)
2. [content-voice skill](../content-voice/SKILL.md) — Voice pillars + Draft mode checklist + **Hero imagery**
3. One exemplar:
   - Practice / how-to → `concepts/five-hindrances.njk` or `concepts/second-arrow.njk`
   - Subtle / metaphysical / Stage 5 → `concepts/nibbana.njk`

Defaults from `concepts/concepts.11tydata.json` (`layout`, `section`, `navSection`) — do not duplicate those in front matter.

### 4. Draft the page

Create `concepts/<slug>.njk` where `<slug>` matches the brief (e.g. `how-to-sit` → `concepts/how-to-sit.njk`).

**Front matter** — copy from the brief; fill required fields:

```yaml
title: …
subtitle: …
description: …
image: <slug>.jpg       # required before handoff — see §6 Assets
imageAlt: "…"           # visible description + what it evokes
meta: …
excerpt: …
thumb: <slug>.jpg       # required matching thumb under images/thumbs/
order: N                # from brief
related:
  - title: "…"
    url: /…
```

Include `next:` only if the brief specifies it. **Do not leave `image` / `thumb` as `TBD.jpg` when shipping** — generate or obtain assets first (or get an explicit reuse decision), then set the real filenames.

**Body** — follow content-voice Article shape:
1. Hook (negation-correction and/or lived opening as appropriate)
2. `<hr>` + thematic `<h2>` sections matching the brief outline (note intentional deviations)
3. Optional `<blockquote>` + `<cite>— … (adapted)</cite>` when a real canonical line carries the point
4. Closing synthesis (not a bullet recap)

**Hard rules**
- Every Pali term uses `<span class="pali" data-pali="…" data-en="…">…</span>`
- Stay inside est. word count (±15% ok if clarity needs it)
- Do not silently reuse an existing `images/thumbs/` file — create a new pair or get an explicit reuse decision
- When briefing or choosing a hero, follow **Hero imagery** in the content-voice skill (symbolic/illustrated house style; not literal photoreal staging)
- All planned pages go under `/concepts/` (no `/practice/`)

### 5. Voice audit

Run **Workflow B — Audit mode** from the content-voice skill on the new file. Fix all **Must fix** and **Should fix** findings before publish wiring.

### 6. Assets (required)

Before publish wiring / handoff:

1. Generate or obtain a **new** hero at `images/<slug>.jpg` (or `.png` if matching site peers like `flame`).
2. Create a matching thumb at `images/thumbs/<slug>.jpg` (resize/compress as needed; do not leave a multi‑MB duplicate as the only thumb).
3. Set front matter `image` / `thumb` to those filenames; write `imageAlt` per content-voice.
4. Follow house style (content-voice **Hero imagery**). Reject wellness stock, blank meditators, and literal staged parables.
5. Add the new thumb name to the **Claimed thumbs** list in `CONTENT_PLAN.md` Assets when shipping.

Leaving assets as `TBD.jpg` is only allowed mid-draft if the user explicitly asks to stop before assets — never as a completed handoff.

### 7. Publish wiring

After the draft passes audit **and** assets are in place:

1. **`_data/guide.js`** — on the matching item: set `url` to the slug path (trailing slash), add `meta` if the brief/live peers use it, **remove** `planned: true`. Keep `title` and `annotation`.
2. **Backlinks** — add this page to `related:` (or equivalent) on pages listed under the brief’s “Backlinks once live,” only where those files exist.
3. **`js/pali.js`** — add any new Pali terms introduced in the article.
4. **Rebuild / verify** — run `npm run build` and confirm `_site/guide/index.html` lists the item as a **link** (not `guide-item--planned`). If `eleventy --serve` is already running, either rely on the `_data` require-cache bust in `.eleventy.js`, or restart the serve process after editing `_data/guide.js` — a stale Node module cache previously left Planned badges in place even after source was correct.
5. Do **not** delete the CONTENT_PLAN brief unless the user asks; stale briefs for live pages are fine. Do update Claimed thumbs / early-wins notes when the page ships.

### 8. Hand back

Report briefly:
- Path created
- Guide stage updated **and** rebuild verified (Planned badge gone)
- Image + thumb paths (never “still TBD” on a completed ship)
- Backlinks / pali.js changes (or “none”)
- Any outline deviations from the brief

Do not commit unless the user asks.

---

## Gap quick-reference

Truth for “still planned” is `planned: true` in `_data/guide.js`, not the presence of a CONTENT_PLAN section. After wiring, truth for “user can see it live” is the **built** `/guide/` output — rebuild before claiming done.

Suggested default order when the user says “next” or “an early win” (skip if already live):
1. When a hindrance dissolves
2. How to read a sutta
3. The three trainings — sīla, samādhi, paññā

Otherwise prefer guide stages 1 → 5.

---

## Anti-patterns

- Drafting without reading the content-voice skill
- Creating a page not in CONTENT_PLAN / guide.js without updating the plan first
- Reusing a claimed thumb without an explicit decision
- Handing off with `image: TBD.jpg` / `thumb: TBD.jpg`
- Shipping a literal photoreal / staged-parable hero instead of the symbolic illustrated house style (content-voice Hero imagery)
- Leaving `planned: true` after the page exists and is meant to be live
- Updating `_data/guide.js` but skipping `npm run build` / not verifying `_site/guide/`
- Assuming a long-lived `eleventy --serve` picked up `guide.js` when `_site/guide/` still shows Planned (verify the built HTML; restart serve if needed)
- Wellness/therapy register, attainment-flex, or dogmatic metaphysics (content-voice)
- Dumping glossary lists instead of in-sentence Pali spans
