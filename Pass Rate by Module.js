const tokens = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split(/\s+/);

const stats = new Map(); // module -> {pass, total}

for (const entry of tokens) {
  const parts = entry.split('|');
  if (parts.length < 2) continue;
  const module = parts[0];
  const status = parts[1];
  if (!stats.has(module)) stats.set(module, { pass: 0, total: 0 });
  const s = stats.get(module);
  s.total += 1;
  if (status === 'PASS') s.pass += 1;
}

function roundHalfUp2(pass, total) {
  const numerator = pass * 10000; // percentage * 100, scaled
  let quotient = Math.floor(numerator / total);
  const remainder = numerator % total;
  if (remainder * 2 >= total) quotient += 1;
  const intPart = Math.floor(quotient / 100);
  const decPart = quotient % 100;
  return `${intPart}.${String(decPart).padStart(2, '0')}`;
}

const modules = [...stats.keys()].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

for (const m of modules) {
  const { pass, total } = stats.get(m);
  console.log(`${m} ${roundHalfUp2(pass, total)}`);
}