const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (n) => {
    n = parseInt(n.trim());
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
    rl.close();
});