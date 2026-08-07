process.stdin.resume();
process.stdin.setEncoding('utf8');

let inputData = '';
process.stdin.on('data', (data) => {
  inputData += data;
});

process.stdin.on('end', () => {
  const tokens = inputData.trim().split(/\s+/).map(Number);
  let idx = 0;

  const rows = tokens[idx++];
  const cols = tokens[idx++];

  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(tokens[idx++]);
    }
    matrix.push(row);
  }

  const result = spiralOrder(matrix);
  console.log(result.join(' '));
});

function spiralOrder(matrix) {
  const result = [];
  if (matrix.length === 0) return result;

  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // left to right across top row
    for (let col = left; col <= right; col++) {
      result.push(matrix[top][col]);
    }
    top++;

    // top to bottom down right column
    for (let row = top; row <= bottom; row++) {
      result.push(matrix[row][right]);
    }
    right--;

    // right to left across bottom row (if still valid)
    if (top <= bottom) {
      for (let col = right; col >= left; col--) {
        result.push(matrix[bottom][col]);
      }
      bottom--;
    }

    // bottom to top up left column (if still valid)
    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        result.push(matrix[row][left]);
      }
      left++;
    }
  }

  return result;
}