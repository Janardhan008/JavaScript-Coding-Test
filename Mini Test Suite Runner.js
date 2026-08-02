function questionName(input) {
    // Ensure we handle input as an array of test cases
    const tests = Array.isArray(input) ? input : [input];
    const totalTests = tests.length;

    // 1. Scope usage: var for global/shared report tracking
    var passCount = 0;
    var failCount = 0;
    var errorCount = 0;
    var detailedLogs = [];
    var testStatuses = []; // Array of booleans tracking true for pass, false otherwise

    // 2. Loop through all test cases using a standard for loop
    for (let i = 0; i < totalTests; i++) {
        const tc = tests[i];
        
        // Nullish coalescing operator (??) to handle missing or undefined names safely
        const tcName = tc.name ?? `Unnamed Test Case`;
        const actual = tc.actual;
        const expected = tc.expected;
        const type = tc.type;

        let isPassed = false;
        let isError = false;

        // Switch statement to handle different evaluation criteria
        switch (type) {
            case "strictEqual":
                isPassed = (actual === expected);
                break;
            case "looseEqual":
                isPassed = (actual == expected);
                break;
            case "typeCheck":
                isPassed = (typeof actual === expected);
                break;
            case "truthy":
                isPassed = !!actual;
                break;
            case "lessThan":
                isPassed = (actual < expected);
                break;
            default:
                isError = true;
                break;
        }

        // Check if an unsupported type or error was thrown
        if (isError) {
            errorCount++;
            testStatuses.push(false);
            detailedLogs.push(`❌ TC-${String(i + 1).padStart(2, "0")}: ${tcName} -> ERROR (Invalid type comparison)`);
        } else if (isPassed) {
            passCount++;
            testStatuses.push(true);
            detailedLogs.push(`✅ TC-${String(i + 1).padStart(2, "0")}: ${tcName} -> PASS (${actual} === ${expected})`);
        } else {
            failCount++;
            testStatuses.push(false);
            detailedLogs.push(`❌ TC-${String(i + 1).padStart(2, "0")}: ${tcName} -> FAIL`);
        }
    }

    // 3. Find consecutive passes from the start using a while loop
    let consecutivePasses = 0;
    let wIdx = 0;
    while (wIdx < testStatuses.length && testStatuses[wIdx] === true) {
        consecutivePasses++;
        wIdx++;
    }

    // 4. Find the index of the first failure using a do...while loop
    let firstFailureIndex = -1;
    let dIdx = 0;
    if (testStatuses.length > 0) {
        do {
            if (testStatuses[dIdx] === false) {
                firstFailureIndex = dIdx + 1; // 1-based index positioning
                break;
            }
            dIdx++;
        } while (dIdx < testStatuses.length);
    }

    // Calculate the pass rate formatted to 2 decimal places
    let passRate = totalTests > 0 ? ((passCount / totalTests) * 100).toFixed(2) : "0.00";

    // 5. Use a ternary operator to establish overall status matching the display layout
    let overallStatus = (failCount > 0 || errorCount > 0) ? "❌ FAILED" : "✅ PASSED";

    // 6. Assemble individual outputs and metrics summary
    let reportString = detailedLogs.join(" ") + ` ... Pass Rate: ${passRate}% Overall: ${overallStatus}`;

    let answer = reportString;
    return answer;
}