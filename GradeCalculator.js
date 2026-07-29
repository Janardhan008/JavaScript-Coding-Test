const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (score) => {
    score = parseInt(score.trim());
    let grade;

    if (score >= 90) {
        grade = "A";
    } else if (score >= 80) {
        grade = "B";
    } else if (score >= 70) {
        grade = "C";
    } else if (score >= 60) {
        grade = "D";
    } else {
        grade = "F";
    }

    console.log(grade);
    rl.close();
});