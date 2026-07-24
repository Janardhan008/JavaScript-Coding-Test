function buildJsBasicsRunLabel(suiteName, environment, buildNumber) {
  // Trim the suite name
  const trimmedSuite = String(suiteName).trim();

  // Lowercase the environment (also trim, since stray whitespace could sneak through)
  const normalizedEnv = String(environment).trim().toLowerCase();

  // Append build number as build-N
  const buildLabel = `build-${buildNumber}`;

  // Join the three parts with " | "
  return [trimmedSuite, normalizedEnv, buildLabel].join(" | ");
}