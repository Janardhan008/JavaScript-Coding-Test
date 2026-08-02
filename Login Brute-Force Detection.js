function questionName(input) {
    // 1. Define fixed values using const (credentials and threshold)
    const VALID_USER = "admin@testingacademy.com";
    const VALID_PASS = "Test@1234";
    const LOCKOUT_THRESHOLD = 3;

    // Handle input objects dynamically (expecting input.attempts as the array)
    const attempts = Array.isArray(input) ? input : (input.attempts || []);
    
    // 2. Use var for tracking log lines/global counters across scopes
    var logLines = [];
    var failedAttemptsCounter = 0;
    var isLocked = false;

    // 3. Use let for the loop tracking variables
    let index = 0;
    let totalAttempts = attempts.length;

    // Edge case if no attempts are provided
    if (totalAttempts === 0) {
        return "No login attempts processed.";
    }

    // 4. Process using a do...while loop to ensure at least one execution
    do {
        let currentAttempt = attempts[index];
        let attemptNum = index + 1;

        // Hint Rule: Check if the account is already locked first
        if (isLocked) {
            logLines.push(`Attempt ${attemptNum}: 🔒 ACCOUNT LOCKED - Rejected`);
        } else {
            // Hint Rule: Validate using strict equality (===) and logical AND (&&)
            let isCredentialsValid = currentAttempt.username === VALID_USER && currentAttempt.password === VALID_PASS;

            if (isCredentialsValid) {
                logLines.push(`Attempt ${attemptNum}: 🎉 SUCCESS - Login Successful`);
                // Reset counter on successful login if threshold isn't breached yet
                failedAttemptsCounter = 0; 
                break; // Exit early since user successfully logged in
            } else {
                failedAttemptsCounter++;
                logLines.push(`Attempt ${attemptNum}: ❌ FAILED - Strike ${failedAttemptsCounter}/${LOCKOUT_THRESHOLD}`);

                // Immediately flag account as locked if threshold is met
                if (failedAttemptsCounter === LOCKOUT_THRESHOLD) {
                    isLocked = true;
                    logLines.push(`🚨 ACCOUNT LOCKED`);
                }
            }
        }

        index++;
    } while (index < totalAttempts);

    // 5. Join all processed elements separated by a space as expected by the runner
    let answer = logLines.join(" ");

    return answer;
}