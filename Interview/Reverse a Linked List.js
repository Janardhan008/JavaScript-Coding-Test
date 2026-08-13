process.stdin.resume();
process.stdin.setEncoding('utf8');

let inputData = '';
process.stdin.on('data', d => inputData += d);
process.stdin.on('end', () => {
    const values = inputData.trim().split(/\s+/).map(Number);

    // Node structure for the singly linked list
    class Node {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    }

    // Build the linked list from the input values
    let head = null;
    let tail = null;
    for (const val of values) {
        const node = new Node(val);
        if (!head) {
            head = node;
            tail = node;
        } else {
            tail.next = node;
            tail = node;
        }
    }

    // Reverse the linked list by rewiring next pointers (single pass)
    let prev = null;
    let current = head;
    while (current !== null) {
        const nextNode = current.next; // save next before overwriting
        current.next = prev;           // point current node backward
        prev = current;                // move prev forward
        current = nextNode;            // move current forward
    }
    head = prev; // prev is now the new head (old tail)

    // Walk the reversed list and collect values for printing
    const output = [];
    let node = head;
    while (node !== null) {
        output.push(node.value);
        node = node.next;
    }

    console.log(output.join(' '));
});