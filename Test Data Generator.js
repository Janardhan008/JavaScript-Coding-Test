function questionName(input) {
    // Determine number of users to generate (default to 8 if not specified)
    const totalUsers = typeof input === 'number' ? input : 8;

    // Use const for fixed values (roles array)
    const roles = ["admin", "editor", "viewer", "tester", "manager"];
    
    // Use var for a global counter/accumulator string as hinted by the prompt context
    var userTableLines = [];

    // Use let for the loop variable
    for (let i = 1; i <= totalUsers; i++) {
        // Generate zero-padded ID component: USR-0001
        const id = `USR-${String(i).padStart(4, "0")}`;
        
        // Define sequential names and emails
        const name = `TestUser_${i}`;
        const email = `testuser${i}@testingacademy.com`;
        
        // Use modulo (%) to cycle through the roles array
        const role = roles[(i - 1) % roles.length];
        
        // Every 3rd user should be INACTIVE, others ACTIVE
        const status = (i % 3 === 0) ? "INACTIVE" : "ACTIVE";

        // Build the precise table format: ID | Name | Email | Role | Status
        userTableLines.push(`${id} | ${name} | ${email} | ${role} | ${status}`);
    }

    // Join all entries with a space followed by a newline or space separation as shown in the example wrapper
    let answer = userTableLines.join(" ");

    return answer;
}