function findFirstCriticalJsBasicsBug(bugs) {
  // Look for the first bug whose severity is exactly "critical"
  const criticalBug = bugs.find((bug) => bug.severity === "critical");

  // Return its title if found, otherwise the fallback message
  return criticalBug ? criticalBug.title : "No critical bug";
}