function questionName(input) {
    // 1. Handle input variation safely (extract array)
    const responseTimes = Array.isArray(input) ? input : (input.responseTimes || []);
    const totalRequests = responseTimes.length;

    // Edge case handling if array is empty
    if (totalRequests === 0) {
        let answer = "Total Requests: 0 Min Response: 0ms Max Response: 0ms SLA Breaches: 0 (0.00%)\nOverall Status: ✅ SLA PASSED";
        return answer;
    }

    // 2. Initialize min and max with the first element of the array
    let minResponse = responseTimes[0];
    let maxResponse = responseTimes[0];
    let totalSum = 0;
    let breachCount = 0;
    const SLA_LIMIT = 500;

    // 3. Use a while loop with an index counter to analyze the response times
    let i = 0;
    while (i < totalRequests) {
        let current = responseTimes[i];

        // Track minimum response time using comparison operators
        if (current < minResponse) {
            minResponse = current;
        }
        // Track maximum response time using comparison operators
        if (current > maxResponse) {
            maxResponse = current;
        }

        // Accumulate total sum for average calculation later
        totalSum += current;

        // Check for SLA breach (> 500ms)
        if (current > SLA_LIMIT) {
            breachCount++;
        }

        i++;
    }

    // 4. Calculate breach percentage formatted to 2 decimal places
    let breachPercentage = ((breachCount / totalRequests) * 100).toFixed(2);

    // 5. Use ternary operator for overall status at the end
    let statusText = breachCount > 0 ? "❌ SLA VIOLATED" : "✅ SLA PASSED";

    // 6. Format the final output string exactly like the required example structure
    let answer = `Total Requests: ${totalRequests} Min Response: ${minResponse}ms Max Response: ${maxResponse}ms SLA Breaches: ${breachCount} (${breachPercentage}%)\nOverall Status: ${statusText}`;

    return answer;
}