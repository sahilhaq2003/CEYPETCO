const fs = require("fs");
const path = require("path");

const replacements = [
  ["\u00e2\u20ac\u2122", "\u2019"],     // â€™ -> curly right single quote/apostrophe '  (U+2019)
  ["\u00e2\u20ac\u0153", "\u201c"],     // â€œ -> left double quote " (U+201C)
  ["\u00e2\u20ac\u201c", "\u2013"],     // â€“ -> en dash – (U+2013)
  ["\u00e2\u20ac\u201d", "\u2014"],     // â€” -> em dash — (U+2014)
  ["\u00e2\u20ac", "\u201d"],           // â€  -> right double quote " (U+201D)
  ["\u00c2\u00b7", "\u00b7"],           // Â·  -> middle dot · (U+00B7)
  ["\u00c2\u00b0", "\u00b0"],           // Â°  -> degree sign ° (U+00B0)
  ["\u00c2\u00a0", " "],                // Â+nbsp -> space
  ["\u00c3\u00a9", "\u00e9"],           // Ã© -> é
  ["\u00c3\u00a8", "\u00e8"],           // Ã¨ -> è
  ["\u00c3\u00a3", "\u00e3"],           // Ã£ -> ã
  ["\u00c3\u00b6", "\u00f6"],           // Ã¶ -> ö
  ["\u00c3\u00bc", "\u00fc"],           // Ã¼ -> ü
];

const roots = [
  "C:/Users/sahil/Desktop/projects/Cepetco/ceypetco-redesign/frontend/src",
  "C:/Users/sahil/Desktop/projects/Cepetco/ceypetco-redesign/backend/src",
];

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(jsx|js|css)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const allFiles = roots.flatMap((r) => walk(r));
let any = false;
for (const file of allFiles) {
  const raw = fs.readFileSync(file, "utf8");
  let out = raw;
  let changed = false;
  for (const [from, to] of replacements) {
    const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    if (re.test(out)) {
      out = out.replace(re, to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, out);
    any = true;
    console.log("FIXED ", file.replace("C:/Users/sahil/Desktop/projects/Cepetco/ceypetco-redesign/", ""));
  }
}
if (!any) console.log("No mojibake found.");
console.log("Done.");
