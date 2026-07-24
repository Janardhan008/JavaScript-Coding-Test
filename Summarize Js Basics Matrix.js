function summarizeJsBasicsMatrix(matrix) {
  const summary = {
    total: 0,
    passed: 0,
    failed: 0,
    failedCases: [],
  };

  // The input is an array of arrays — loop through each row, then each cell in that row
  for (const row of matrix) {
    for (const cell of row) {
      // Count total
      summary.total++;

      // Case-insensitive matching
      const normalized = String(cell).trim().toLowerCase();

      if (normalized.includes("pass")) {
        summary.passed++;
      } else if (normalized.includes("fail")) {
        summary.failed++;
        summary.failedCases.push(cell); // collect the original (non-normalized) failed case
      }
    }
  }

  return summary;
}