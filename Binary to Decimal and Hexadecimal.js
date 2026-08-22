process.stdin.resume();
process.stdin.setEncoding('utf8');

let inputData = '';
process.stdin.on('data', (data) => (inputData += data));
process.stdin.on('end', () => {
  const binaryStr = inputData.trim();

  // Convert binary string to decimal using repeated doubling (Horner's method)
  // decimal = decimal * 2 + digit, for each bit left to right
  let decimal = 0;
  for (let i = 0; i < binaryStr.length; i++) {
    const bit = binaryStr[i] === '1' ? 1 : 0;
    decimal = decimal * 2 + bit;
  }

  // Convert decimal to hexadecimal manually via repeated division by 16
  const hexDigits = '0123456789ABCDEF';
  let hex = '';

  if (decimal === 0) {
    hex = '0';
  } else {
    let n = decimal;
    while (n > 0) {
      const remainder = n % 16;
      hex = hexDigits[remainder] + hex;
      n = Math.floor(n / 16);
    }
  }

  console.log(decimal + ' ' + hex);
});