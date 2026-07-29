const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
    let [a, b] = line.trim().split(' ').map(Number);
    
    a = a + b;
    b = a - b;
    a = a - b;
    
    console.log(`${a} ${b}`);
    rl.close();
});