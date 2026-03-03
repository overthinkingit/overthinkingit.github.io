/**
 * Pali Annotation System
 *
 * Markup: <span class="pali" data-pali="dukkha" data-en="suffering">dukkha</span>
 *
 * Add entries to PALI_DICT below. The key is the data-pali attribute value.
 * Each entry has:
 *   en:          closest English rendering (shown as small-caps label)
 *   explanation: your longer explanation paragraph
 *
 * On desktop (>960px): a card appears in the right margin, vertically aligned
 * to the clicked word. On mobile: an inline block expands below the word's
 * paragraph.
 */

const PALI_DICT = {
  dukkha: {
    en: "suffering / unsatisfactoriness",
    explanation:
      "Often rendered as 'suffering,' dukkha points to something more pervasive than obvious pain. The Buddha distinguished three dimensions: the plain suffering of pain and grief (dukkha-dukkha), the suffering of change — how even pleasant things end (vipariṇāma-dukkha), and the subtle unsatisfactoriness woven into all conditioned existence (saṅkhāra-dukkha). Understanding dukkha is the first of the Four Noble Truths."
  },

  anicca: {
    en: "impermanence",
    explanation:
      "All conditioned phenomena arise dependent on conditions and pass away when those conditions cease. Anicca is not merely the philosophical observation that things change — it is a direct quality to be seen in experience, moment to moment, in the body, feelings, perceptions, and the movements of mind. The contemplation of anicca loosens the habit of grasping."
  },

  anattā: {
    en: "non-self",
    explanation:
      "Anattā does not mean 'I do not exist' — it means that nowhere in experience can a fixed, independent, controlling self be found. The teaching invites investigation: among the five aggregates (form, feeling, perception, formations, consciousness), which one is 'you'? The inability to find a stable owner of experience is itself the insight."
  },

  nibbāna: {
    en: "liberation / extinguishing",
    explanation:
      "The word is read in two ways. The more common rendering traces it to a root meaning to extinguish or cool — the blowing out of the fires of craving, aversion, and delusion. An alternative reading, well-attested in Pali grammar, takes it as nir + vāna (bond or cord): unbinding. Both illuminate something real: nibbāna is the ending of the fire, and the falling away of what bound the mind to that fire. In this life it is experienced as a profound peace; beyond this life the texts are deliberately reticent, since the question assumes the very self the path has uprooted."
  },

  dhamma: {
    en: "teaching / truth / nature",
    explanation:
      "Dhamma carries several interwoven meanings. As Buddha-dhamma it refers to the teaching itself — the body of doctrine and practice. As natural truth it means the way things actually are, independent of any teacher. In the plural (dhammā) it refers to phenomena, the basic units of experience. Context usually makes the sense clear, but the meanings often layer over one another deliberately."
  },

  sīla: {
    en: "virtue / ethical conduct",
    explanation:
      "The first of the three trainings (sīla, samādhi, paññā). Sīla is the foundation of the path — not a moralistic burden but the recognition that harm causes suffering, and restraint creates the internal quietude in which meditation and wisdom become possible. For laypeople it is typically expressed as the five precepts; for monastics, the Vinaya."
  },

  samādhi: {
    en: "unification / stillness",
    explanation:
      "Samādhi is the quality of mind that is gathered, settled, and unified. It ranges from the everyday steadiness that comes with basic mindfulness practice to the deep absorptions (jhāna), where the mind rests in profound stillness. Samādhi is not the goal in itself but the clear, still lake in which wisdom sees without distortion."
  },

  paññā: {
    en: "wisdom / discernment",
    explanation:
      "Paññā is not intellectual knowledge about the teachings but the direct seeing of experience as it is — impermanent, incapable of providing lasting satisfaction, and empty of a self. This seeing is transformative: it does not merely inform, it uproots. The Pali tradition distinguishes paññā arising from study, from reflection, and from direct meditative experience."
  },

  sati: {
    en: "mindfulness / awareness",
    explanation:
      "Sati is often translated 'mindfulness,' though it carries a sense of clear recollection — knowing what is present, not losing track of it. In the Satipaṭṭhāna Sutta, the Buddha outlines four foundations of sati: the body, feelings (vedanā), mind states, and phenomena. Sati is the quality that allows the other factors of the path to be present and effective."
  },

  tanhā: {
    en: "craving / thirst",
    explanation:
      "Tanhā — literally 'thirst' — is identified in the Second Noble Truth as the origin of suffering. The Buddha described three kinds: craving for sensual pleasure, craving for existence, and craving for non-existence. It is the reactive reaching and pushing of the mind that perpetuates the cycle. Seeing tanhā as it arises, in real time, is central to insight practice."
  },

  saṅkhāra: {
    en: "formations / conditioned things",
    explanation:
      "One of the most layered words in the Pali canon. As one of the five aggregates, saṅkhārā refers to the volitional formations — intentions, habits, and dispositions that shape experience and action. In a broader sense, all conditioned phenomena are saṅkhārā: everything that has arisen due to causes. 'All saṅkhārā are impermanent' is one of the three characteristics applied universally."
  },

  upadāna: {
    en: "clinging / grasping",
    explanation:
      "Where tanhā is the initial reach toward an object, upadāna is the consolidation — the holding on, the making-into-mine. The Buddha described four kinds: clinging to sensual pleasures, to views, to rules and practices, and to the doctrine of self. Upadāna is the link in dependent origination that leads directly to becoming (bhava), and therefore to birth and its attendant suffering."
  },

  vedanā: {
    en: "feeling-tone",
    explanation:
      "Every moment of experience carries a vedanā: pleasant, unpleasant, or neutral. This is not emotion — it is the bare hedonic quality that precedes the elaborate stories the mind builds. Because pleasant feeling tends to trigger craving and unpleasant feeling tends to trigger aversion, vedanā is a critical hinge point. Seeing vedanā without immediately reacting to it is one of the key skills of satipaṭṭhāna practice."
  },

  bojjhaṅgā: {
    en: "factors of awakening",
    explanation:
      "The seven factors that, when fully developed, lead to awakening: sati (mindfulness), dhamma-vicaya (investigation of phenomena), viriya (energy), pīti (rapture), passaddhi (tranquility), samādhi (unification), and upekkhā (equanimity). The tradition teaches that they are cultivated in sequence — investigation arises from clear mindfulness, energy arises from investigation, and so on."
  },

  upekkhā: {
    en: "equanimity",
    explanation:
      "Upekkhā is often called 'equanimity,' but it is not indifference or emotional flatness. It is a balanced, open quality — neither pushed away nor pulled toward — that comes from seeing clearly. As the fourth brahmavihāra, it is the love that has freed itself from the need for particular outcomes. As a factor of awakening, it is the settled quality of a mind that no longer needs to lean."
  },

  /* ---- Khandhas ---- */

  khandha: {
    en: "aggregate / heap",
    explanation:
      "Khandha (Sanskrit: skandha) means a heap or mass. The Buddha used the term to describe the five categories into which all of what we call 'a person' can be sorted: form, feeling-tone, perception, formations, and consciousness. The framework is not a theory about what we are — it is an invitation to look and find that nowhere in these five categories is there anything that qualifies as a permanent, independent self."
  },

  rūpa: {
    en: "form / materiality",
    explanation:
      "The first of the five aggregates. Rūpa covers the physical dimension of experience — the body, its sense organs, and the material world they contact. In the context of the khandhas, it is not an abstract philosophical category but something directly observable: the weight of the body in sitting, the sensation of breathing, the fact that form is impermanent and not under full control. Rūpa also appears in the compound rūpa-jhāna, referring to meditative absorptions still rooted in form."
  },

  saññā: {
    en: "perception / recognition",
    explanation:
      "The third aggregate. Saññā is the mind's capacity to recognise and label — to identify a sound as a bird, a shape as a face, a sensation as pain. It works by matching present experience against stored templates. Because it is constructive, perception can distort as much as it reveals; the same event can be perceived very differently by different minds, or by the same mind at different times. Insight practice involves noticing saññā as a process rather than taking its outputs as given."
  },

  viññāṇa: {
    en: "consciousness / knowing",
    explanation:
      "The fifth aggregate. Viññāṇa is the bare awareness that arises at each sense door — eye-consciousness, ear-consciousness, mind-consciousness, and so on. It is not a unified observer or a soul; it is a dependent event that arises when a sense organ, an object, and attention come together. The Pali texts are careful to insist that viññāṇa is not the self, not a permanent witness, but another conditioned arising."
  },

  /* ---- Paṭicca-samuppāda ---- */

  "paṭicca-samuppāda": {
    en: "dependent origination",
    explanation:
      "The full teaching on how suffering arises and ceases through a chain of mutually conditioning factors. Paṭicca-samuppāda is sometimes called the central teaching of the Buddha — not a creation story or a theory of substance, but a precise description of how the mind that does not see clearly generates its own bondage, and how seeing clearly reverses the process. The chain is not linear causation but mutual conditionality: each link arises in dependence on the others."
  },

  avijjā: {
    en: "ignorance / not-knowing",
    explanation:
      "The first link of dependent origination and, in that sense, the root of the entire chain. Avijjā is not mere lack of information — it is the specific not-knowing of the four noble truths, of the three characteristics, of how experience actually works. It is not a blank; it is an active misapprehension, a constant background assumption that things are more solid, more satisfying, and more mine than they are. The chain of dependent origination runs from avijjā all the way to suffering; when avijjā ceases, the chain ceases with it."
  },

  nidāna: {
    en: "link / condition",
    explanation:
      "The twelve nidānas are the twelve links of dependent origination: ignorance, formations, consciousness, name-and-form, the six sense bases, contact, feeling, craving, clinging, becoming, birth, and aging-and-death. Each link arises in dependence on the preceding one. The chain is a teaching about a process, not a sequence of events in time; it can describe the arising of suffering within a single moment of reactivity as much as across lifetimes."
  },

  bhava: {
    en: "becoming / existence",
    explanation:
      "The tenth link in dependent origination, arising from clinging (upadāna). Bhava is the dynamic of becoming — the process by which the mind, through clinging, continually generates a sense of self and a world for that self to inhabit. The three realms of existence (sensual, form, and formless) are sometimes called the three bhavas. Seeing bhava as a process rather than a given is one of the more disorienting shifts that deep practice can bring."
  },

  jāti: {
    en: "birth",
    explanation:
      "The eleventh link, arising from becoming. In the context of dependent origination, jāti need not be read only as biological birth; it can point to the arising of identity in any moment — the birth of 'I am angry,' 'I am the one who was wronged,' 'I am a meditator.' Each such arising carries its attendant aging and death, its impermanence. The chain from avijjā to jāti can run within a single breath."
  },

  "jarāmaraṇa": {
    en: "aging and death",
    explanation:
      "The twelfth and final link: aging, death, sorrow, lamentation, pain, grief, and despair. Jarāmaraṇa is not merely the biological fact of dying — it stands for the whole texture of loss that comes with everything that has been born. Because jāti arises from the chain, and jarāmaraṇa follows necessarily from jāti, the path to the cessation of suffering runs back through the chain to avijjā: uproot ignorance, and birth — in all its senses — ceases."
  },

  /* ---- Jhānas ---- */

  jhāna: {
    en: "meditative absorption",
    explanation:
      "A state of deep, unified mental concentration characterised by specific qualities that arise in a defined sequence. The word derives from Sanskrit dhyāna, from a root meaning to contemplate or meditate. The four rūpa-jhānas represent an increasing refinement of mental unification; the formless absorptions go further still. In the Pali canon, jhāna is the samādhi component of the path — not a mystical escape but the stillness in which wisdom does its work."
  },

  vitakka: {
    en: "applied thought / placing the mind",
    explanation:
      "The first jhāna factor. Vitakka is the initial placing of attention on the meditation object — the act of directing the mind. It is the quality of mind that takes up the object and holds it. In ordinary cognition it appears as discursive thinking; in the context of jhāna it becomes refined: the mind still moves to the object, but without the scattered commentary of everyday thought. Vitakka falls away in the second jhāna, as the mind settles into a more continuous stillness."
  },

  vicāra: {
    en: "sustained thought / examining",
    explanation:
      "The second jhāna factor, paired with vitakka. Where vitakka places the mind on the object, vicāra examines and sustains — it is the quality of staying with, turning the object over, remaining in contact. In the transition from first to second jhāna, both vitakka and vicāra cease, and the mind rests in a simpler, more unified stillness. Together, vitakka and vicāra represent the last traces of discursive mental activity within absorption."
  },

  pīti: {
    en: "rapture / joy",
    explanation:
      "The third jhāna factor, present in both first and second jhāna. Pīti is an energetic, often physical quality — a sense of uplift, sometimes described in five grades from momentary goosebumps to a pervasive flooding of the body. It is a sign of deepening unification, not a goal to be pursued in itself. In the third jhāna, pīti fades; what remains is the quieter pleasure of sukha. The Pali tradition cautions against mistaking pīti for the destination — it is a waystation."
  },

  sukha: {
    en: "pleasure / ease",
    explanation:
      "Present in the first three jhānas, sukha is the quality of ease, comfort, and well-being that accompanies deepening stillness. Unlike pīti, which is energetic and sometimes physical, sukha is quieter — a settled sense of contentment without agitation. In the fourth jhāna, sukha drops away along with its opposite (dukkha), leaving the pure equanimity and one-pointedness that characterise that state. The Pali texts describe the body as 'pervaded' by sukha in the jhānas."
  },

  ekaggatā: {
    en: "one-pointedness / unification",
    explanation:
      "Present in all four jhānas, ekaggatā is the quality of the mind gathered into a single point — not narrowed uncomfortably, but unified. It is the quality of samādhi from the inside. In the fourth jhāna, when vitakka, vicāra, pīti, and sukha have all fallen away, what remains is the pure presence of ekaggatā together with upekkhā. It is sometimes described as the mind coming to rest in itself."
  },

  /* ---- Brahmavihārās ---- */

  brahmavihāra: {
    en: "divine abiding",
    explanation:
      "The four brahmavihārās — mettā, karuṇā, muditā, and upekkhā — are called divine abidings because, when fully developed, they characterise a mind that is expansive, purified, and uncontracted. Each is a quality of the heart directed outward without limit. They are not merely objects of meditation; they are, the tradition says, the natural qualities of a fully awakened mind — and so their cultivation is both a path and an end."
  },

  mettā: {
    en: "loving-kindness / goodwill",
    explanation:
      "The first brahmavihāra. Mettā is often translated 'loving-kindness,' but the Pali word is closer to goodwill or benevolence — the sincere wish that beings be well and happy. It is not sentimental warmth or conditional affection; it is the orientation of the heart that genuinely wishes welfare, including for those we find difficult. The near enemy of mettā is attachment (which mimics love but grasps); the far enemy is ill-will."
  },

  karuṇā: {
    en: "compassion",
    explanation:
      "The second brahmavihāra. Karuṇā is the response to suffering — the wish that beings be free from pain. It is distinguished from mettā in that it is specifically aroused by dukkha. The Pali texts describe compassion as 'the heart that trembles' in response to another's distress. Its near enemy is grief or pity (which can collapse into being overwhelmed); its far enemy is cruelty."
  },

  muditā: {
    en: "appreciative joy / sympathetic joy",
    explanation:
      "The third brahmavihāra, and the one most difficult for many practitioners. Muditā is joy in the joy of others — genuine pleasure at their happiness, success, and good fortune. It directly counters the subtle (and not so subtle) envy and comparative diminishment that can arise when others flourish. Its near enemy is a kind of giddy excitement or exuberance that lacks real care; its far enemy is envy."
  },

  /* ---- Eightfold Path ---- */

  sammā: {
    en: "right / complete / correct",
    explanation:
      "Sammā is the prefix on each factor of the Noble Eightfold Path. It is often translated 'right,' but 'complete' or 'aligned' may capture it better — what is right in the sense of being in accord with how things are, not in the sense of a moral rule. Sammā-diṭṭhi is not just correct opinion but the view that sees clearly. The prefix points toward an integrated, whole quality — each factor, when sammā, is in harmony with the path as a whole."
  },

  "sammā-diṭṭhi": {
    en: "right view",
    explanation:
      "The first factor of the path. Right view is the understanding that orients everything else — most basically, understanding the four noble truths: that suffering exists, that it arises from craving, that its cessation is possible, and that there is a path to that cessation. It also includes understanding the three characteristics, kamma and its fruits, and the nature of the aggregates. Right view is both the beginning of the path and, in its fullest expression, its fruit."
  },

  "sammā-saṅkappa": {
    en: "right intention",
    explanation:
      "The second factor. Sammā-saṅkappa is often translated 'right thought' or 'right resolve.' The three right intentions are: the intention of renunciation (letting go of sensual craving), the intention of non-ill-will (goodwill toward all beings), and the intention of non-cruelty (compassion). These are not moral rules imposed from outside but natural orientations of a mind that sees clearly. They belong to the wisdom group of the path alongside right view."
  },

  "sammā-vācā": {
    en: "right speech",
    explanation:
      "The third factor, and the first of the three ethical (sīla) factors. Right speech means abstaining from lying, from divisive speech, from harsh speech, and from idle chatter. Each of these is not merely a rule but a description of how a mind without wisdom and compassion tends to speak. Conversely, right speech describes speaking that is true, unifying, gentle, and meaningful — speech that actually serves."
  },

  "sammā-kammanta": {
    en: "right action",
    explanation:
      "The fourth factor. Right action means abstaining from taking life, from taking what is not given, and from sexual misconduct. These three are the core of ethical conduct as it applies to the body. They are also, in their positive formulations, a description of care: protecting life, respecting others' property and agency, honoring relationships. Right action is not just restraint but the expression of a mind oriented toward non-harm."
  },

  "sammā-ājīva": {
    en: "right livelihood",
    explanation:
      "The fifth factor. Right livelihood means earning a living in ways that do not cause harm — avoiding trades in weapons, living beings (slavery, trafficking), meat, intoxicants, and poisons. At a broader level, it asks how we participate in the economic structures of the world, and whether the way we sustain ourselves supports or undermines the rest of the path. Right livelihood extends the ethical commitment of right speech and right action into the domain of work."
  },

  "sammā-vāyāma": {
    en: "right effort",
    explanation:
      "The sixth factor. The Buddha described right effort in terms of four endeavours: preventing unwholesome states that have not yet arisen; abandoning unwholesome states that have arisen; cultivating wholesome states not yet present; and maintaining wholesome states already present. This is not effortful striving in the sense of grinding willpower, but the consistent, energetic care of a mind that knows what supports clarity and what undermines it."
  },

  "sammā-sati": {
    en: "right mindfulness",
    explanation:
      "The seventh factor. Right mindfulness is sati in its fullest expression — clear, present-moment awareness directed through the four foundations: body, feeling-tone (vedanā), mind states, and phenomena. 'Right' here distinguishes it from bare attention to any object; it is mindfulness that is correctly directed and correctly understood, in service of insight rather than mere noticing. The Satipaṭṭhāna Sutta describes it as 'the direct path' to liberation."
  },

  "sammā-samādhi": {
    en: "right unification",
    explanation:
      "The eighth and final factor. Sammā-samādhi is explicitly defined in the Pali canon as the four jhānas. This is significant: the path does not merely require some degree of calm, but a specific quality of unified, concentrated mind that has been developed through the graduated training. Right samādhi is 'right' in the same sense as the other factors — not any concentration, but concentration that is in harmony with the path and in service of liberation."
  },

  /* ---- Suttas ---- */

  sutta: {
    en: "discourse / thread",
    explanation:
      "A sutta (Sanskrit: sūtra, literally 'thread') is a recorded teaching of the Buddha, typically structured around a specific occasion, audience, and question. The Pali canon contains thousands of suttas, organized into collections (nikāyas). They are not treatises or philosophical arguments so much as records of teaching encounters — and reading them well means attending to who is being addressed, what problem they brought, and what the teaching was meant to do."
  },

  nikāya: {
    en: "collection / body of texts",
    explanation:
      "The five major collections of suttas in the Pali canon: the Dīgha Nikāya (long discourses), Majjhima Nikāya (middle-length discourses), Saṃyutta Nikāya (connected discourses), Aṅguttara Nikāya (numerical discourses), and Khuddaka Nikāya (minor works). When referencing a sutta, the nikāya abbreviation and number (e.g. MN 10, SN 56.11) locates it within this system."
  },

  bhikkhu: {
    en: "monk / mendicant",
    explanation:
      "A bhikkhu is a fully ordained male member of the Buddhist monastic community (saṅgha), who has undertaken the full training of the Vinaya. The word is related to a root meaning 'one who lives on alms' — a mendicant. In the suttas, the Buddha addresses bhikkhus most frequently, though the teachings are regularly described as applicable to laypeople as well. The feminine form is bhikkhunī."
  },

  arahant: {
    en: "fully awakened one",
    explanation:
      "An arahant (Sanskrit: arhat) is someone who has completed the path — who has fully uprooted the āsavās (mental ferments or taints) and in whom the conditions for further becoming have ceased. The term means something like 'worthy one' or 'one who has destroyed the enemies' (the defilements). In the Pali canon, the Buddha himself is described as an arahant, and the liberation he achieved is the same in kind as that of all arahants, though he is unique in having discovered the path independently."
  },

  "satipaṭṭhāna": {
    en: "foundations of mindfulness",
    explanation:
      "The four satipaṭṭhānas are the four domains through which sati is applied: the body (kāya), feeling-tone (vedanā), mind states (citta), and phenomena (dhammā). The Satipaṭṭhāna Sutta (MN 10) opens with the claim that this is 'the direct path' to liberation — ekāyano maggo. Each foundation is explored through a series of contemplations, all sharing the same refrain: 'ardent, clearly knowing, mindful, having removed covetousness and grief with reference to the world.'"
  },

  nīvaraṇa: {
    en: "hindrance",
    explanation:
      "The five hindrances are mental qualities that obstruct both meditation and wisdom: sensual desire (kāmacchanda), ill-will (byāpāda), sloth-and-torpor (thīna-middha), restlessness-and-worry (uddhacca-kukkucca), and doubt (vicikicchā). They are called hindrances because they obstruct the arising of the jhānas and the clarity of insight. The Satipaṭṭhāna Sutta addresses them as one of the five categories in the fourth foundation (dhammā)."
  },

  lakkhaṇa: {
    en: "characteristic / mark",
    explanation:
      "A defining quality or mark of a phenomenon. The three lakkhaṇas — impermanence (anicca), unsatisfactoriness (dukkha), and non-self (anattā) — are the three characteristics shared by all conditioned phenomena. The Anattalakkhaṇa Sutta takes its name from the characteristic (lakkhaṇa) of non-self (anattā) that it establishes through systematic inquiry into the five aggregates."
  },

  kusala: {
    en: "wholesome / skillful",
    explanation:
      "Actions, intentions, and states of mind that are rooted in non-greed, non-hatred, and non-delusion. Kusala means not only morally good but skillful in a practical sense — conducive to well-being, to the reduction of suffering, and to the conditions for liberation. Its opposite is akusala, rooted in greed (lobha), hatred (dosa), and delusion (moha). The distinction between kusala and akusala is central to Buddhist ethics and is not primarily a matter of rule-following but of understanding causes and effects."
  },

  akusala: {
    en: "unwholesome / unskillful",
    explanation:
      "Actions, intentions, and states rooted in greed (lobha), hatred (dosa), or delusion (moha). These are the three roots of unskilful action — not sins in a theological sense but causes that generate suffering for oneself and others. The Kālāma Sutta uses kusala and akusala as the practical criterion for evaluating teachings: does this lead to harm, to suffering, to reproach? Or to benefit and well-being?"
  },

  āsavā: {
    en: "ferments / taints / outflows",
    explanation:
      "Also written āsava (stem form) or āsavas/āsavās (plural). The word derives from a root meaning to flow or to seep — often rendered 'ferments,' 'taints,' or 'outflows,' evoking a liquid that has been working its way through the mind for a very long time. The texts typically list three or four: the ferment of sensuality (kāmāsava), the ferment of becoming (bhavāsava), the ferment of views (diṭṭhāsava), and the ferment of ignorance (avijjāsava). Unlike tanhā, which is the immediate surge of craving at the moment of contact, the āsavās are deeper — the background contamination that keeps the whole system running. The destruction of the āsavās (āsavakkhaya) is the Pali definition of arahantship: a mind fully liberated is one from which nothing seeps."
  },

  /* ---- Self and its absence ---- */

  attā: {
    en: "self",
    explanation:
      "The Pali equivalent of the Sanskrit ātman. In the Indian philosophical context, a genuine attā would need to be permanent, fully under one's control, and the ultimate subject of experience. The Buddha's strategy in the Anattalakkhaṇa Sutta is not to argue philosophically against such a self but to apply three questions to each of the five aggregates in turn: is this permanent or impermanent? If impermanent, is it satisfying or dukkha? If it is dukkha and subject to change, can it rightly be called 'mine, what I am, my self'? The answer, in each case, is no. Attā matters precisely because anattā is not the claim that there is nothing — it is the claim that what we find on careful examination does not meet the criteria for being a self."
  },

  /* ---- The three unwholesome roots ---- */

  lobha: {
    en: "greed / lust",
    explanation:
      "The first of the three unwholesome roots (akusala-mūla). Lobha is the quality of reaching toward, wanting more, clinging to what is pleasant. It ranges from obvious greed to the subtler forms of preference and possessiveness that colour everyday experience. In the analysis of kamma, actions rooted in lobha tend to generate suffering for oneself and others. Lobha is the root that craving (tanhā) and clinging (upadāna) express in their various forms."
  },

  dosa: {
    en: "hatred / aversion",
    explanation:
      "The second unwholesome root. Dosa is the quality of pushing away — from obvious hatred and anger to milder forms of irritation, resistance, and ill-will. It arises in response to what is unpleasant, what threatens, or what simply doesn't go the way we want. Alongside lobha (greed) and moha (delusion), dosa is one of the three fires whose extinguishing is, in the fire simile, what nibbāna means. Mettā — the cultivation of goodwill — is the direct antidote to dosa."
  },

  moha: {
    en: "delusion / confusion",
    explanation:
      "The third unwholesome root, and in some sense the most fundamental. Moha is not mere ignorance in the sense of lacking information — it is the active misapprehension of how things are: taking the impermanent as permanent, the unsatisfactory as capable of delivering lasting satisfaction, and the selfless as a self. Avijjā (the first link of dependent origination) is moha operating at the most basic level. The other two roots — lobha and dosa — arise on the basis of moha: one reaches for what delusion has misread as satisfying, and one pushes away what delusion has misread as threatening."
  },

  /* ---- Papañca and its roots ---- */

  papañca: {
    en: "proliferation / elaboration",
    explanation:
      "Papañca is what the mind does after contact: it takes the bare data of experience and builds, elaborates, and proliferates — turning a moment of perception into a story, a history, a self who experienced it, a world in which that self lives. The Madhupiṇḍika Sutta (MN 18) traces the chain precisely: contact → feeling → perception → thought → and then the flood of papañca-saññā-saṅkhā, the perceptions and categories born from proliferation. Papañca is not thinking per se; it is the compulsive spinning that takes thinking beyond the object and populates the mind with what is not actually present. The three roots of papañca are tanhā (craving), māna (conceit), and diṭṭhi (views)."
  },

  māna: {
    en: "conceit / the comparing mind",
    explanation:
      "Māna is the habit of measuring oneself against others — 'I am better than,' 'I am worse than,' 'I am equal to.' It is subtler than ordinary pride; it operates even in self-deprecation. The Pali tradition identifies nine forms of māna based on combinations of three perceived standings (superior, equal, inferior) and three actual standings. What they share is the reference point: a self being compared. Māna is one of the three roots of papañca and one of the ten fetters (saṃyojana) that bind the mind to continued becoming. It is notably the last fetter to be fully abandoned — present even in the non-returner, released only at arahantship."
  },

  diṭṭhi: {
    en: "views / opinions",
    explanation:
      "A diṭṭhi is a view — a fixed position, a taken-for-granted frame through which experience is interpreted. The word covers both wrong views (micchā-diṭṭhi) and right view (sammā-diṭṭhi), though in unqualified usage it more often points to problematic views: the view of self (sakkāya-diṭṭhi), eternalist views (sassata-diṭṭhi), annihilationist views (uccheda-diṭṭhi). Diṭṭhi is the third root of papañca: once craving and conceit have taken hold, views consolidate and defend the territory they have staked out. The danger of views is not that they are wrong opinions to be replaced with correct ones — it is that clinging to any view tends to contract and rigidify the mind. Even right view, the path teaches, is ultimately to be let go."
  },

  /* ---- Key contemplative terms ---- */

  tathāgata: {
    en: "the Thus-Gone / the Thus-Come",
    explanation:
      "The term the Buddha most consistently used to refer to himself, and one of the most deliberately ambiguous in the canon. It can be parsed as tathā-gata (thus-gone) or tathā-āgata (thus-come). Both readings point away from a fixed personal identity: the Tathāgata is one who has gone in accordance with truth, or come in accordance with truth — not a substantial self with a traceable origin and destination. When asked what happens to the Tathāgata after death, the Buddha consistently declined to answer, on the grounds that the question assumes a self that the teaching has shown to be unfindable."
  },

  vipassanā: {
    en: "insight / clear seeing",
    explanation:
      "Vipassanā literally means seeing clearly or seeing into — vi (in a special way, through) + passati (to see). In practice it refers to the quality of direct seeing that penetrates the three characteristics: impermanence, unsatisfactoriness, and non-self. It is distinguished from samatha (calm/tranquility), which stills the mind, though the two work together — samatha provides the stillness in which vipassanā can operate without distortion. In the Pali tradition, vipassanā is not a particular technique but a quality that can be cultivated through any of several approaches, including satipaṭṭhāna. The insight that arises is not intellectual; it is the direct seeing of what is actually present, which changes what the mind reaches for and what it recoils from."
  },

  citta: {
    en: "mind / heart",
    explanation:
      "Citta is one of several Pali words for mind, distinguished from viññāṇa (consciousness) and mano (the mental sense base). It carries the sense of mind as the whole quality of awareness in a given moment — its tone, its orientation, its degree of clarity or contraction. The Satipaṭṭhāna Sutta's third foundation is contemplation of citta: noticing whether the mind is with or without lust, with or without hatred, contracted or scattered, exalted or not, liberated or not. Citta is also the object of the third tetrad of āṇāpānasati, where the practitioner trains to gladden, unify, and release the mind through the breath."
  },

  phassa: {
    en: "contact / sense-contact",
    explanation:
      "The sixth link of dependent origination, arising from the six sense bases and their objects. Phassa is the meeting point of sense organ, sense object, and consciousness — the moment of contact that initiates experience. It is crucial in the Madhupiṇḍika Sutta's account of how papañca arises: it is at phassa that the chain begins which, if mindfulness is absent, leads from contact through feeling, perception, and thought all the way to the flood of proliferation. Phassa is not itself problematic — contact is simply how experience works. What matters is what happens next: whether vedanā leads to craving, or is met with clear seeing."
  },

  virāga: {
    en: "dispassion / fading away",
    explanation:
      "Virāga combines two senses that reinforce each other. As 'fading away,' it describes what happens to phenomena seen clearly — the charge they carry, the compulsive quality of wanting or aversion, fades as the mind sees them for what they are. As 'dispassion,' it names the quality that arises in a mind that has seen clearly: not indifference, but the natural cooling of compulsive reaching when what was sought has been recognised as unable to deliver what was sought from it. In the fourth tetrad of āṇāpānasati and across the Satipaṭṭhāna contemplations, virāga is one of the key qualities the practitioner contemplates alongside cessation and relinquishment."
  },

  nirodha: {
    en: "cessation / ending",
    explanation:
      "Nirodha is the third noble truth: the cessation of craving is the cessation of suffering. The word means stopping, or the bringing to an end of a process. In the twelve-link chain of dependent origination, nirodha runs in the reverse direction — each link ceases when the preceding one ceases, all the way back to the cessation of avijjā. In the fourth tetrad of āṇāpānasati, the practitioner contemplates cessation directly — not as a concept but as an observable quality in the arising and passing of phenomena. Nirodha is not annihilation; it is the ending of a process that was being sustained by ignorance and craving."
  }

};

// Aliases: alternate forms used in markup that map to canonical entries
PALI_DICT["saṅkhārā"]    = PALI_DICT["saṅkhāra"];      // plural form in ti-lakkhana
PALI_DICT["bojjhaṅga"]   = PALI_DICT["bojjhaṅgā"];     // stem form in anapanasati
PALI_DICT["sammādiṭṭhi"] = PALI_DICT["sammā-diṭṭhi"];  // unhyphenated form in sammaditthi

/* ============================================================
   Core Logic
   ============================================================ */

const MOBILE_BREAKPOINT = 960;
const NOTE_GAP = 8; // px between stacked margin note cards

function isMobile() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

/**
 * Initialise all .pali spans on the page.
 * Safe to call multiple times (uses data-pali-init guard).
 */
function initPali() {
  document.querySelectorAll(".pali:not([data-pali-init])").forEach(span => {
    span.setAttribute("data-pali-init", "1");
    span.setAttribute("role", "button");
    span.setAttribute("tabindex", "0");
    span.addEventListener("click", handlePaliClick);
    span.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handlePaliClick({ currentTarget: span });
      }
    });
  });
}

function handlePaliClick(e) {
  const span = e.currentTarget;
  const word = span.dataset.pali;
  const def  = PALI_DICT[word] || null;

  // If already open, close it
  if (span.dataset.noteId) {
    closeNote(span);
    return;
  }

  if (isMobile()) {
    showInlineNote(span, word, def);
  } else {
    showMarginNote(span, word, def);
  }
}

/* ============================================================
   Margin Note (desktop)
   ============================================================ */

function showMarginNote(span, word, def) {
  const marginEl = document.querySelector(".margin-notes");
  if (!marginEl) return;

  const noteId = "pnote-" + Date.now();
  const note   = document.createElement("div");
  note.id        = noteId;
  note.className = "margin-note";
  note.setAttribute("role", "note");

  // Vertical alignment: position the card so its top aligns with the span
  const spanTop    = getDocumentTop(span);
  const marginTop  = getDocumentTop(marginEl);
  const topOffset  = Math.max(0, spanTop - marginTop);

  note.dataset.idealTop = topOffset;

  note.innerHTML = buildNoteHTML(word, def, span.dataset.en);

  note.querySelector(".margin-note__close").addEventListener("click", () => {
    closeNoteById(noteId, span);
  });

  marginEl.appendChild(note);
  relayoutMarginNotes(marginEl);

  span.dataset.noteId = noteId;
  span.classList.add("pali--active");
  span.setAttribute("aria-expanded", "true");
}

/* ============================================================
   Inline Note (mobile)
   ============================================================ */

function showInlineNote(span, word, def) {
  const noteId  = "pnote-" + Date.now();
  const note    = document.createElement("span");
  note.id        = noteId;
  note.className = "inline-note";
  note.setAttribute("role", "note");

  note.innerHTML = `
    <span class="inline-note__header">
      <span class="inline-note__pali">${word}</span>
      <span style="display:flex;gap:0.75em;align-items:center;">
        <span class="inline-note__en">${def ? def.en : (span.dataset.en || "")}</span>
        <button class="inline-note__close" aria-label="Close note">×</button>
      </span>
    </span>
    <p class="inline-note__text">${def ? def.explanation : ""}</p>
  `;

  note.querySelector(".inline-note__close").addEventListener("click", () => {
    closeNoteById(noteId, span);
  });

  // Insert after the span's parent paragraph (or directly after the span)
  const parent = span.closest("p, li, blockquote") || span.parentElement;
  parent.insertAdjacentElement("afterend", note);

  span.dataset.noteId = noteId;
  span.classList.add("pali--active");
  span.setAttribute("aria-expanded", "true");
}

/* ============================================================
   Margin Note Relayout — resolves overlaps after every open/close
   ============================================================ */

function relayoutMarginNotes(marginEl) {
  if (!marginEl) return;
  const notes = Array.from(marginEl.querySelectorAll(".margin-note"));
  if (!notes.length) return;
  notes.sort((a, b) => parseFloat(a.dataset.idealTop) - parseFloat(b.dataset.idealTop));

  // Forward pass: push notes down to avoid overlap
  let cursor = 0;
  const tops = notes.map(note => {
    const ideal = parseFloat(note.dataset.idealTop) || 0;
    const top   = Math.max(ideal, cursor);
    cursor = top + note.offsetHeight + NOTE_GAP;
    return top;
  });

  // Backward pass: pull notes up if they overflow below the article
  const pageContent = document.querySelector(".page-content");
  const maxBottom   = pageContent ? pageContent.offsetHeight : Infinity;
  for (let i = notes.length - 1; i >= 0; i--) {
    const capped = maxBottom - notes[i].offsetHeight;
    if (tops[i] > capped) {
      tops[i] = Math.max(0, capped);
    }
    if (i > 0) {
      const maxForPrev = tops[i] - notes[i - 1].offsetHeight - NOTE_GAP;
      if (tops[i - 1] > maxForPrev) {
        tops[i - 1] = Math.max(0, maxForPrev);
      }
    }
  }

  notes.forEach((note, i) => {
    note.style.top = tops[i] + "px";
  });
}

/* ============================================================
   Close Helpers
   ============================================================ */

function closeNote(span) {
  const noteId = span.dataset.noteId;
  if (noteId) closeNoteById(noteId, span);
}

function closeNoteById(noteId, span) {
  const note = document.getElementById(noteId);
  if (note) {
    note.style.animation = "none";
    note.style.opacity   = "0";
    note.style.transform = "translateX(-4px)";
    note.style.transition = "opacity 0.12s, transform 0.12s";
    setTimeout(() => {
      note.remove();
      relayoutMarginNotes(document.querySelector(".margin-notes"));
    }, 130);
  }
  delete span.dataset.noteId;
  span.classList.remove("pali--active");
  span.setAttribute("aria-expanded", "false");
}

/* ============================================================
   Utilities
   ============================================================ */

function getDocumentTop(el) {
  return el.getBoundingClientRect().top + window.scrollY;
}

function buildNoteHTML(word, def, fallbackEn) {
  const en   = def ? def.en          : (fallbackEn || "");
  const text = def ? def.explanation : "";
  return `
    <button class="margin-note__close" aria-label="Close note">×</button>
    <span class="margin-note__pali">${word}</span>
    <span class="margin-note__en">${en}</span>
    <p class="margin-note__text">${text}</p>
  `;
}

/* ============================================================
   Respond to window resize — move open notes to correct mode
   ============================================================ */

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Close all open notes on resize to avoid stale positioning
    document.querySelectorAll(".pali--active").forEach(span => {
      closeNote(span);
    });
  }, 250);
});

/* ============================================================
   Boot
   ============================================================ */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPali);
} else {
  initPali();
}
