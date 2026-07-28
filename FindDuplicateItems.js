const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

const n = input[0];
const arr = input.slice(1);

const visited = new Array(n).fill(false);

for (let i = 0; i < n; i++) {

    if (visited[i]) continue;

    let duplicate = false;

    for (let j = i + 1; j < n; j++) {

        if (arr[i] === arr[j]) {
            duplicate = true;
            visited[j] = true;
        }
    }

    if (duplicate) {
        console.log(arr[i]);
    }
}