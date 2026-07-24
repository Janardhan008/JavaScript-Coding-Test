function mergeJsBasicsConfig(defaults, overrides) {
  // Spread both objects into a new one — overrides win because they're spread last,
  // and neither input object is mutated since we're building a brand new object.
  const merged = { ...defaults, ...overrides };

  // If retries is missing from both objects, default it to 0
  if (!Object.prototype.hasOwnProperty.call(merged, "retries")) {
    merged.retries = 0;
  }

  return merged;
}