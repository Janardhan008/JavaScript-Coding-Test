function questionName(input) {
    // 1. Initialize counters to 0 before the loop
    let passed = 0;
    let failed = 0;
    let skipped = 0;
    let totalTests = input.length;

    // 2. Use a for loop and if-else logic to count each result type
    for (let i = 0; i < totalTests; i++) {
        if (input[i] === "pass") {
            passed++;
        } else if (input[i] === "fail") {
            failed++;
        } else if (input[i] === "skip") {
            skipped++;
        }
    }

    // 3. Calculate pass rate as (passed / totalTests) * 100
    // If totalTests is 0, default the pass rate to 0.00 to avoid NaN errors.
    let passRate = totalTests > 0 ? ((passed / totalTests) * 100).toFixed(2) : "0.00";

    // 4. Determine the verdict text based on the conditions
    let verdict = "";
    if (failed === 0) {
        verdict = "All passed. Ready for release.";
    } else if (failed <= 2) {
        verdict = "Minor failures. Review before release.";
    } else {
        verdict = "Major failures. Block release.";
    }

    // 5. Construct the final string exactly matching the output format requirement
    let answer = `Total Tests : ${totalTests} Passed : ${passed} Failed : ${failed} Skipped : ${skipped} Pass Rate : ${passRate}% VERDICT: ${verdict}`;

    return answer;
}