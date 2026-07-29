const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (year) => {
    year = parseInt(year.trim());
    
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    
    console.log(isLeap ? "YES" : "NO");
    rl.close();
});