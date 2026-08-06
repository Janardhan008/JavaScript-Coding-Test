const fs = require('fs');
const input = fs.readFileSync(0, 'utf8');

const tokens = input.trim().split(/\s+/).filter(Boolean).map(Number);
let idx = 0;
const n = tokens[idx++];

const matrix = [];
for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
        row.push(tokens[idx++]);
    }
    matrix.push(row);
}

function rotateClockwise(matrix, n) {
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}

rotateClockwise(matrix, n);

// Print each row on its own line instead of one flat line
const lines = matrix.map(row => row.join(' '));
console.log(lines.join('\n'));