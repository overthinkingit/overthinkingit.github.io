# Content plan — planned guide pages

Writing briefs for the 16 items marked `planned: true` in [`_data/guide.js`](_data/guide.js). Each brief is meant to be enough to draft a page without reopening the guide data.

**Companions:**
- [`.cursor/skills/write-planned-article/SKILL.md`](.cursor/skills/write-planned-article/SKILL.md) — discover planned gaps and draft a missing page end-to-end
- [`.cursor/skills/content-voice/SKILL.md`](.cursor/skills/content-voice/SKILL.md) — voice, tone, and audit while drafting

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
order: N                # append after current concepts order 1–9
next:
  title: "…"
  url: /…
related:
  - title: "…"
    url: /…
```

Defaults come from [`concepts/concepts.11tydata.json`](concepts/concepts.11tydata.json) (`layout`, `section`, `navSection`). All planned guide pages — including the Stage 1 how-tos — go under `/concepts/`.

### Ordering
Append new concept pages at `order: 10+` in guide-stage sequence. Discovery is primarily via `/guide/`, not the flat `/concepts/` listing. Thematic renumbering later is optional.

### Assets (applies to every planned page)
Every existing thumb under `images/thumbs/` is already claimed by a live page. **Each new page needs a new hero image + matching thumb** (or a deliberate reuse decision) **before handoff** — do not ship with `image: TBD.jpg` / `thumb: TBD.jpg`.

Claimed thumbs today: `angles`, `breath`, `flame`, `foundation`, `heart`, `how-to-read-a-sutta`, `how-to-sit`, `impermanence`, `jhanas`, `khandhas`, `middle-way`, `noble-eightfold-path`, `proliferate`, `second-arrow`, `shore`, `solace`, `suffering`, `three-trainings`, `view`, `when-a-hindrance-dissolves`.

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
6. Run `npm run build` and confirm `/guide/` shows the item as a live link (no Planned badge). Source edits to `_data/guide.js` do not appear in `_site` until build. If a long-lived `eleventy --serve` still shows Planned after `guide.js` is correct, restart the serve process (`.eleventy.js` clears `_data` require cache on each build to reduce this).
7. Confirm the new page URL appears in `/sitemap.xml` (built from `collections.all` via [`sitemap.njk`](sitemap.njk) — no hand-edit unless the page sets `noindex` or is excluded from collections).

### Suggested writing order
Default: guide stages 1 → 5 (the intended reading arc).

**Early momentum wins** (tight scope, strong links to existing pages; skip if already live):
1. When a hindrance dissolves
2. How to read a sutta
3. The three trainings — sīla, samādhi, paññā

Already shipped from this list: second arrow; how to sit; when a hindrance dissolves.
---

## Section placement — decided

**All 16 planned pages live under `/concepts/`.** No `/practice/` section.

Stage 1 how-tos ("How to sit", "How to read a sutta") are procedural, but filing them as concepts keeps nav, collections, and listing simple. Stage 3 how-tos and all Stage 2/4/5 items were already aimed at `/concepts/`.

---

## Stage 1 — Orientation

### 1. How to sit — a starting sitting practice

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/how-to-sit/` |
| **Order** | 10 |
| **Est. words** | 900–1200 |

**Draft front matter**
```yaml
title: How to Sit — A Starting Sitting Practice
subtitle: Posture, duration, what to do with the mind, and what "success" actually means at the beginning.
description: A practical starting guide to sitting meditation — posture, duration, attention, and how to judge a sit without turning it into performance.
meta: Starting practice
excerpt: Posture, duration, what to do with the mind, and what "success" actually means at the beginning.
```

**Outline**
1. **Why start with sitting** — not as the whole path; as a laboratory for seeing the mind.
2. **Posture and body** — upright, sustainable, eyes/hands; comfort vs. collapse; chairs are fine.
3. **Duration and rhythm** — short and regular over heroic; what to do when the timer feels hostile.
4. **What to do with the mind** — breath or body as home base; returning without self-reproach; naming vs. fighting.
5. **What “success” is not** — not blank mind, not bliss, not progress charts; closing: conditions for the next sit.

**Related**
- Āṇāpānasati Sutta → `/suttas/anapanasati/`
- Nīvaraṇas — The Five Hindrances → `/concepts/five-hindrances/`
- Satipaṭṭhāna Sutta → `/suttas/satipatthana/`

**Backlinks once live:** guide Stage 1; optionally home “How to use these pages”; anapanasati related list.

---

### 2. How to read a sutta

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/how-to-read-a-sutta/` |
| **Order** | 11 |
| **Est. words** | 1000–1300 |

**Draft front matter**
```yaml
title: How to Read a Sutta
subtitle: Formulaic repetition, canonical structure, and what to skim without missing the point.
description: A practical guide to reading Pali suttas — stock phrases, nested lists, repetition, and how to find the teaching inside the form.
meta: Reading practice
excerpt: Formulaic repetition, canonical structure, and what to skim without missing the point.
```

**Outline**
1. **What a sutta is (and isn’t)** — oral literature preserved in writing; not a modern essay.
2. **Stock openings and frames** — “Thus have I heard,” setting, audience; what to notice once then move past.
3. **Repetition as pedagogy** — why phrases repeat; how to read for variation inside sameness.
4. **Lists and nested structures** — foundations, factors, links; mapping without drowning.
5. **A workable reading method** — one pass for shape, one for the hinge teaching; when to use modern commentaries lightly.

**Related**
- Kālāma Sutta → `/suttas/kalama/`
- Dhammacakkappavattana Sutta → `/suttas/dhammacakkappavattana/`
- Satipaṭṭhāna Sutta → `/suttas/satipatthana/`
- Pali glossary → `/glossary/`

**Backlinks once live:** guide Stage 1; suttas index intro if one exists; kalama related list.

---

## Stage 2 — Foundations

### 3. The three trainings — sīla, samādhi, paññā

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/three-trainings/` |
| **Order** | 12 |
| **Est. words** | 1200–1500 |

**Draft front matter**
```yaml
title: The Three Trainings — Sīla, Samādhi, Paññā
subtitle: How ethics, unification, and wisdom deepen one another as an integrated whole.
description: The three trainings of the path — sīla, samādhi, and paññā — and how they spiral rather than proceed in a strict sequence.
meta: The three trainings
excerpt: How ethics, unification, and wisdom deepen one another as an integrated whole.
```

**Outline**
1. **One path, three lenses** — how the eightfold path is grouped; sammā as “complete,” not merely “correct.”
2. **Sīla** — speech, action, livelihood as conditions for a mind that can settle.
3. **Samādhi** — effort, mindfulness, unification; stillness as clarity’s precondition, not the goal.
4. **Paññā** — view and intention; wisdom initiating and completing the path.
5. **How they deepen one another** — spiral, not ladder; what goes wrong when one is forced alone.

**Related**
- The Noble Eightfold Path → `/concepts/eightfold-path/`
- Dhammacakkappavattana Sutta → `/suttas/dhammacakkappavattana/`
- Sammādiṭṭhi Sutta → `/suttas/sammaditthi/`

**Backlinks once live:** eightfold-path (forward related); guide Stage 2.

---

### 4. The five precepts as a starting ethical practice

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/five-precepts/` |
| **Order** | 13 |
| **Est. words** | 1100–1400 |

**Draft front matter**
```yaml
title: The Five Precepts — A Starting Ethical Practice
subtitle: Concrete commitments that create the conditions for stillness and clear seeing.
description: The five precepts as a workable starting ethic — not purity theater, but conditions that support meditation and clear seeing.
meta: Ethical practice
excerpt: Concrete commitments that create the conditions for stillness and clear seeing.
```

**Outline**
1. **Why ethics before (and during) stillness** — not moralism; reducing the fuel of remorse and agitation.
2. **The five, one by one** — killing, taking, sexual misconduct, false speech, intoxicants — each as a lived edge, not a slogan.
3. **Training rules vs. commandments** — aspiration, repair, and honesty when you break one.
4. **Precepts and the hindrances** — how broken sīla feeds restlessness, worry, and dullness.
5. **Starting without perfectionism** — pick the sharpest edge; close with conditions, not purity.

**Related**
- The three trainings (this plan) → `/concepts/three-trainings/`
- The Noble Eightfold Path → `/concepts/eightfold-path/`
- Nīvaraṇas — The Five Hindrances → `/concepts/five-hindrances/`

**Backlinks once live:** eightfold-path; guide Stage 2; three-trainings once both exist.

---

## Stage 3 — Deepening

### 5. Practicing off the cushion — sīla in daily life

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` (companion piece; not a new section) |
| **Slug** | `/concepts/practicing-off-the-cushion/` |
| **Order** | 14 |
| **Est. words** | 1000–1300 |

**Draft front matter**
```yaml
title: Practicing Off the Cushion — Sīla in Daily Life
subtitle: How ethical training shows up between sits, not only on them.
description: Taking sīla off the cushion — speech, reaction, and attention in ordinary life as continuation of the path.
meta: Daily practice
excerpt: How ethical training shows up between sits, not only on them.
```

**Outline**
1. **The false split** — cushion vs. life; practice as continuous or it thins.
2. **Speech and silence** — right speech as real-time training; pause before the second arrow of words.
3. **Reaction and intention** — noticing the push/pull of the day without turning mindfulness into self-surveillance.
4. **Work, screens, and intoxication-adjacent habits** — practical edges without lifestyle theater.
5. **Returning to the sit** — how daily sīla changes what shows up on the cushion.

**Related**
- The five precepts (this plan) → `/concepts/five-precepts/`
- Brahmavihārās → `/concepts/brahmaviharas/`
- The second arrow (this plan) → `/concepts/second-arrow/`
- Nīvaraṇas → `/concepts/five-hindrances/`

**Backlinks once live:** five-precepts; brahmaviharas; guide Stage 3.

---

### 6. The second arrow — pain vs. suffering

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/second-arrow/` |
| **Order** | 15 |
| **Est. words** | 900–1200 · **priority early win** |

**Draft front matter**
```yaml
title: The Second Arrow — Pain vs. Suffering
subtitle: The difference between what happens and what the mind adds on top of it.
description: The second arrow — distinguishing unavoidable pain from the suffering the mind adds through resistance, story, and clinging.
meta: Pain and suffering
excerpt: The difference between what happens and what the mind adds on top of it.
```

**Outline**
1. **The simile** — first arrow / second arrow (SN 36.6 territory); what is given vs. what is added.
2. **Pain, vedanā, and story** — bare feeling-tone vs. the narrative that proliferates.
3. **Where the second arrow shows up** — body pain in sitting; social sting; illness; ordinary irritation.
4. **What this is not** — not denying harm, not spiritual bypass, not blaming the person who hurts.
5. **Practice implication** — feel the first; notice the reaching for the second; link to papañca and hindrances.

**Related**
- Papañca — The Mind That Proliferates → `/concepts/papanca/`
- Satipaṭṭhāna Sutta → `/suttas/satipatthana/`
- Ti-lakkhaṇa → `/concepts/ti-lakkhana/`
- Nīvaraṇas → `/concepts/five-hindrances/`

**Backlinks once live:** papanca; five-hindrances; guide Stage 3.

---

### 7. When a hindrance dissolves

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/when-a-hindrance-dissolves/` |
| **Order** | 16 |
| **Est. words** | 900–1200 · **priority early win** |

**Draft front matter**
```yaml
title: When a Hindrance Dissolves
subtitle: What shifts when desire, ill-will, dullness, restlessness, or doubt loosens — and what not to do next.
description: What happens when a hindrance loosens in practice — the relief, the mistakes that follow, and how to meet the gap without grabbing for the next hit of calm.
meta: Working with hindrances
excerpt: What shifts when desire, ill-will, dullness, restlessness, or doubt loosens — and what not to do next.
```

**Outline**
1. **After the naming** — companion to the five hindrances page; knowing present/absent is not the end.
2. **What dissolution feels like** — relief, brightness, sudden quiet; not the same as jhāna, not permanent.
3. **What not to do next** — clutch the calm; congratulate the self; immediately hunt the next obstacle; interpret as attainment.
4. **Conditions for non-re-arising** — Satipaṭṭhāna’s fifth knowledge applied lightly and practically.
5. **Returning to the object** — continue the sit; let the gap be ordinary.

**Related**
- Nīvaraṇas — The Five Hindrances → `/concepts/five-hindrances/`
- Satipaṭṭhāna Sutta → `/suttas/satipatthana/`
- Jhānas — The Stillness of the Path → `/concepts/jhanas/`

**Backlinks once live:** **five-hindrances.njk should add this to `related:`** (explicit plan note); satipatthana; guide Stage 3.

---

## Stage 4 — After some practice

### 8. Anattā in practice — what it actually asks of you

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/anatta-in-practice/` |
| **Order** | 17 |
| **Est. words** | 1200–1600 |

**Draft front matter**
```yaml
title: Anattā in Practice — What It Actually Asks of You
subtitle: Beyond the concept — what non-self changes in how you relate to thought, self-image, and reaction.
description: Anattā as lived training — how non-self shows up in relation to thoughts, self-image, and reactive patterns, beyond the conceptual claim.
meta: Non-self in practice
excerpt: Beyond the concept: what non-self changes in how you relate to thought, self-image, and reaction.
```

**Outline**
1. **Past the slogan** — anattā is not “I don’t exist”; it is not owning experience as a fixed owner.
2. **Thoughts without a thinker-to-defend** — noticing identification loosen without metaphysical drama.
3. **Self-image and the aggregates** — how khandha analysis becomes usable mid-reaction.
4. **Ethics without a solid self** — responsibility stays; the brittle defender softens.
5. **Mistakes to avoid** — nihilism, spiritualized dissociation, using anattā to dismiss harm.

**Related**
- Ti-lakkhaṇa → `/concepts/ti-lakkhana/`
- Anattalakkhaṇa Sutta → `/suttas/anattalakkhana/`
- Khandhas → `/concepts/khandhas/`
- Alagaddūpama Sutta → `/suttas/alagaddupama/`

**Backlinks once live:** ti-lakkhana; anattalakkhana; khandhas; guide Stage 4.

---

### 9. Insight cycles — the shape of the arc after the first shift

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/insight-cycles/` |
| **Order** | 18 |
| **Est. words** | 1300–1700 |

**Draft front matter**
```yaml
title: Insight Cycles — The Shape of the Arc After the First Shift
subtitle: What often follows a genuine glimpse — oscillation, re-consolidation, and continuing practice.
description: The shape of practice after a genuine insight shift — oscillation, consolidation, and why the path still spirals rather than finishes.
meta: Stages of practice
excerpt: What often follows a genuine glimpse: oscillation, re-consolidation, and continuing practice.
```

**Outline**
1. **After a glimpse** — something rearranges; then ordinary mind returns; this is expected.
2. **Oscillation** — clarity and confusion alternating; not proof the insight was fake.
3. **Re-consolidation** — how views and habits re-form around a new seeing; papañca’s return.
4. **Maps without maps** — lightly acknowledge insight-stage language; refuse rigid stage-chasing.
5. **What continues** — sīla, sitting, honesty; the path spirals.

**Related**
- Ti-lakkhaṇa → `/concepts/ti-lakkhana/`
- Papañca → `/concepts/papanca/`
- Anattā in practice (this plan) → `/concepts/anatta-in-practice/`
- Nibbāna → `/concepts/nibbana/`

**Backlinks once live:** ti-lakkhana; papanca; guide Stage 4. Keep humility high — this page can easily sound like a progress chart.

---

## Stage 5 — Counter-intuitive

### 10. Dual and non-dual — a map that only makes sense later

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/dual-and-non-dual/` |
| **Order** | 19 |
| **Est. words** | 1400–1800 |

**Draft front matter**
```yaml
title: Dual and Non-Dual — A Map That Only Makes Sense Later
subtitle: Why the distinction is counter-intuitive at first, and when it becomes useful rather than confusing.
description: Dual and non-dual language in Buddhist thought — when the distinction clarifies practice and when premature engagement confuses it.
meta: Duality and non-duality
excerpt: Why the distinction is counter-intuitive at first, and when it becomes useful rather than confusing.
```

**Outline**
1. **Why wait** — guide Stage 5 rationale; premature non-dual talk often becomes a new view to cling to.
2. **Duality as ordinary training language** — path/goal, wholesome/unwholesome, practitioner/practice.
3. **What “non-dual” is trying to point at** — without collapsing ethics or denying conventional causality.
4. **Where Pali and later frames meet** — careful, non-sectarian; link forward to emptiness / two truths.
5. **How to hold the map** — useful after lived anattā; dangerous as a concept costume.

**Related**
- Anattā in practice → `/concepts/anatta-in-practice/`
- Alagaddūpama Sutta → `/suttas/alagaddupama/`
- Nibbāna → `/concepts/nibbana/`
- Emptiness (this plan) → `/concepts/emptiness/`

**Backlinks once live:** alagaddupama; nibbana; guide Stage 5.

---

### 11. Emptiness (śūnyatā) — how Nāgārjuna extends anattā

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/emptiness/` |
| **Order** | 20 |
| **Est. words** | 1500–1800 |

**Draft front matter**
```yaml
title: Emptiness (Śūnyatā) — How Nāgārjuna Extends Anattā
subtitle: From non-self of persons to emptiness of phenomena — and where the Pali and Mahāyāna frames meet.
description: Śūnyatā as an extension of anattā — from persons to phenomena — and how to meet Nāgārjuna without abandoning the Pali frame of this site.
meta: Emptiness
excerpt: From non-self of persons to emptiness of phenomena — and where the Pali and Mahāyāna frames meet.
```

**Outline**
1. **Site frame first** — primary lens remains Pali; this page is a bridge, not a conversion.
2. **Anattā of persons → emptiness of dhammas** — what “extends” actually means.
3. **Nāgārjuna’s move** — dependent designation; emptiness of intrinsic nature; not nihilism.
4. **Meeting points and frictions** — with paṭicca-samuppāda, nibbāna language, and practice.
5. **How a sceptical practitioner holds it** — useful as medicine for reification; poisonous as a view to brandish.

**Related**
- Anattalakkhaṇa Sutta → `/suttas/anattalakkhana/`
- Paṭicca-samuppāda → `/concepts/paticca-samuppada/`
- The two truths (this plan) → `/concepts/two-truths/`
- Alagaddūpama Sutta → `/suttas/alagaddupama/`

**Backlinks once live:** paticca-samuppada; anattalakkhana; guide Stage 5.

---

### 12. The two truths — conventional and ultimate

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/two-truths/` |
| **Order** | 21 |
| **Est. words** | 1200–1600 |

**Draft front matter**
```yaml
title: The Two Truths — Conventional and Ultimate
subtitle: How both registers can be true without collapsing into relativism or denial.
description: Conventional and ultimate truth — how both registers can be held without relativism, denial, or using “ultimate” to dismiss ordinary responsibility.
meta: Two truths
excerpt: How both registers can be true without collapsing into relativism or denial.
```

**Outline**
1. **Why the distinction arises** — language that works for shopping lists vs. language for liberation.
2. **Conventional truth** — persons, ethics, causality, speech that functions.
3. **Ultimate truth** — empty of intrinsic essence / not-self analysis — depending on frame; stay precise.
4. **Failure modes** — relativism (“nothing matters”); denial (“pain isn’t real”); weaponized ultimate against ethics.
5. **Practice use** — switch registers deliberately; raft, not throne.

**Related**
- Emptiness (this plan) → `/concepts/emptiness/`
- Dual and non-dual (this plan) → `/concepts/dual-and-non-dual/`
- Alagaddūpama Sutta → `/suttas/alagaddupama/`
- Sammādiṭṭhi Sutta → `/suttas/sammaditthi/`

**Backlinks once live:** emptiness; alagaddupama; guide Stage 5.

---

### 13. Buddha-nature and its risks

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/buddha-nature/` |
| **Order** | 22 |
| **Est. words** | 1300–1700 |

**Draft front matter**
```yaml
title: Buddha-Nature and Its Risks
subtitle: A powerful idea that can liberate or reify a subtle self — how to hold it carefully.
description: Buddha-nature as a liberating pointer and as a risk — how the idea can free practice or quietly reinstate a subtle self.
meta: Buddha-nature
excerpt: A powerful idea that can liberate or reify a subtle self — how to hold it carefully.
```

**Outline**
1. **Why it appears late** — Stage 5; easy to mishear as a soul doctrine.
2. **What the idea is trying to do** — confidence, intrinsic capacity, critique of deficiency narratives.
3. **The reification risk** — a subtle, luminous self that “was always already awake.”
4. **Holding it with anattā** — medicine relative to the disease; compare with raft simile.
5. **Practical test** — does this language loosen clinging, or dress clinging in sacred clothes?

**Related**
- Nibbāna → `/concepts/nibbana/`
- Anattā in practice → `/concepts/anatta-in-practice/`
- Alagaddūpama Sutta → `/suttas/alagaddupama/`
- Emptiness → `/concepts/emptiness/`

**Backlinks once live:** nibbana; alagaddupama; guide Stage 5.

---

### 14. Cessation experiences — what they are and aren’t

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/cessation-experiences/` |
| **Order** | 23 |
| **Est. words** | 1200–1600 |

**Draft front matter**
```yaml
title: Cessation Experiences — What They Are and Aren’t
subtitle: Temporary interruptions of ordinary consciousness, and the mistakes that follow from over-interpreting them.
description: Cessation and gap experiences in practice — what they may be, what they are not, and how over-interpretation creates new clinging.
meta: Cessation
excerpt: Temporary interruptions of ordinary consciousness, and the mistakes that follow from over-interpreting them.
```

**Outline**
1. **Phenomenology without hype** — gaps, blankness, sudden stops; describe carefully.
2. **Not nibbāna by default** — conditioned events vs. the unconditioned; link to nibbāna page’s warnings.
3. **Not a trophy** — insight cycles, grasping for repeats, identity as “someone who had X.”
4. **Useful responses** — return to body, ethics, ordinary sati; don’t build a cosmology from one event.
5. **When to seek guidance** — destabilization, fear, obsession; humility about maps.

**Related**
- Nibbāna → `/concepts/nibbana/`
- Jhānas → `/concepts/jhanas/`
- Insight cycles → `/concepts/insight-cycles/`
- Alagaddūpama Sutta → `/suttas/alagaddupama/`

**Backlinks once live:** nibbana; jhanas; guide Stage 5.

---

### 15. Rebirth — how serious practitioners hold it

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/rebirth/` |
| **Order** | 24 |
| **Est. words** | 1400–1800 |

**Draft front matter**
```yaml
title: Rebirth — How Serious Practitioners Hold It
subtitle: Belief, agnosticism, and functional approaches — without requiring premature metaphysical commitment.
description: Rebirth in the Buddhist tradition — belief, agnosticism, and functional approaches that do not demand premature metaphysical commitment.
meta: Rebirth
excerpt: Belief, agnosticism, and functional approaches — without requiring premature metaphysical commitment.
```

**Outline**
1. **Why this is Stage 5** — easy to derail beginners into metaphysics; practice does not wait on cosmology.
2. **What the canon assumes** — rebirth language is pervasive; honesty about that, not soft erasure.
3. **Ways practitioners hold it** — conviction; provisional acceptance; agnostic respect; symbolic/functional reading — name tradeoffs.
4. **What practice still requires** — kamma as intentional action’s consequences in this life remains workable either way.
5. **Avoiding two traps** — mandatory belief as entry ticket; casual dismissal that guts the tradition’s stakes.

**Related**
- Paṭicca-samuppāda → `/concepts/paticca-samuppada/`
- Kālāma Sutta → `/suttas/kalama/`
- Nibbāna → `/concepts/nibbana/`
- Sammādiṭṭhi Sutta → `/suttas/sammaditthi/`

**Backlinks once live:** paticca-samuppada; kalama; guide Stage 5.

---

### 16. Devotion, ritual, and the sceptical practitioner

| Field | Value |
|-------|-------|
| **Section** | `/concepts/` |
| **Slug** | `/concepts/devotion-and-ritual/` |
| **Order** | 25 |
| **Est. words** | 1200–1600 |

**Draft front matter**
```yaml
title: Devotion, Ritual, and the Sceptical Practitioner
subtitle: What ritual and devotion can do that analysis cannot — and how to meet them without abandoning discernment.
description: Devotion and ritual for the sceptical practitioner — what they can open that analysis cannot, without abandoning discernment or adopting unexamined belief.
meta: Devotion and ritual
excerpt: What ritual and devotion can do that analysis cannot — and how to meet them without abandoning discernment.
```

**Outline**
1. **The sceptical bind** — analysis alone can dry out; devotion alone can bypass seeing.
2. **What ritual does** — embody intention, mark commitment, soften the tight self of the critic.
3. **Devotion without a personality cult** — respect, gratitude, taking refuge as orientation.
4. **Discernment stays** — Kālāma criteria; raft simile; no outsourcing of conscience.
5. **Experiments** — bowing, chanting, offerings as tryable forms; evaluate by effect on greed/hatred/delusion.

**Related**
- Kālāma Sutta → `/suttas/kalama/`
- Alagaddūpama Sutta → `/suttas/alagaddupama/`
- Brahmavihārās → `/concepts/brahmaviharas/`
- Buddha-nature → `/concepts/buddha-nature/`

**Backlinks once live:** kalama; brahmaviharas; guide Stage 5.

---

## Checklist when a planned page ships

- [ ] `.njk` page written (voice skill draft mode)
- [ ] New `image` + `thumb` files on disk; front matter points at them (not `TBD.jpg`) — or explicit reuse decision
- [ ] Claimed thumbs list in this file updated
- [ ] `_data/guide.js` — add `url`, remove `planned: true`
- [ ] `npm run build` — confirm `/guide/` shows a live link, not Planned (restart `eleventy --serve` if the badge is still stale)
- [ ] `/sitemap.xml` includes the new page URL (auto from `sitemap.njk` / `collections.all`)
- [ ] `related:` / backlinks from this plan
- [ ] New Pali terms in `js/pali.js` if needed
- [ ] Voice skill audit mode on the draft
