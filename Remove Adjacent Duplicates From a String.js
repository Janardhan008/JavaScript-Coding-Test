process.stdin.resume();
process.stdin.setEncoding('utf8');

let inputData = '';
process.stdin.on('data', d => inputData += d);
process.stdin.on('end', () => {
    const str = inputData.trim();

    const stack = [];

    for (const ch of str) {
        if (stack.length > 0 && stack[stack.length - 1] === ch) {
            stack.pop(); // remove the matching pair
        } else {
            stack.push(ch);
        }
    }

    const result = stack.join('');
    console.log(result.length === 0 ? "EMPTY" : result);
});