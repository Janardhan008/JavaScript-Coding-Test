function questionName(input) {
    // 1. Convert input to lowercase for case-insensitive matching as hinted
    const envName = String(input).toLowerCase();

    // Use let for the individual variables that will form the assembled config
    let displayEnv = "";
    let baseUrl = "";
    let apiKey = "";
    let timeout = "";
    let description = "";

    // 2. Switch statement to evaluate environment configs
    switch (envName) {
        case "dev":
            displayEnv = "DEV";
            baseUrl = "https://dev-api.testingacademy.com";
            apiKey = "dev_key_xxxx-xxxx";
            timeout = "3000ms";
            description = "Development - Sandbox environment";
            break;

        case "staging":
            displayEnv = "STAGING";
            baseUrl = "https://staging-api.testingacademy.com";
            apiKey = "stg_key_xxxx-xxxx";
            timeout = "8000ms";
            description = "Staging - Pre-production mirror";
            break;

        case "qa":
            displayEnv = "QA";
            baseUrl = "https://qa-api.testingacademy.com";
            apiKey = "qa_key_xxxx-xxxx";
            timeout = "5000ms";
            description = "Quality Assurance - Testing environment";
            break;

        // Use fall-through for "production" and "prod" cases as hinted
        case "production":
        case "prod":
            displayEnv = "PRODUCTION";
            baseUrl = "https://api.testingacademy.com";
            apiKey = "prod_key_xxxx-xxxx";
            timeout = "10000ms";
            description = "Production - Live environment";
            break;

        // Use a default case for invalid environment names
        default:
            displayEnv = "UNKNOWN";
            baseUrl = "N/A";
            apiKey = "N/A";
            timeout = "0ms";
            description = "Invalid or unhandled environment name";
            break;
    }

    // 3. Assemble the config details using let and template literals matching the exact Output format
    let answer = `Environment: ${displayEnv} Base URL: ${baseUrl} API Key: ${apiKey} Timeout: ${timeout} Description: ${description}`;

    return answer;
}