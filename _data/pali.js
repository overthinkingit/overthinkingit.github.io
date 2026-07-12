const fs = require("fs");
const path = require("path");

module.exports = function () {
  const src = fs.readFileSync(path.join(__dirname, "..", "js", "pali.js"), "utf8");
  const start = src.indexOf("const PALI_DICT = ") + "const PALI_DICT = ".length;
  const end = src.indexOf("\n};", start) + 2;
  const dict = new Function("return (" + src.slice(start, end) + ")")();

  return Object.keys(dict)
    .sort(function (a, b) {
      return a.localeCompare(b, "en");
    })
    .map(function (term) {
      return {
        term: term,
        en: dict[term].en,
        explanation: dict[term].explanation,
      };
    });
};
