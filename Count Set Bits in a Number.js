// Read input
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, terminal: false });

let lines = [];
rl.on('line', (line) => lines.push(line.trim()));
rl.on('close', () => {
    let n = parseInt(lines[0], 10);
    let count = 0;

    while (n > 0) {
        n = n & (n - 1); // clear the lowest set bit
        count++;
    }

    console.log(count);
});