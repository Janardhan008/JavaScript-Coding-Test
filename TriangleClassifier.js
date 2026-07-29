const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
    const [a, b, c] = line.trim().split(' ').map(Number);
    
    let result;
    if (a === b && b === c) {
        result = "Equilateral";
    } else if (a === b || b === c || a === c) {
        result = "Isosceles";
    } else {
        result = "Scalene";
    }
    
    console.log(result);
    rl.close();
});