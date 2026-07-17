# Content plan — planned pages & guide congruency

Writing briefs for items marked `planned: true` in [`_data/guide.js`](_data/guide.js), plus revision notes so live pages stay congruent with the guide arc.

**Companions:**
- [`.cursor/skills/write-planned-article/SKILL.md`](.cursor/skills/write-planned-article/SKILL.md) — discover planned gaps and draft a missing page end-to-end
- [`.cursor/skills/full-rewrite-article/SKILL.md`](.cursor/skills/full-rewrite-article/SKILL.md) — from-scratch rewrite of a live URL (not paraphrase)
- [`.cursor/skills/content-voice/SKILL.md`](.cursor/skills/content-voice/SKILL.md) — voice, tone, and audit while drafting or revising

**Guide framing (Jul 2026):** ethics, unification, and wisdom as one spiral — not a sit-first ladder. Formal sitting appears in Foundations as a laboratory after view + sīla, not as the summit of the path. The guide is a first-class path through the site — prefer subtle “why here” / neighbor bridges when placement teaches something, always framed as relative to `/guide/` (do not assume every reader is following it). Full rule: [content-voice → Guide placement](.cursor/skills/content-voice/SKILL.md#guide-placement-why-here-and-neighbors).

---

## Status

| Bucket | Count | Notes |
|--------|-------|--------|
| **Planned in guide.js** | 0 | none — [Written briefs](#written-briefs-no-longer-gaps) |
| **Live guide items** | rest of arc | See [Written briefs](#written-briefs-no-longer-gaps) + [Shipped archive](#shipped-archive-original-16) |
| **Congruency revisions** | Batch 5 neighbors | Highest + light passes done — [tracker](#c-congruency-progress-tracker) |

---

## Conventions (shared across all briefs)

### Front matter shape
Match existing concept/sutta pages:

```yaml
title: …
subtitle: …
description: …
image: <slug>.jpg       # required before ship — see Assets
imageAlt: "…"
meta: …
excerpt: …
thumb: <slug>.jpg       # required matching thumb — see Assets
order: N                # append after current collection order
next:
  title: "…"
  url: /…
related:
  - title: "…"
    url: /…
```

Defaults for concepts come from [`concepts/concepts.11tydata.json`](concepts/concepts.11tydata.json). **Sutta pages** (e.g. Sallatha) live under `/suttas/` with the same related/next/image conventions as other sutta `.njk` files.

### Ordering
Append new pages at the next free `order` in their collection. Discovery is primarily via `/guide/`, not the flat `/concepts/` or `/suttas/` listings. Thematic renumbering later is optional.

### Guide references in prose
When a brief or congruency note cares about stage/neighbors, a short bridge is welcome (optional `Why Here` H2 or a closing beat). Keep it subtle: name why the placement matters, link `/guide/` if the argument leans on sequence, and say the order is relative to the guide — never require prior pages for the essay to work. See content-voice **Guide placement**.

### Assets (applies to every planned page)
Every existing thumb under `images/thumbs/` is already claimed by a live page **except** where a planned brief reuses a reserved filename. **Each new page needs a new hero image + matching thumb** (or a deliberate reuse decision) **before handoff** — do not ship with `image: TBD.jpg` / `thumb: TBD.jpg`.

Claimed thumbs today: `angles`, `anatta-in-practice`, `bojjhangas`, `breath`, `buddha-nature`, `cessation-experiences`, `devotion-and-ritual`, `dual-and-non-dual`, `emptiness`, `flame`, `foundation`, `heart`, `how-to-read-a-sutta`, `how-to-sit`, `impermanence`, `insight-cycles`, `jhanas`, `kamma`, `khandhas`, `middle-way`, `noble-eightfold-path`, `proliferate`, `practicing-off-the-cushion`, `rebirth`, `right-effort`, `sallatha`, `sati`, `second-arrow`, `shore`, `solace`, `suffering`, `tanha`, `three-trainings`, `two-truths`, `vedana`, `view`, `when-a-hindrance-dissolves`, `five-precepts`, `pali-glossary`, `saved-passages`, `what-is-this-place-a` (and variants).

**Reserved for planned pages (not yet on disk):** none.

**Note:** `images/middle-way.jpg` and `images/thumbs/middle-way.jpg` are paired (hero shipped with Middle Way page).

**Visual style** — match the house look documented in [`.cursor/skills/content-voice/SKILL.md`](.cursor/skills/content-voice/SKILL.md) (Hero imagery):

- Prefer **painterly / illustrated** heroes that *evoke* the teaching with one quiet symbol — not cinematic photoreal scenes that *stage* the simile.
- Strong reference set: `angles`, `jhanas`, `flame`, `proliferate`, `suffering`, `heart`, `shore`, `how-to-sit`.
- Avoid: motion-blur action, misty documentary landscapes, literal parable film-stills, wellness stock, blank meditators.
- Prompt shorthand: *painterly digital illustration, soft paper grain, one symbolic focal object, contemplative surreal atmosphere, warm gold against deep indigo/teal, no photorealism, no literal narrative scene.*
- `imageAlt`: describe what is visible, then what it evokes (see live `concepts/*.njk` alts).

### After publishing a page
1. Add hero + thumb under `images/` and `images/thumbs/`; set front matter filenames (required).
2. Add `url` to the matching item in `_data/guide.js` and remove `planned: true`.
3. Wire `related:` / backlinks listed in the brief.
4. Add any new Pali terms to `js/pali.js` if introduced.
5. Draft and audit against the content-voice skill.
6. **Mark this brief written in this file** (required — `write-planned-article` does this automatically): decrement Status **Planned** count; remove the brief from **Planned pages**; add a row under **Written briefs**; clear `(planned)` in the guide arc / early-wins / neighbor notes; update Claimed thumbs.
7. Run `npm run build` and confirm `/guide/` shows the item as a live link (no Planned badge). Source edits to `_data/guide.js` do not appear in `_site` until build. If a long-lived `eleventy --serve` still shows Planned after `guide.js` is correct, restart the serve process (`.eleventy.js` clears `_data` require cache on each build to reduce this).
8. Confirm the new page URL appears in `/sitemap.xml` (built from `collections.all` via [`sitemap.njk`](sitemap.njk) — no hand-edit unless the page sets `noindex` or is excluded from collections).

### Suggested writing order
Default queue: empty — no remaining `planned: true` gaps in `guide.js`.

**Early momentum wins** (tight scope, strong links to existing pages):
1. ~~**Taṇhā**~~ — **written**
2. ~~**Sati — mindfulness and wise attention**~~ — **written**
3. ~~**Bojjhaṅgā**~~ — **written**

Already written (prior queue):
1. ~~Vedanā~~ — **written**
2. ~~Sallatha Sutta~~ — **written**
3. ~~Right effort~~ — **written**
4. ~~The Middle Way~~ — **written**
5. ~~Kamma~~ — **written**
6. ~~Taṇhā~~ — **written**
7. ~~Sati~~ — **written**
8. ~~Bojjhaṅgā~~ — **written**

---

## Current guide arc (reference)

Source of truth: [`_data/guide.js`](_data/guide.js).

1. **Orientation** — homepage (opt), Kālāma, glossary (opt), saved (opt), how to read a sutta (opt)
2. **Foundations** — first discourse → Middle Way → eightfold → three trainings → precepts → Kamma → second arrow → Sallatha → Vedanā → Taṇhā → Sati → how to sit
3. **Deepening** — hindrances → Right effort → Bojjhaṅgā → Āṇāpānasati → when a hindrance dissolves → Satipaṭṭhāna → brahmavihāras → off the cushion → jhānas
4. **After some practice** — khandhas → ti-lakkhaṇa → Anattalakkhaṇa → anattā in practice → papañca → DO → Sammādiṭṭhi → insight cycles
5. **Counter-intuitive** — Alagaddūpama → nibbāna → dual/non-dual → emptiness → two truths → buddha-nature → cessation → rebirth → devotion

---

## Planned pages (writing briefs)

No remaining bedrock gaps — `planned: true` count in [`_data/guide.js`](_data/guide.js) is **0**. New titles belong here only after they are added to the guide as Planned.

---

## Written briefs (no longer gaps)

These were drafted as Planned; they are **live** in `guide.js`. Briefs retained only for provenance — do not treat as gaps.

| Title | URL | Stage |
|-------|-----|-------|
| Bojjhaṅgā — the seven factors of awakening | `/concepts/bojjhangas/` | 3 |
| Taṇhā — craving as the origin | `/concepts/tanha/` | 2 |
| Kamma — action and its result | `/concepts/kamma/` | 2 |
| The Middle Way | `/concepts/middle-way/` | 2 |
| Sallatha Sutta — The Dart | `/suttas/sallatha/` | 2 |
| Vedanā — feeling-tone | `/concepts/vedana/` | 2 |
| Right effort — the four right efforts | `/concepts/right-effort/` | 3 |
| Sati — mindfulness and wise attention | `/concepts/sati/` | 2 |

---

## Congruency revisions (live pages)

These pages shipped under an older guide order. Revise so openings, related links, and “what comes next” match the Jul 2026 arc. Prefer surgical edits (content-voice audit) unless a page needs a full rewrite.

### Highest priority

#### R1. `/concepts/how-to-sit/`
| Field | Value |
|-------|-------|
| **Priority** | Highest |
| **Issue** | Still reads like a Stage 1 starting gate; guide now places it at end of Foundations after ethics + second arrow / vedanā. |
| **Revise** | Opening: laboratory among three trainings, not the summit. Explicitly point back to precepts + three trainings; sit is useful early and not the whole path. |
| **Related target** | Keep Āṇāpānasati, hindrances, satipaṭṭhāna, off-cushion; **add** three trainings + five precepts. |
| **Homepage** | Coordinate with R16 so home does not imply sit-first. |

#### R2. `/concepts/khandhas/`
| Field | Value |
|-------|-------|
| **Priority** | Highest |
| **Issue** | Aggregates now open Stage 4 (“after some practice”), not Foundations. |
| **Revise** | Opening bridge: useful once there is practice to apply it to — ethics, sitting, and noticing ownership mid-reaction. Avoid implying this is day-one map work. |
| **Related target** | Keep ti-lakkhaṇa, Anattalakkhaṇa, anattā in practice; ensure order matches Stage 4 ladder. |

#### R3. `/concepts/second-arrow/`
| Field | Value |
|-------|-------|
| **Priority** | Highest |
| **Issue** | Now early Foundations; related list leans Stage 3–4 (papañca, ti-lakkhaṇa). |
| **Revise** | Soften advanced forward refs; add bridges to first discourse, precepts, Sallatha + vedanā. Keep one light forward to papañca if useful. |
| **Related target** | Dhammacakkappavattana; five precepts; Sallatha; vedanā; satipaṭṭhāna or hindrances as optional later links. |

#### R4. `/concepts/jhanas/`
| Field | Value |
|-------|-------|
| **Priority** | Highest |
| **Issue** | Now closes Deepening (samādhi), not Stage 4 insight cluster. |
| **Revise** | Opening: deepening once sitting and hindrances are underway — not “after insight rearranges experience.” |
| **Related target** | Keep Āṇāpānasati, hindrances, when-dissolves, three trainings; cessation can stay as careful forward link. |

#### R5. `/suttas/sammaditthi/`
| Field | Value |
|-------|-------|
| **Priority** | Highest |
| **Issue** | Now closes the DO thread in Stage 4; related still aims partly at Stage 5 (two truths). |
| **Revise** | Frame as right view operating on dependent origination after papañca/DO — application exam, not counter-intuitive metaphysics. |
| **Related target** | Prioritize paṭicca-samuppāda, eightfold, kālāma; demote or qualify two truths as later optional. |

#### R6. `/concepts/three-trainings/`
| Field | Value |
|-------|-------|
| **Priority** | Highest |
| **Issue** | Already aligned in voice; needs an explicit bridge to the new sequence. |
| **Revise** | Short passage or close: precepts → (kamma) → second arrow → sit as laboratory — spiral in the order the guide now uses. |
| **Related target** | Keep eightfold, precepts, first discourse; consider how-to-sit as forward related. |

---

### Light passes

#### R7. `/suttas/dhammacakkappavattana/`
Forward related toward Middle Way + three trainings / precepts / eightfold. Soften jumping straight to DO + Anattalakkhaṇa as the only next steps.

#### R8. `/concepts/eightfold-path/`
Confirm next beat is three trainings + precepts, not khandhas. Optionally preview right effort at the effort factor.

#### R9. `/concepts/five-precepts/`
Bridge to kamma and second arrow; note that how-to-sit comes after this Foundations cluster. Related: add second arrow; keep off-cushion as later deepening.

#### R10. `/concepts/five-hindrances/`
Now opens Deepening — bridge from how-to-sit; right effort is live as companion. Related order: when-dissolves, right effort, Āṇāpānasati / satipaṭṭhāna.

#### R11. `/concepts/when-a-hindrance-dissolves/`
Confirm related follows guide adjacency: five hindrances + Āṇāpānasati (guide places this after breath sutta); jhānas remain a careful forward link.

#### R12. `/concepts/practicing-off-the-cushion/`
Reinforce co-equal with sitting (not an appendix). Opening/close: most waking hours have no timer — same spiral as three trainings.

#### R13. `/concepts/anatta-in-practice/`
Keep contiguous with Anattalakkhaṇa / khandhas / ti-lakkhaṇa in related. Avoid implying jhānas as the next insight step.

#### R14. `/concepts/paticca-samuppada/`
Forward to Sammādiṭṭhi as the immediate application companion (already in related — confirm prominence over Stage 5 emptiness/rebirth in the “next” feel).

#### R15. `/suttas/alagaddupama/`
Now Stage 5 opener — light bridge from insight cycles / lived anattā: don’t clutch even right view. Related can keep dual/two-truths/buddha-nature as the Stage 5 cluster.

#### R16. Homepage `/` (`index.njk`)
“How to use these pages” (~lines 157–160) currently pairs Guide with How to Sit as the simple beginning. Revise so Guide leads; sitting is one laboratory after foundations, not the implied first practice move. Align with guide intro spiral language.

---

### Lower urgency (when planned pages ship or as time allows)

| Page | Note |
|------|------|
| `/concepts/rebirth/` | Add related/backlink to kamma once live — this-life action before cosmology. |
| `/suttas/satipatthana/` | Related: vedanā + Sallatha once live. |
| `/suttas/anapanasati/` | Related: how-to-sit, hindrances, right effort once live. |
| `/concepts/papanca/` | Future Madhupiṇḍika (MN 18) if added to guide later. |
| `/concepts/five-hindrances/` | Bojjhaṅgā list-mention linked to `/concepts/bojjhangas/` (shipped). |
| `/concepts/how-to-sit/` | Related: Sati added (live). |
| `/concepts/vedana/` | Related: Taṇhā live. |
| Sense restraint / right speech how-to / mettā how-to / walking / early refuge | Next-tier curriculum gaps — not yet briefed; revisit after the remaining bedrock pages ship. |
| `CONTENT_PLAN` / skill | `write-planned-article` already accepts `/suttas/` when the brief’s Section says so. |

---

### Suggested revision order

1. R16 homepage + R1 how-to-sit (framing pair)  
2. R6 three-trainings + R3 second-arrow (Foundations bridges)  
3. R2 khandhas + R4 jhanas + R5 sammaditthi (stage relocation)  
4. Light passes R7–R15  
5. Lower-urgency neighbors (Batch 5) as time allows — Kamma / Middle Way / Right effort already live

---

## Shipped archive (original 16)

These briefs were drafted when the items were still Planned. They are **live** now; keep this list for provenance. Do not treat as gaps. Later early-win pages are listed under [Written briefs](#written-briefs-no-longer-gaps).

| # | Title | URL | Original stage |
|---|-------|-----|----------------|
| 1 | How to sit | `/concepts/how-to-sit/` | 1 → now end of 2 |
| 2 | How to read a sutta | `/concepts/how-to-read-a-sutta/` | 1 |
| 3 | The three trainings | `/concepts/three-trainings/` | 2 |
| 4 | The five precepts | `/concepts/five-precepts/` | 2 |
| 5 | Practicing off the cushion | `/concepts/practicing-off-the-cushion/` | 3 |
| 6 | The second arrow | `/concepts/second-arrow/` | 3 → now 2 |
| 7 | When a hindrance dissolves | `/concepts/when-a-hindrance-dissolves/` | 3 |
| 8 | Anattā in practice | `/concepts/anatta-in-practice/` | 4 |
| 9 | Insight cycles | `/concepts/insight-cycles/` | 4 |
| 10 | Dual and non-dual | `/concepts/dual-and-non-dual/` | 5 |
| 11 | Emptiness | `/concepts/emptiness/` | 5 |
| 12 | The two truths | `/concepts/two-truths/` | 5 |
| 13 | Buddha-nature | `/concepts/buddha-nature/` | 5 |
| 14 | Cessation experiences | `/concepts/cessation-experiences/` | 5 |
| 15 | Rebirth | `/concepts/rebirth/` | 5 |
| 16 | Devotion and ritual | `/concepts/devotion-and-ritual/` | 5 |

---

## Checklists

Skills: planned pages → [write-planned-article](.cursor/skills/write-planned-article/SKILL.md); surgical congruency → [content-voice](.cursor/skills/content-voice/SKILL.md) **Audit mode**; full structural redo of a live URL → [full-rewrite-article](.cursor/skills/full-rewrite-article/SKILL.md) (only if audit is not enough). Truth for guide order is always [`_data/guide.js`](_data/guide.js).

---

### A. When a planned page ships

Use with the matching brief above. Remaining planned gaps: **none** (queue empty).

**Discover & draft**
- [ ] Confirm gap: `planned: true` in `_data/guide.js` **and** no file at brief’s Section/slug
- [ ] Exemplar source supplied (required for write-planned-article) — do not invent a default
- [ ] Brief read (outline, related, backlinks, assets, voice notes)
- [ ] `.njk` drafted under `concepts/` or `suttas/` as the brief specifies
- [ ] Sutta pages: `reference:` set; peer front matter matched
- [ ] Content-voice Draft mode + clear-contemplative cadence
- [ ] Content-voice **Audit mode** — fix Must / Should
- [ ] Imitation ≠ theft pass against the exemplar (note result)

**Assets**
- [ ] New hero at `images/<slug>.jpg` (or deliberate reuse decision) — not `TBD.jpg`
- [ ] Matching thumb at `images/thumbs/<slug>.jpg` (scale/copy from hero; do not generate a second image)
- [ ] `imageAlt` describes visible content + what it evokes
- [ ] Claimed thumbs list in this file updated
- [x] Middle Way: hero + thumb pair shipped (`images/middle-way.jpg`)

**Publish wiring**
- [ ] `_data/guide.js` — set `url` (trailing slash), keep title/annotation/meta, **remove** `planned: true`
- [ ] `related:` on the new page matches the brief
- [ ] Backlinks: add this page to `related:` on every live page listed under “Backlinks once live”
- [ ] Neighbor congruency: if a Highest / Light-pass item names this page as planned, update that neighbor’s related/bridge now (or open a follow-up R#)
- [ ] New Pali terms in `js/pali.js` if introduced (confirm existing entries for `vedanā`, `sammā vāyāma`, etc.)
- [ ] **CONTENT_PLAN sync (required):** Status Planned count; remove brief from Planned pages; add Written briefs row; clear `(planned)` in guide arc / early-wins / neighbor notes; Claimed thumbs
- [ ] `npm run build`
- [ ] `_site/guide/index.html` — item is a **link**, not `guide-item--planned` (restart `eleventy --serve` if badge is stale)
- [ ] `/sitemap.xml` includes the new URL
- [ ] Spot-check the new page URL in `_site/`
- [ ] Hand back: path, guide stage, CONTENT_PLAN marked written, exemplar + plagiarism result, image/thumb paths, backlinks/pali changes, outline deviations

**Do not**
- [ ] Leave `planned: true` after the page is meant to be live
- [ ] Leave the shipped brief under **Planned pages** / Status count stale / guide-arc still `(planned)`
- [ ] Ship with `image: TBD.jpg` / `thumb: TBD.jpg`
- [ ] Reuse a claimed thumb without an explicit decision
- [ ] Delete the Written briefs / Shipped archive tables (move the brief out of Planned; keep provenance rows)
---

### B. When a congruency revision ships

Use with the R# notes under [Congruency revisions](#congruency-revisions-live-pages). Prefer surgical edits (content-voice Audit). Use full-rewrite-article only if the user asks or the page needs a new argument/structure.

**Before editing**
- [ ] Read the R# row (Issue / Revise / Related target)
- [ ] Confirm current guide placement in `_data/guide.js` (stage + neighbors)
- [ ] Choose skill: Audit (default) vs full-rewrite (needs URL + exemplar)
- [ ] If the R# depends on a still-planned page: either (a) soft-bridge in prose without a dead related link, or (b) wait until that page ships, then finish related wiring

**Edit**
- [ ] Opening / early paragraphs match the new stage (no wrong-stage “day one” / “after insight” / sit-first implications)
- [ ] Guide-order / “Why Here” bridges (if any) are subtle, link `/guide/` when sequence matters, and do not assume the reader followed the path
- [ ] Closing / “what continues” matches guide neighbors where relevant
- [ ] `related:` and `next:` updated to Related target (order matters — put the next guide beat first when useful)
- [ ] Spiral framing intact: sīla / samādhi / paññā together; sit as laboratory, not summit (especially R1, R6, R12, R16)
- [ ] Pali spans still valid; no new bare Pali without `js/pali.js` if introduced
- [ ] Content-voice **Audit mode** (light) on touched sections — Must / Should fixed
- [ ] No wholesale rewrite unless that was the job

**Verify**
- [ ] `npm run build`
- [ ] Revised URL looks right in `_site/`
- [ ] `/guide/` still coherent for that item’s stage (annotation may already be correct — check if prose on the page contradicts it)
- [ ] Mark the R# done in [Progress tracker](#c-congruency-progress-tracker) below
- [ ] Note any deferred related links waiting on planned pages

**Do not**
- [ ] Invent new guide stages or reorder `_data/guide.js` inside a congruency pass (guide changes are a separate job)
- [ ] “Fix” voice by paraphrasing the whole article when a bridge + related list would do
- [ ] Link to planned URLs that 404 — wait or prose-only mention

---

### C. Congruency progress tracker

Suggested batches (from [Suggested revision order](#suggested-revision-order)). Check off when shipped.

**Batch 1 — Framing pair**
- [x] R16 Homepage `/`
- [x] R1 How to sit
- [x] Pair check: home does not imply sit-first; how-to-sit points at Guide + three trainings / precepts

**Batch 2 — Foundations bridges**
- [x] R6 Three trainings
- [x] R3 Second arrow
- [x] Pair check: sequence precepts → (kamma) → second arrow → sit is readable from both pages

**Batch 3 — Stage relocation**
- [x] R2 Khandhas
- [x] R4 Jhānas
- [x] R5 Sammādiṭṭhi

**Batch 4 — Light passes**
- [x] R7 Dhammacakkappavattana
- [x] R8 Eightfold path
- [x] R9 Five precepts
- [x] R10 Five hindrances
- [x] R11 When a hindrance dissolves
- [x] R12 Practicing off the cushion
- [x] R13 Anattā in practice
- [x] R14 Paṭicca-samuppāda
- [x] R15 Alagaddūpama

**Batch 5 — After planned pages ship** (re-open as each gap goes live)
- [ ] Neighbors of Vedanā (second arrow, how-to-sit, satipaṭṭhāna)
- [ ] Neighbors of Sallatha (second arrow, vedanā)
- [ ] Neighbors of Kamma (precepts, rebirth, three trainings)
- [ ] Neighbors of Middle Way (first discourse, eightfold)
- [ ] Neighbors of Right effort (hindrances, eightfold, when-dissolves)
- [ ] Lower-urgency table rows (rebirth, satipaṭṭhāna, Āṇāpānasati, papañca)

---

### D. Session handoff (either track)

When pausing mid-batch, leave a short note for the next session:

- [ ] Which R# / planned brief is in progress
- [ ] What was already edited (paths)
- [ ] What is blocked on a planned page
- [ ] Whether `_data/guide.js` or only `.njk` files changed
- [ ] Whether `npm run build` was run after the last change
