---
name: content-voice
description: >-
  Draft or audit overthinkingit concept, sutta, practice, and guide pages for
  voice, tone, structure, and hero imagery. Use when writing new content from
  CONTENT_PLAN.md, editing existing .njk articles, choosing or reviewing page
  images, or when the user asks to check tone, voice, humility, Pali conventions,
  visual style, or editorial consistency on this site.
---

# Content voice — overthinking it

Project editorial voice for Pali-Buddhist notes: confident about the texts, provisional about interpretation, practical without wellness jargon. Hero images follow the same register — symbolic and contemplative, not cinematic illustration of the teaching.

Canonical exemplars (read before drafting or auditing):
- [index.njk](../../../index.njk) — framing, humility, path-spirals close
- [concepts/five-hindrances.njk](../../../concepts/five-hindrances.njk) — practical hook, similes, antidotes
- [concepts/nibbana.njk](../../../concepts/nibbana.njk) — negation-then-correction, careful metaphysics

Image exemplars (prefer these over photoreal outliers): `images/angles.jpg`, `images/jhanas.jpg` / thumbs, `images/flame.png`, `images/proliferate.jpg`, `images/thumbs/suffering.jpg`, `images/thumbs/heart.jpg`.

Writing briefs for planned pages: [CONTENT_PLAN.md](../../../CONTENT_PLAN.md).

To create a page that is still marked Planned in the guide, use the companion workflow skill first: [write-planned-article](../write-planned-article/SKILL.md) (discover gap → draft → audit → wire guide.js).

---

## Voice pillars

### 1. Negation-then-correction
Rule out the common misreading first, then state what is meant.

- Good: "They are not sins, failures, or signs that meditation is not working. They are ordinary features of a mind that has not yet been trained…"
- Good: "Nibbāna also is not a pleasant meditative state. … The canon distinguishes between states arising in practice and the unconditioned itself."
- Bad: Jump straight to a positive definition that still sounds like the popular misunderstanding.

### 2. Epistemic humility
Be firm about what the texts say; stay provisional about what *you* conclude.

Markers that belong here: "notes, not conclusions"; "worth holding lightly"; "may be unanswerable from the outside"; "Nothing here is final."

- Good: confident paraphrase of a sutta + soft edges on interpretation
- Bad: "The true meaning is X" / "Anyone who understands will see…"

### 3. Punch-sentence closers
After a longer explanatory stretch, land a short sentence.

Examples from the site: "The path spirals." / "The water, in the Buddha's similes, can become clear." / "That, more than any metaphysical description, is what the teaching is pointing toward."

Do not end every section this way — use sparingly where the thought needs a seal.

### 4. Canonical similes over invented metaphors
Prefer water/dye/mud/wind, raft, flame-fuel, second arrow, and other traditional images. Invented poetic metaphors are allowed only when they clarify; never decorate.

### 5. Direct address in practical openings
Especially for practice-facing pages: "If you have ever sat down to meditate and found the mind pulled toward…"

Do not sustain second-person coaching for the whole article. Return to third-person exposition of the teaching.

### 6. Sparing first person
First person only for authorial framing ("I have not got there yet", "I am trying to work something out") — never as the authority for the Dhamma itself. Prefer "the canon", "the tradition", "the Buddha".

### 7. Register to avoid
- Therapy-speak and wellness jargon ("hold space", "self-care", "manifest", domesticated "mindfulness" without Pali context)
- Dogmatic absolutes and attainment-flexing
- Sensational mysticism or stage-chasing progress charts
- Sectarian score-settling; this site is Pali-primary and can bridge carefully (see Stage 5 briefs)

---

## Structural conventions

### Article shape
1. Hook paragraphs (context + why it matters)
2. `<hr>` then thematic `<h2>` sections
3. Optional mid/late `<blockquote>` with canonical citation and `<cite>— SN/MN/… (adapted)</cite>`
4. Closing synthesis (not a bullet recap)

### Pali terms
Every Pali term in body copy:

```html
<span class="pali" data-pali="dukkha" data-en="suffering">dukkha</span>
```

- Introduce in-sentence; never dump a glossary list in the article body
- English gloss in `data-en` should match site glossary sense; add new terms to `js/pali.js` when introducing them
- Titles may use a Pali em dash form: `Nīvaraṇas — The Five Hindrances`

### Front matter (concepts/suttas)
Required pattern: `title`, `subtitle`, `description`, `image`, `imageAlt`, `meta`, `excerpt`, `thumb`, `order`, optional `next` / `related`.

New pages need new image assets unless reuse is an explicit decision — see CONTENT_PLAN.md Assets and **Hero imagery** below.

### Length
Typical concept page: ~900–1800 words. Prefer clarity over coverage.

---

## Hero imagery

Page figures should match the site’s illustrated, contemplative register — the same humility and symbolic economy as the prose. Prefer *evoking* the teaching over *staging* it.

### House style (default)

Most live heroes share these traits:

- **Illustrated / painterly**, not photorealistic photography. Soft grain, canvas, paper, or stipple texture is welcome; sharp cinematic stock look is not.
- **Symbolic, not literal.** A glass triangle for the three characteristics; a soap bubble for jhāna; a flame and its reflection for nibbāna; luminous threads for papañca. Do not film the simile (e.g. arrows mid-flight into a stump for the second arrow).
- **One quiet focal symbol** in a dreamlike, abstract, or sparsely surreal space. Stillness over action; atmosphere over narrative plot.
- **Palette:** warm dusk/dawn accents (gold, peach, terracotta) against cool deep fields (indigo, teal, violet, charcoal). Soft internal glow rather than harsh directional drama.
- **Mood:** contemplative, slightly otherworldly, never sensational or “epic.”

`imageAlt` should name what is seen, then briefly what it evokes — matching existing alts (see `concepts/*.njk`).

### Acceptable variety within the house

| Mode | What it looks like | Strong exemplars |
|------|--------------------|------------------|
| Surreal symbolic landscape | Stylized horizon, water, path, or object in a constructed dreamscape | `angles`, `jhanas`, `shore`, `noble-eightfold-path`, `impermanence`, `suffering` |
| Abstract luminous form | Geometry, translucent ribbons, split fields, fine-line overlays | `proliferate`, `heart`, `foundation` |
| Quiet iconic object | Single object + dark field + soft radiance | `flame` |
| Visionary figure (sparingly) | Silhouette or body as vessel for cosmos / pattern | `khandhas` |
| Hand-media texture | Watercolor bleed, impasto geometry — still *made*, not photographed | `middle-way`, `foundation` |

### Avoid (common generation failures)

- **Cinematic photorealism** — shallow DoF meadow, mist, motion blur, “film still” lighting
- **Literal staging of the teaching** — illustrating the parable as a scene instead of a symbol
- **Action / impact drama** — projectiles, collisions, kinetic storytelling
- **Wellness stock** — spa stones, blank meditators, generic lotus product shots
- **Purple glow kitsch** or overcooked sacred-geometry wallpaper (geometry is fine when spare and purposeful, as in `proliferate`)

Photoreal close-ups of a single object on a dark field (`view`) are rare outliers; do not treat them as the house center.

### Prompting shorthand

When generating or briefing an image: *painterly digital illustration, soft paper grain, one symbolic focal object, contemplative surreal atmosphere, warm gold against deep indigo/teal, no photorealism, no literal narrative scene.*

Pair every new hero with a matching thumb under `images/thumbs/`. Claimed thumbs and asset TODO rules: CONTENT_PLAN.md Assets. **Shipping with `TBD.jpg` is a Must-fix** — assets are required for handoff, not optional notes.

---

## Workflow A — Draft mode

Use when writing a new page (often from CONTENT_PLAN.md).

Copy and track:

```
Draft progress:
- [ ] Brief read (section, slug, outline, related links)
- [ ] Front matter drafted (title/subtitle/meta/excerpt; real `image`/`thumb` filenames — not TBD at handoff)
- [ ] Hook uses negation-correction and/or lived opening as appropriate
- [ ] H2 outline matches brief (or intentional deviation noted)
- [ ] Pali spans on every term; new terms listed for pali.js
- [ ] At least one canonical simile or text citation where it fits
- [ ] Humility markers present; no attainment-flex or stage-chase
- [ ] Punch closer only where earned
- [ ] Hero image + thumb created in house style (symbolic / illustrated; not literal photoreal)
- [ ] related: wired; backlinks from plan listed as follow-ups
- [ ] Run Audit mode on the draft before considering done
```

**Draft steps**
1. Open the matching CONTENT_PLAN brief and this skill.
2. Skim one exemplar (`five-hindrances` for practice-facing; `nibbana` for subtle/conceptual).
3. Write the hook and H2 skeleton before filling sections.
4. Fill sections; prefer short paragraphs; insert `<hr>` between major movements.
5. Add blockquote only if a real canonical line carries the point.
6. Create hero + thumb assets (or explicit reuse); set front matter — **required before handoff**.
7. Run **Audit mode** below; fix issues; then wire guide.js / related links per the plan checklist and **rebuild** so `/guide/` updates.

---

## Workflow B — Audit mode

Use when reviewing an existing or newly drafted `.njk` article for voice drift.

Copy and track:

```
Audit:
- [ ] Read full article once without editing
- [ ] Flag absolute / dogmatic claims
- [ ] Flag missing humility where interpretation is strong
- [ ] Flag invented metaphor where a canonical simile exists
- [ ] Flag wellness/therapy register
- [ ] Flag first-person teaching claims
- [ ] Check Pali span coverage and data-en quality
- [ ] Check structure (hook → hr/H2s → optional cite → close)
- [ ] Check related links / internal anchors still live
- [ ] Check hero image against Hero imagery (symbolic/illustrated vs literal photoreal)
- [ ] Produce line-level suggestions (not vague vibe notes)
```

**How to report findings**

For each issue:
1. Quote the offending sentence (or cite `startLine:endLine:path`)
2. Name the pillar violated
3. Offer a concrete rewrite in site voice

For image issues: name the file, say which house-style rule it breaks, and offer a short regeneration brief (subject + mode from the variety table + avoid list).

Severity:
- **Must fix** — wrong teaching claim, missing Pali span on a defined term, dogmatic absolute, wellness jargon, shipping with `TBD` image/thumb, guide still `planned: true` when page is meant live
- **Should fix** — weak humility on contested interpretation, invented metaphor crowding a canonical one, structural drift, hero image outside house style (literal photoreal / staged parable)
- **Optional** — punch-closer opportunity, slight rhythm polish

Do not rewrite the whole page unless asked. Prefer surgical edits.

---

## Quick before / after

**Absolute → provisional**
- Before: "Anattā means there is no self whatsoever."
- After: "Anattā is not the claim that 'you don't exist.' It is the refusal to treat any aggregate — or the collection of them — as a permanent owner of experience."

**Wellness → site register**
- Before: "Use mindfulness to hold space for your inner child."
- After: "Know when the hindrance is present; know when it is absent. The naming itself — done without judgment — creates a small gap between the hindrance and identification with it."

**Invented metaphor → canonical**
- Before: "The mind is a snow globe you shake every morning."
- After: "The simile is water stirred by wind: constantly moving, rippling, never still enough to reflect."

**Literal photoreal hero → house style**
- Before: Cinematic photo of two arrows striking a wooden stump in mist (stages the second-arrow simile as a film still).
- After: Painterly dark field; one slender luminous shaft already present, a second fainter shaft or echo beside it — soft grain, no motion blur, no landscape documentary realism. Or a quieter symbol: a single ripple doubling on still water.
