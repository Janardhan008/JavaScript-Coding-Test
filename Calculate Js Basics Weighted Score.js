function calculateJsBasicsWeightedScore(passed, failed, skipped) {
  // Each passed item gives 2 points, each failed item subtracts 1, skipped items are 0
  const score = (passed * 2) + (failed * -1) + (skipped * 0);

  return score;
}