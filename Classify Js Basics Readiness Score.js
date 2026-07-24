

function classifyJsBasicsScore(score) {
  if (typeof score !== "number" || Number.isNaN(score)) {
    throw new TypeError("Score must be a valid number");
  }

  if (score >= 90) {
    return "EXCELLENT";
  } else if (score >= 75) {
    return "GOOD";
  } else if (score >= 50) {
    return "NEEDS_PRACTICE";
  } else {
    return "REVISIT";
  }
}

// --- Test cases ---
const testScores = [95, 90, 89, 75, 74, 50, 49, 0, -5];

testScores.forEach((score) => {
  console.log(`Score: ${score} -> ${classifyJsBasicsScore(score)}`);
});