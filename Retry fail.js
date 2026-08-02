function questionName(input) {
    // 1. Initialize our tracking variables
    const MAX_ATTEMPTS = input || 5; // Use passed input value or default to 5
    let attemptNumber = 0;
    let isSuccess = false;
    let logLines = [];

    // 2. Use a do...while loop to ensure at least one execution
    do {
        attemptNumber++;
        
        // Simulate random success/failure condition
        let randomValue = Math.random();
        
        if (randomValue > 0.6) {
            isSuccess = true;
            logLines.push(`Attempt ${attemptNumber}: 🟢 SUCCESS (Response 200 OK)`);
        } else {
            isSuccess = false;
            logLines.push(`Attempt ${attemptNumber}: ❌ FAILED (Timeout/Error)`);
        }

    } while (!isSuccess && attemptNumber < MAX_ATTEMPTS);

    // 3. Append the final result summary line based on the outcome
    if (isSuccess) {
        logLines.push(`API call PASSED after ${attemptNumber} attempt(s).`);
    } else {
        logLines.push(`API call FAILED after reaching maximum ${MAX_ATTEMPTS} attempt(s).`);
    }

    // 4. Combine all logged lines into a single text output string
    let answer = logLines.join("\n");

    return answer;
}