const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  const trimmed = line.trim();
  console.log(trimmed === '' ? 0 : trimmed.split(/\s+/).length);
  rl.close();
});