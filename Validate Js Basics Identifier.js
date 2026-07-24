function isValidJsBasicsIdentifier(value) {

  // Rule 1: must be a non-empty string after trimming
  if (typeof value !== "string") {
    return false;
  }

  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return false;
  }

  // Rule 2 & 3: must start with letter/_/$ , followed by letters/digits/_/$
  const identifierPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

  if (!identifierPattern.test(trimmed)) {
    return false;
  }

  // Rule 4: reject reserved words
  const reservedWords = ["let", "const", "var", "class", "function", "return"];

  if (reservedWords.includes(trimmed)) {
    return false;
  }

  return true;
}

// --- Test cases ---
const testValues = [
  "userName",       // valid
  "_id",            // valid
  "$price",         // valid
  "  total  ",      // valid after trim
  "2fast",          // invalid - starts with digit
  "user-name",      // invalid - contains hyphen
  "",               // invalid - empty
  "   ",            // invalid - empty after trim
  "let",            // invalid - reserved word
  "function",       // invalid - reserved word
  "myFunction2",    // valid
];

testValues.forEach((val) => {
  console.log(`"${val}" -> ${isValidJsBasicsIdentifier(val)}`);
});