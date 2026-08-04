const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, terminal: false });

let lines = [];
rl.on('line', (line) => lines.push(line.trim()));
rl.on('close', () => {
    const n = parseInt(lines[0], 10);
    const arr = lines[1].split(' ').map(Number);

    let smallest = arr[0];
    for (let i = 1; i < n; i++) {
        if (arr[i] < smallest) {
            smallest = arr[i];
        }
    }

    console.log(smallest);
});