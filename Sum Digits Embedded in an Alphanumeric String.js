const line = require('fs').readFileSync('/dev/stdin', 'utf8').split('\n')[0];

const sum = line
  .split('')
  .filter(ch => ch >= '0' && ch <= '9')
  .reduce((acc, ch) => acc + Number(ch), 0);

console.log(sum);