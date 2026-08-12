process.stdin.resume();
process.stdin.setEncoding('utf8');

let inputData = '';
process.stdin.on('data', d => inputData += d);
process.stdin.on('end', () => {
    const lines = inputData.split('\n').map(l => l.trim()).filter(Boolean);

    const inbox = [];
    const outbox = [];
    const output = [];

    function moveInboxToOutbox() {
        if (outbox.length === 0) {
            while (inbox.length > 0) {
                outbox.push(inbox.pop());
            }
        }
    }

    for (const line of lines) {
        const [command, value] = line.split(' ');

        if (command === 'ENQUEUE') {
            inbox.push(Number(value));
            // prints nothing
        } else if (command === 'DEQUEUE') {
            moveInboxToOutbox();
            if (outbox.length === 0) {
                output.push('EMPTY');
            } else {
                output.push(String(outbox.pop()));
            }
        } else if (command === 'PEEK') {
            moveInboxToOutbox();
            if (outbox.length === 0) {
                output.push('EMPTY');
            } else {
                output.push(String(outbox[outbox.length - 1]));
            }
        } else if (command === 'SIZE') {
            output.push(String(inbox.length + outbox.length));
        }
    }

    console.log(output.join('\n'));
});