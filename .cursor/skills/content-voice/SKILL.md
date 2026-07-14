---
name: content-voice
description: >-
  Draft or audit overthinkingit concept, sutta, practice, and guide pages for
  voice, tone, structure, and hero imagery. Use when writing new content from
  CONTENT_PLAN.md, editing existing .njk articles, choosing or reviewing page
  images, or when the user asks to check tone, voice, humility, Pali conventions,
  visual style, clear contemplative cadence, or editorial consistency on this site.
  For a from-scratch rewrite of a live URL (not paraphrase), prefer
  full-rewrite-article.
---

# Content voice — overthinking it

Project editorial voice for Pali-Buddhist notes: confident about the texts, provisional about interpretation, practical without wellness jargon. Prose aims for a **clear contemplative register** — adult, empirically minded, returning from abstraction to what can be noticed in experience — without first-person memoir. Hero images follow the same register — symbolic and contemplative, not cinematic illustration of the teaching.

**Prose depth (cadence, diction, perspective, exemplars):** [clear-contemplative-voice.md](./clear-contemplative-voice.md) — read when drafting hooks, auditing rhythm, or when copy drifts toward memoir, wellness, or influencer tone.

Canonical exemplars (read before drafting or auditing):
- [index.njk](../../../index.njk) — framing, humility, path-spirals close
- [concepts/five-hindrances.njk](../../../concepts/five-hindrances.njk) — practical hook, similes, antidotes
- [concepts/nibbana.njk](../../../concepts/nibbana.njk) — negation-then-correction, careful metaphysics

Image exemplars (prefer these over photoreal outliers): `images/angles.jpg`, `images/jhanas.jpg` / thumbs, `images/flame.png`, `images/proliferate.jpg`, `images/thumbs/suffering.jpg`, `images/thumbs/heart.jpg`.

Writing briefs for planned pages: [CONTENT_PLAN.md](../../../CONTENT_PLAN.md).

To create a page that is still marked Planned in the guide, use the companion workflow skill first: [write-planned-article](../write-planned-article/SKILL.md) (discover gap → draft → audit → wire guide.js).

To **fully rewrite** a live page from a site URL (new argument/structure — not a paraphrase), use: [full-rewrite-article](../full-rewrite-article/SKILL.md).

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
Prefer water/dye/mud/wind, raft, flame-fuel, second arrow, and other traditional images. Invented poetic metaphors and everyday micro-scenes are allowed only when they clarify; never decorate. If a canonical simile already carries the point, use it.

### 5. Direct address and shared scenes — not coaching essays
Especially for practice-facing pages: "If you have ever sat down to meditate and found the mind pulled toward…" Inclusive *we* / *most of us* and brief thought experiments ("Imagine…", "Consider…") are welcome.

Do not sustain second-person coaching for the whole article. Return to third-person exposition of the teaching. Prefer universal scenes over autobiographical ones.

### 6. Almost no first person
Default: no *I* / *my* / *me*. Do not use memoir or “in my experience” as authority for the Dhamma. Prefer "the canon", "the tradition", "the Buddha", shared scenes, and provisional hedges.

Rare exception: authorial humility framing only ("I have not got there yet", "I am trying to work something out") — never as proof of a teaching claim. See [clear-contemplative-voice.md](./clear-contemplative-voice.md) for rewrite patterns.

### 7. Clear contemplative cadence
Aim for readable, varied rhythm (~18–22 word average): hard open claim → expand with distinction or example → turn with *But* / *However* / *Of course* / *And yet* → short landing sentence or pressure question. Em dashes for precision. Dry wit over jokiness; quiet earnestness about attention and the present — never inspirational-poster tone. Full texture: [clear-contemplative-voice.md](./clear-contemplative-voice.md).

### 8. Register to avoid
- Therapy-speak and wellness jargon ("hold space", "self-care", "manifest", domesticated "mindfulness" without Pali context)
- Soft influencer cadence ("Here's the thing", "Let's dive in", "I want to share")
- Mystical fog, hype/optimize theater, academic throat-clearing
- Dogmatic absolutes and attainment-flexing
- Sensational mysticism or stage-chasing progress charts
- Sectarian score-settling; this site is Pali-primary and can bridge carefully (see Stage 5 briefs)
- First-person memoir set pieces; cruelty as a substitute for clarity

---

## Structural conventions

### Article shape
1. Hook paragraphs — cold open claim + context/why it matters; optional lived universal scene or practice-facing direct address
2. `<hr>` then thematic `<h2>` sections (name the confusion → mechanism → practice implication)
3. Optional mid/late `<blockquote>` with canonical citation and `<cite>— SN/MN/… (adapted)</cite>`
4. Closing synthesis (not a bullet recap; implication for attention or understanding, not a hype CTA)

Sidebar TOC (`js/toc.js`) indexes **H2 only**. Keep H2s thematic and few enough to navigate; put finer scan anchors in H3s.

### Subheadings (H3) — scan and SEO
Use `<h3>` under a thematic H2 when the section covers named items a reader (or search engine) will look up by name — factors, precepts, foundations, antidotes, etc.

- Prefer keyword-rich labels: `Sammā-diṭṭhi — Right View`, not `Factor one`
- Keep H3s subordinate to the essay argument; do not default to an encyclopedia of H3s as the whole page outline
- Exemplar of balance: [concepts/eightfold-path.njk](../../../concepts/eightfold-path.njk) — thematic H2s + factor H3s; [concepts/five-precepts.njk](../../../concepts/five-precepts.njk) uses bold numbered leads instead when H3s would over-partition

### Lists — sparse by default
Prose is the default. Bullet or numbered lists are allowed but rare.

**Use a list when** it earns a clear scan job: one early overview of a closed set (e.g. the eight path factors), or a short canonical inventory that would otherwise become a comma-clogged sentence.

**Do not** turn every enumeration into bullets (intentions, speech abstentions, efforts, practice cascades, closing synthesis). Prefer in-sentence lists and em-dash chains — see [clear-contemplative-voice.md](./clear-contemplative-voice.md).

```html
<p>The eight factors named in the texts are:</p>
<ul>
  <li><span class="pali" data-pali="sammā-diṭṭhi" data-en="right view">Sammā-diṭṭhi</span> — right view</li>
  <!-- … -->
</ul>
```

Article lists are styled in `css/style.css` under `.page-content article ul/ol` (the global reset zeroes list padding). Prefer semantic `<ul>` / `<ol>` over hand-rolled dashes.

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
Typical concept page: ~900–1800 words. Prefer clarity over coverage. Paragraphs usually 3–6 sentences.

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
| Quiet heap / gathered mass | Soft pile of translucent forms suggesting aggregation without a solid core | `khandhas` |
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

### Hero → thumb (one asset, not two generations)

Generate **one** main page image only (`images/<slug>.jpg`). Derive the list thumb by **copying and scaling down** that same file into `images/thumbs/<slug>.jpg` — same composition and aspect ratio, smaller file weight.

- Do **not** run a second image generation for the thumb (separate prompts drift; e.g. a four-pane “foundations” symbol turning into a different picture).
- CSS already crops with `object-fit: cover` (page figure and entry-list 4∶3), so one master image serves both slots.
- Exemplar pattern: `angles.jpg` / `thumbs/angles.jpg` are the same picture at matching aspect.

Claimed thumbs and asset TODO rules: CONTENT_PLAN.md Assets. **Shipping with `TBD.jpg` is a Must-fix** — assets are required for handoff, not optional notes.

---

## Workflow A — Draft mode

Use when writing a new page (often from CONTENT_PLAN.md).

Copy and track:

```
Draft progress:
- [ ] Brief read (section, slug, outline, related links)
- [ ] Front matter drafted (title/subtitle/meta/excerpt; real `image`/`thumb` filenames — not TBD at handoff)
- [ ] Hook: cold open claim + negation-correction and/or lived universal scene (no memoir)
- [ ] H2 outline matches brief (or intentional deviation noted)
- [ ] H3s only where named items need scan/SEO anchors; lists sparse (not every enumeration)
- [ ] Cadence: varied sentence length; turn words; punch closer only where earned
- [ ] Pali spans on every term; new terms listed for pali.js
- [ ] At least one canonical simile or text citation where it fits
- [ ] Humility markers present; no attainment-flex or stage-chase
- [ ] No first-person teaching claims or “in my experience” authority
- [ ] Hero image created in house style; thumb derived by scale/copy (not a second generation)
- [ ] related: wired; backlinks from plan listed as follow-ups
- [ ] Run Audit mode on the draft before considering done
```

**Draft steps**
1. Open the matching CONTENT_PLAN brief, this skill, and skim [clear-contemplative-voice.md](./clear-contemplative-voice.md) for cadence/perspective.
2. Skim one exemplar (`five-hindrances` for practice-facing; `nibbana` for subtle/conceptual).
3. Write the hook and H2 skeleton before filling sections (claim → confusion → mechanism → implication).
4. Fill sections; prefer short paragraphs (3–6 sentences); insert `<hr>` between major movements.
5. Add blockquote only if a real canonical line carries the point.
6. Create hero asset then scale/copy to thumb (or explicit reuse); set front matter — **required before handoff**.
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
- [ ] Flag wellness/therapy / influencer / mystical-fog register
- [ ] Flag first-person memoir or teaching claims (“in my experience”)
- [ ] Flag soft lead-ins; check cold-open claim + cadence (turns, punch seals)
- [ ] Flag bullet-list sprawl (lists where prose would scan fine); note missing H3s only if named items are hard to find
- [ ] Check Pali span coverage and data-en quality
- [ ] Check structure (hook → hr/H2s → optional H3s → optional cite → close)
- [ ] Check related links / internal anchors still live
- [ ] Check hero image against Hero imagery (symbolic/illustrated vs literal photoreal)
- [ ] Produce line-level suggestions (not vague vibe notes)
```

Also apply the prose audit add-ons in [clear-contemplative-voice.md](./clear-contemplative-voice.md) when rhythm or diction is the issue.

**How to report findings**

For each issue:
1. Quote the offending sentence (or cite `startLine:endLine:path`)
2. Name the pillar violated
3. Offer a concrete rewrite in site voice

For image issues: name the file, say which house-style rule it breaks, and offer a short regeneration brief (subject + mode from the variety table + avoid list).

Severity:
- **Must fix** — wrong teaching claim, missing Pali span on a defined term, dogmatic absolute, wellness jargon, first-person Dhamma authority / memoir-as-proof, shipping with `TBD` image/thumb, guide still `planned: true` when page is meant live
- **Should fix** — weak humility on contested interpretation, invented metaphor crowding a canonical one, structural drift, soft/influencer lead-in, flat cadence with no turns or seals, liberal bullet lists where prose would do, hero image outside house style (literal photoreal / staged parable)
- **Optional** — punch-closer opportunity, slight rhythm polish, dry-wit trim, H3 scan anchors for named items buried in long H2s

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

**Memoir → shared scene / canon**
- Before: "In my experience, sitting with anxiety only works when I fully accept it."
- After: "Accepting unpleasant sensations as a strategy — while covertly hoping they will vanish — is not the same as knowing them as transitory appearances in consciousness. Only the second gesture opens lasting change."

**Soft lead-in → cold open**
- Before: "Today I want to explore what the hindrances really mean for your practice."
- After: "The hindrances are not signs that meditation is failing. They are ordinary features of a mind that has not yet been trained — and they can be known."

**Literal photoreal hero → house style**
- Before: Cinematic photo of two arrows striking a wooden stump in mist (stages the second-arrow simile as a film still).
- After: Painterly dark field; one slender luminous shaft already present, a second fainter shaft or echo beside it — soft grain, no motion blur, no landscape documentary realism. Or a quieter symbol: a single ripple doubling on still water.
