const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let lines = [];
rl.on('line', (line) => lines.push(line.trim()));
rl.on('close', () => {
    const n = parseInt(lines[0]);
    const arr = lines[1].split(' ').map(Number);

    const seen = new Set();
    const duplicates = [];

    for (const num of arr) {
        if (seen.has(num)) {
            duplicates.push(num);
        } else {
            seen.add(num);
        }
    }

    if (duplicates.length > 0) {
        console.log(duplicates.join('\n'));
    } else {
        console.log("No duplicates found");
    }
});