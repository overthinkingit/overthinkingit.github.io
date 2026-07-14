---
name: full-rewrite-article
description: >-
  Fully rewrite an existing overthinkingit concept or sutta page from a site
  URL or path plus a voice exemplar source. Uses the live page as reference
  (teaching claims, links, slug) but designs a new argument and structure —
  not a paraphrase. Applies content-voice, runs an imitation≠theft plagiarism
  pass against the exemplar, regenerates hero assets when needed, updates
  pali.js, and rebuilds. Use when the user pastes a /concepts/ or /suttas/
  link (or local URL) with an exemplar and asks to recreate, rewrite from
  scratch, full rewrite, or redo the page without being limited to the
  current outline.
---

# Full rewrite article — overthinking it

End-to-end workflow for a **from-scratch rewrite** of a live page the user points at by URL or path, calibrated to a **voice exemplar they supply**.

Voice, tone, Pali spans, cadence, audit criteria, exemplar handling, and plagiarism pass live in the companion skill — **always read before drafting**:
[`.cursor/skills/content-voice/SKILL.md`](../content-voice/SKILL.md)

Prose reference:
[`.cursor/skills/content-voice/clear-contemplative-voice.md`](../content-voice/clear-contemplative-voice.md)

---

## Required inputs

Before starting, the user must supply **both**:

| Input | Examples |
|-------|----------|
| **Target URL or path** | `http://localhost:8080/concepts/nibbana/`, `/concepts/nibbana/`, `concepts/nibbana.njk` |
| **Exemplar source** | On-site page (`concepts/second-arrow.njk`), local file/PDF path, URL, or a named corpus the agent can read |

**If either is missing, ask once** and wait. Do not default to a fixed “canonical” on-site trio.

Optional: constraints on the exemplar (e.g. “no first person,” “cadence only, not metaphysics”). Honor those when sampling the source.

Invocation shape (any close wording is fine):

> full rewrite `http://localhost:8080/concepts/foo/` with exemplar `C:\path\to\source`

---

## When to use

- User gives a site link or path **and** an exemplar, and asks to rewrite / recreate / redo / rewrite from scratch
- User wants a **full rewrite**, not a polish or voice pass
- User says the existing page can be referenced but must not constrain the new piece

### Do not use this skill when

| Request | Use instead |
|---------|-------------|
| New page still `planned: true` in guide | [write-planned-article](../write-planned-article/SKILL.md) |
| Voice audit / surgical edits only | [content-voice](../content-voice/SKILL.md) Audit mode |
| Light rephrase keeping the same H2s | content-voice Audit + edit — **not** this skill |

If unclear whether they want paraphrase or full rewrite, ask once. Default for “recreate” / “full rewrite” / “not limited to existing content” → this skill.

---

## Hard rule: rewrite ≠ rephrase

**Forbidden**
- Walking the old file paragraph-by-paragraph and polishing sentences
- Keeping the old H2 skeleton by default “because it was there”
- Treating the live page as the outline
- Producing a draft that a diff would show as mostly synonym swaps

**Required**
- Treat the live page as **source material**, not a template
- Design a **new** hook, sectioning, and movement before writing body copy
- Keep only what still earns its place: accurate teaching claims, stable slug/URL, useful related links, front-matter identity
- Prefer a different structure when the old one is encyclopedic, checklist-flat, or duplicates a sibling page’s job

**Self-check before shipping** (must pass):
> Could a careful reader tell this was rebuilt as a new essay that happens to cover the same teaching — not an edited clone of the previous HTML?

If no → rewrite again; do not ship a paraphrase.

---

## What to preserve vs reinvent

| Preserve (unless user says otherwise) | Reinvent freely |
|--------------------------------------|-----------------|
| URL / filename / `order` | Hook, H2 outline, section order |
| Core teaching accuracy (canon-faithful) | Which angles, scenes, similes, citations |
| Working `related` / `next` when still apt | Emphasis, length within ~900–1800 words |
| Guide entry (already live) | Hero image + thumb when style or emphasis shifts |
| Section (`concepts` / `suttas`) | Title/subtitle/excerpt/meta if a clearer frame fits |

Optional: skim `CONTENT_PLAN.md` if a brief exists for this slug — use as **one** input among others, not a straitjacket.

---

## Workflow

Copy and track:

```
Full rewrite progress:
- [ ] 1. Confirm target URL/path + exemplar source (ask if either missing)
- [ ] 2. Resolve URL → source .njk; read as reference only
- [ ] 3. Extract inventory (claims, links, gaps, sibling overlap)
- [ ] 4. Read content-voice + clear-contemplative-voice; sample the exemplar (cadence/moves — not wholesale copy)
- [ ] 5. Propose NEW outline (do not paste old H2s); confirm only if user asked
- [ ] 6. Write fresh draft into the same .njk (front matter refreshed)
- [ ] 7. content-voice Audit; fix Must/Should; pass rewrite self-check
- [ ] 8. Imitation ≠ theft pass against the exemplar; rewrite fingerprint lines
- [ ] 9. Hero: keep only if house-style + on-theme; else generate one master, scale for thumb
- [ ] 10. pali.js for new terms; related/backlinks if changed
- [ ] 11. npm run build; spot-check the URL
```

### 1. Confirm inputs

State back the target and exemplar in one line, then proceed. If the exemplar is outside the repo (PDF, book file, URL), read enough to sample **voice moves** (cold opens, seals, distinction-making, register) — not to transplant paragraphs.

### 2. Resolve the target

Map the user’s link to a file:

| Input | Source |
|-------|--------|
| `/concepts/<slug>/` | `concepts/<slug>.njk` |
| `/suttas/<slug>/` | `suttas/<slug>.njk` |
| Full `overthinkingit` / local URL | same path mapping |
| Bare slug | search `concepts/` then `suttas/` |

Read the full current article **once** for inventory. Do not start editing mid-read.

### 3. Reference inventory (extract, then set aside)

From the live page, note briefly:

1. **Must-keep claims** — teaching points that would be wrong to drop or distort
2. **Useful links** — related, next, in-body anchors that should survive
3. **Failures of the current piece** — soft open, encyclopedia list, memoir, wrong job vs a sibling (e.g. factor-map vs three-trainings lens), flat cadence, weak image
4. **Freedom notes** — angles the old page never took; scenes or canonical similes that would serve better

Then **stop mirroring**. The inventory is constraints and opportunities, not an outline.

Also skim sibling pages that cover adjacent ground so the rewrite does a distinct job (e.g. eightfold-path vs three-trainings).

### 4. Read before drafting

Required:
1. [content-voice](../content-voice/SKILL.md) — pillars, Article shape, Hero imagery, **Exemplar source**, **Imitation ≠ theft**, Draft + Audit checklists
2. [clear-contemplative-voice.md](../content-voice/clear-contemplative-voice.md)
3. The **user-supplied exemplar** — sample for cadence and rhetorical moves; site voice pillars and Pali/canon accuracy still win on conflict

Do **not** fall back to a hard-coded on-site exemplar list when the user provided one.

### 5. New outline first

Write a short outline (hook claim + 3–6 H2 movements) **before** body prose.

Good movement (from clear-contemplative-voice): cold open → lived/universal scene or direct address → name confusion → mechanism → practice implication → close on attention/understanding.

Bad default: “same eight numbered factors in the same three buckets because the old page did that” — only keep that shape if it is still the best way to do **this** page’s job after considering alternatives (e.g. confusion-first, path-as-wheel, one factor as lens, spiral narrative).

If the user did not ask to approve the outline, proceed after writing it for yourself (optionally state it in one short paragraph).

### 6. Draft fresh

Overwrite the body of the same `.njk` with a new essay in clear contemplative voice, **imitating** the exemplar’s register where useful.

**Front matter** — refresh `subtitle`, `description`, `excerpt`, `imageAlt`, and title only if the new frame is clearer; keep `order` and path identity.

**Body** — content-voice Article shape; every Pali term in spans; no first-person Dhamma authority (unless the user explicitly overrides site rules); humility on interpretation; canonical similes preferred. On kamma/rebirth and similar claims, use content-voice pillar 3 (pragmatic “as if”) — neither forced belief nor quiet deletion.

**Length** — typical concept ~900–1800 words. Full rewrite may be longer or shorter than the previous version if clarity improves.

Do not open the old paragraphs in a side-by-side and “upgrade” them. Draft from the new outline and the inventory’s must-keep claims only.

### 7. Audit + rewrite self-check

Run content-voice **Audit mode**. Then the rewrite self-check above.

Fail conditions (rewrite again):
- Diff is mostly wording changes under the same headings
- Hook is the old first paragraph with a new first sentence
- Sister page already owns the angle and this rewrite still duplicates it

### 8. Imitation ≠ theft pass (required)

Follow **Imitation ≠ theft** in [content-voice](../content-voice/SKILL.md). Goal: **imitation, not theft**.

After the draft exists, compare distinctive phrasing against the exemplar source:

1. Flag near-verbatim seals, sentence skeletons, and trademark openers/closers
2. Rewrite every fingerprint line in site voice (same idea/cadence energy is fine; same wording is not)
3. Prefer canonical / site-native phrasing for teaching claims; do not import the exemplar’s proprietary metaphysics or anecdotes unless the user asked for that content job
4. Handback: note that the plagiarism pass ran (and list any lines rewritten), or state “no fingerprint overlaps found”

**Must not ship** with unattributed near-copies of the exemplar’s distinctive sentences.

### 9. Hero imagery

- Keep existing `image` / `thumb` only if they already match content-voice Hero imagery **and** still fit the new emphasis
- Otherwise generate **one** new hero (house style: symbolic / painterly; not literal parable staging), then **scale/copy** it to `images/thumbs/` — do not generate a second image for the thumb (see content-voice **Hero → thumb**)
- Never ship `TBD.jpg`

### 10. Wiring

- Add new Pali terms to `js/pali.js`
- Update `related` / in-body links if the new argument needs different companions
- Do **not** flip `planned: true` or invent guide rows — this skill is for pages already live
- `npm run build` and confirm the URL renders

### 11. Handback

Briefly tell the user:
- What job the new piece does vs the old one
- Structural changes (not a sentence changelog)
- Exemplar used + plagiarism-pass result
- Image kept or regenerated
- Any follow-ups (backlinks, sibling pages that may need a pass)

---

## Quick before / after (skill intent)

**Rephrase (wrong for this skill)**
- Same H2s → smoother sentences, same checklist energy

**Full rewrite (right)**
- New cold open and sectioning → same teaching kept accurate → distinct job vs siblings → would stand if the old file were lost

**Theft (wrong) vs imitation (right)**
- Wrong: transplanting the exemplar’s seal sentences with light synonym swaps
- Right: learning cadence and pressure from the exemplar, then writing original lines that still sound like this site

---

## Companions

- Voice / audit / imagery / plagiarism pass: [content-voice](../content-voice/SKILL.md)
- New planned pages: [write-planned-article](../write-planned-article/SKILL.md)
- Briefs (optional input): [`CONTENT_PLAN.md`](../../../CONTENT_PLAN.md)
