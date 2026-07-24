function createUniqueJsBasicsTags(tags) {
  const seen = new Set();
  const result = [];

  for (const rawTag of tags) {
    // Trim each tag and lowercase each tag
    const normalized = String(rawTag).trim().toLowerCase();

    // Remove blank values
    if (normalized.length === 0) {
      continue;
    }

    // Keep first-seen order — skip if already added
    if (seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);
    result.push(normalized);
  }

  return result;
}