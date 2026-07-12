const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const paliSrc = fs.readFileSync(path.join(root, "js", "pali.js"), "utf8");
const start = paliSrc.indexOf("const PALI_DICT = ") + "const PALI_DICT = ".length;
const end = paliSrc.indexOf("\n};", start) + 2;
const dict = new Function("return (" + paliSrc.slice(start, end) + ")")();

const DIACRITIC = /[āīūṃṇñṭḍḷṛṣśṅĀĪŪṂṆÑṬḌḶṚṢŚṅ]/;
const terms = Object.keys(dict).sort((a, b) => b.length - a.length);

const PLURALS = {
  jhāna: ["jhānas"],
  khandha: ["khandhas"],
  sutta: ["suttas"],
  nīvaraṇa: ["nīvaraṇas"],
  brahmavihāra: ["brahmavihārās"],
  āsavā: ["āsavas", "āsava"],
  nidāna: ["nidānas"],
};

const contentDirs = ["concepts", "suttas", "quotes"];
const extraFiles = ["index.njk", "guide.njk"];
const files = [];

for (const dir of contentDirs) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) continue;
  for (const f of fs.readdirSync(full)) {
    if (f.endsWith(".njk") && f !== "index.njk") files.push(path.join(dir, f));
  }
}

for (const f of extraFiles) {
  const full = path.join(root, f);
  if (fs.existsSync(full)) files.push(f);
}

function stripPaliSpans(html) {
  return html.replace(/<span[^>]*class="pali"[^>]*>[\s\S]*?<\/span>/gi, " ");
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, " ");
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getContentBody(raw) {
  const fmEnd = raw.indexOf("---", 3);
  return fmEnd >= 0 ? raw.slice(fmEnd + 3) : raw;
}

function classify(line) {
  if (/^<h[1-6][^>]*>/i.test(line.trim())) return "heading";
  if (/<a\s/i.test(line) && /Sutta/i.test(line)) return "sutta-title";
  if (/guide-item__title/i.test(line)) return "guide-title";
  if (/home-cta/i.test(line)) return "nav";
  return "body";
}

function formsForTerm(term) {
  const forms = [term];
  if (term.includes("-")) forms.push(term.replace(/-/g, ""));
  if (PLURALS[term]) forms.push(...PLURALS[term]);
  return [...new Set(forms)];
}

function isValidMatch(term, matched) {
  const m = matched;
  const t = term;

  // Terms with diacritics: matched text must also carry a diacritic,
  // unless it is an exact ASCII alias already in the dict (e.g. sammādiṭṭhi)
  if (DIACRITIC.test(t) && !DIACRITIC.test(m)) {
    const joined = t.replace(/-/g, "");
    if (m.toLowerCase() !== joined.toLowerCase()) return false;
  }

  // Short ASCII-only terms: require exact case-insensitive whole-word match
  if (!DIACRITIC.test(t) && m.length <= 5) {
    if (m.toLowerCase() !== t.toLowerCase()) return false;
  }

  return true;
}

function findInLines(lines, matched) {
  const search = matched.toLowerCase();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/class="pali"/i.test(line)) continue;
    const plain = stripTags(line).toLowerCase();
    const re = new RegExp(`(^|[^a-zāīūṃṇñṭḍḷ])${escapeRegex(search)}([^a-zāīūṃṇñṭḍḷ]|$)`, "i");
    if (re.test(plain)) {
      return { lineNo: i + 1, context: line.trim().slice(0, 140), category: classify(line) };
    }
  }
  return { lineNo: null, context: "", category: "body" };
}

const results = [];

for (const rel of files.sort()) {
  const raw = fs.readFileSync(path.join(root, rel), "utf8");
  const content = getContentBody(raw);
  const stripped = stripTags(stripPaliSpans(content));
  const lines = content.split("\n");
  const found = new Map();

  for (const term of terms) {
    for (const form of formsForTerm(term)) {
      const re = new RegExp(`(^|[^a-zA-ZāīūṃṇñṭḍḷĀĪŪṂṆÑṬḌḶ])(${escapeRegex(form)})(?=[^a-zA-ZāīūṃṇñṭḍḷĀĪŪṂṆÑṬḌḶ]|$)`, "gi");
      let m;
      while ((m = re.exec(stripped)) !== null) {
        const matched = m[2];
        if (!isValidMatch(term, matched)) continue;
        if (!found.has(term)) found.set(term, []);
        const existing = found.get(term);
        if (existing.some((e) => e.matched.toLowerCase() === matched.toLowerCase())) continue;
        existing.push({ matched, ...findInLines(lines, matched) });
      }
    }
  }

  if (found.size) results.push({ file: rel, terms: found });
}

const byCategory = { body: [], heading: [], "sutta-title": [], "guide-title": [], nav: [] };

for (const { file, terms: termMap } of results) {
  for (const [term, occurrences] of termMap) {
    for (const occ of occurrences) {
      byCategory[occ.category].push({ file, term, ...occ });
    }
  }
}

function printSection(title, items) {
  if (!items.length) return;
  console.log(`\n=== ${title} (${items.length}) ===\n`);
  const byFile = new Map();
  for (const item of items) {
    if (!byFile.has(item.file)) byFile.set(item.file, []);
    byFile.get(item.file).push(item);
  }
  for (const [file, fileItems] of [...byFile.entries()].sort()) {
    console.log(`## ${file}`);
    for (const item of fileItems.sort((a, b) => (a.lineNo || 0) - (b.lineNo || 0))) {
      const variant = item.matched !== item.term ? ` (as "${item.matched}")` : "";
      console.log(`  - ${item.term}${variant} @ line ${item.lineNo}`);
      if (item.context) console.log(`      ${item.context}`);
    }
    console.log("");
  }
}

console.log("PALI GLOSSARY LINK AUDIT");
console.log(`Scanned ${files.length} pages against ${terms.length} glossary terms\n`);

printSection("BODY COPY — should likely be linked", byCategory.body);
printSection("SECTION HEADINGS — term in h2/h3 title", byCategory.heading);
printSection("SUTTA TITLES — in links or references", byCategory["sutta-title"]);
printSection("START-HERE GUIDE TITLES", byCategory["guide-title"]);
printSection("NAVIGATION — low priority", byCategory.nav);

const total = Object.values(byCategory).reduce((n, arr) => n + arr.length, 0);
console.log(`\nTotal unlinked occurrences: ${total}`);
console.log(`  body copy: ${byCategory.body.length}`);
console.log(`  headings: ${byCategory.heading.length}`);
console.log(`  sutta titles: ${byCategory["sutta-title"].length}`);
console.log(`  guide titles: ${byCategory["guide-title"].length}`);
console.log(`  navigation: ${byCategory.nav.length}`);

// Summary: unique terms missing links in body copy
const bodyTerms = [...new Set(byCategory.body.map((i) => i.term))].sort();
console.log(`\nUnique glossary terms unlinked in body copy (${bodyTerms.length}):`);
console.log(bodyTerms.join(", "));
