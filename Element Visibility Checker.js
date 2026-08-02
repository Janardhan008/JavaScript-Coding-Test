function questionName(input) {
    // 1. Destructure or extract the boolean flags from the input object
    const isPresent = input.isPresent === true;
    const isDisplayed = input.isDisplayed === true;
    const isEnabled = input.isEnabled === true;

    let status = "";
    let action = "";

    // 2. Check isPresent first since other properties depend on it (Nested if-else)
    if (!isPresent) {
        status = "NOT FOUND";
        action = "Element not found in DOM. Check locator strategy or wait strategy.";
    } else {
        if (!isDisplayed) {
            status = "HIDDEN";
            action = "Element is present but hidden. Check if it requires a UI action to reveal.";
        } else {
            if (!isEnabled) {
                status = "DISABLED";
                action = "Element is visible but disabled. Wait for enable state or check preconditions.";
            } else {
                status = "READY";
                action = "Element is fully interactable. Proceed with interaction.";
            }
        }
    }

    // 3. Use ternary operators for severity level classification
    // CRITICAL (not present), WARNING (not displayed or not enabled), OK (all good)
    let severity = (!isPresent) 
        ? "CRITICAL" 
        : ((!isDisplayed || !isEnabled) ? "WARNING" : "OK");

    // 4. Construct the precise multiline string matching the required platform output format
    let answer = `Status: ${status} Severity: ${severity}\nAction: ${action}`;

    return answer;
}