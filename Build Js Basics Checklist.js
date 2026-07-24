function buildJsBasicsChecklist(tasks) {
  const result = [];
  let counter = 1;

  for (const rawTask of tasks) {
    // Keep the original task text after trimming
    const trimmed = String(rawTask).trim();

    // Skip blank values (not counted in numbering)
    if (trimmed.length === 0) {
      continue;
    }

    // Number items from 1, append " - TODO" to each item
    result.push(`${counter}. ${trimmed} - TODO`);
    counter++;
  }

  return result;
}