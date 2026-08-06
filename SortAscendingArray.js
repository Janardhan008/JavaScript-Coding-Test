const lines = require('fs').readFileSync('/dev/stdin', 'utf8').split('\n');

const n = parseInt(lines[0].trim(), 10);
const arr = lines[1].trim().split(/\s+/).map(Number);

arr.sort((a, b) => a - b);

console.log(arr.slice(0, n).join(' '));