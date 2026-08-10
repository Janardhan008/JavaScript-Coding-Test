const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split("\n");

let stack = [];
let output = [];

for (let line of input) {
    line = line.trim();

    if (line.startsWith("PUSH")) {
        let value = Number(line.split(" ")[1]);
        stack.push(value);
    }

    else if (line === "POP") {
        if (stack.length === 0) {
            output.push("EMPTY");
        } else {
            output.push(stack.pop());
        }
    }

    else if (line === "PEEK") {
        if (stack.length === 0) {
            output.push("EMPTY");
        } else {
            output.push(stack[stack.length - 1]);
        }
    }

    else if (line === "SIZE") {
        output.push(stack.length);
    }
}

console.log(output.join("\n"));