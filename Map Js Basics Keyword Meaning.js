function getJsBasicsKeywordMeaning(term) {
  // Normalize input: trim whitespace and lowercase, so lookups are case/spacing-insensitive
  const normalized = String(term).trim().toLowerCase();

  const keywordMap = {
    javascript: "language",
    node: "runtime",
    v8: "engine",
    npm: "package-manager",
    comment: "annotation",
    identifier: "name",
    literal: "fixed-value",
    null: "no-value",
    undefined: "not-assigned",
    equality: "comparison",
    typeof: "type-check",
    let: "block-scoped",
    const: "immutable-binding",
    var: "function-scoped",
  };

  // Return the mapped meaning if the term exists in the map
  if (Object.prototype.hasOwnProperty.call(keywordMap, normalized)) {
    return keywordMap[normalized];
  }

  // Return "unknown" for anything not in the map
  return "unknown";
}