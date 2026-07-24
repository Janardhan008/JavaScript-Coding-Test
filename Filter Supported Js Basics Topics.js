function filterSupportedJsBasicsTopics(topics) {
  // Maps every accepted alias (including canonical names themselves) to its canonical topic key
  const aliasMap = {
    javascript: "javascript",
    js: "javascript",

    node: "node",
    nodejs: "node",
    runtime: "node",

    v8: "v8",
    engine: "v8",

    npm: "npm",
    "package-manager": "npm",

    comment: "comment",
    identifier: "identifier",
    literal: "literal",
    null: "null",
    undefined: "undefined",
    equality: "equality",
    typeof: "typeof",
  };

  const seen = new Set();
  const result = [];

  for (const rawTopic of topics) {
    // Trim and lowercase each item
    const normalized = String(rawTopic).trim().toLowerCase();

    // Skip unsupported values (not in the alias map)
    if (!Object.prototype.hasOwnProperty.call(aliasMap, normalized)) {
      continue;
    }

    const canonical = aliasMap[normalized];

    // Skip duplicates, but keep first-seen order
    if (seen.has(canonical)) {
      continue;
    }

    seen.add(canonical);
    result.push(canonical);
  }

  return result;
}