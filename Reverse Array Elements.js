const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, terminal: false });

let lines = [];
rl.on('line', (line) => lines.push(line.trim()));
rl.on('close', () => {
    const n = parseInt(lines[0], 10);
    const arr = lines[1].split(' ').map(Number);
    console.log(arr.reverse().join(' '));
});