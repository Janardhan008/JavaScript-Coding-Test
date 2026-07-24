function countPassingJsBasicsChecks(checks) {
  let count = 0;

  for (const item of checks) {
    // Case-insensitive matching: normalize to lowercase before checking
    const normalized = String(item).trim().toLowerCase();

    // A passing item contains the word "pass" anywhere in the string
    if (normalized.includes("pass")) {
      count++;
    }
  }

  // Return only the count
  return count;
}