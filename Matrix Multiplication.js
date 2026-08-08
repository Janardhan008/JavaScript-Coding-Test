process.stdin.resume();
process.stdin.setEncoding('utf8');

let inputData = '';
process.stdin.on('data', d => inputData += d);
process.stdin.on('end', () => {
    const tokens = inputData.split(/\s+/).filter(Boolean).map(Number);
    let idx = 0;
    const next = () => tokens[idx++];

    const r1 = next(), c1 = next();
    const A = [];
    for (let i = 0; i < r1; i++) {
        const row = [];
        for (let j = 0; j < c1; j++) row.push(next());
        A.push(row);
    }

    const r2 = next(), c2 = next();
    const B = [];
    for (let i = 0; i < r2; i++) {
        const row = [];
        for (let j = 0; j < c2; j++) row.push(next());
        B.push(row);
    }

    if (c1 !== r2) {
        console.log("INVALID");
        return;
    }

    const result = [];
    for (let i = 0; i < r1; i++) {
        const row = [];
        for (let j = 0; j < c2; j++) {
            let sum = 0;
            for (let k = 0; k < c1; k++) {
                sum += A[i][k] * B[k][j];
            }
            row.push(sum);
        }
        result.push(row.join(' '));
    }

    console.log(result.join('\n'));
});