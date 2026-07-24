function summarizeJsBasicsResults(results) {
  const summary = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
  };

  for (const item of results) {
    // Count total items
    summary.total++;

    // Case-insensitive matching
    const normalized = String(item).trim().toLowerCase();

    if (normalized.includes("pass")) {
      summary.passed++;
    } else if (normalized.includes("fail")) {
      summary.failed++;
    } else if (normalized.includes("skip")) {
      summary.skipped++;
    }
  }

  return summary;
}