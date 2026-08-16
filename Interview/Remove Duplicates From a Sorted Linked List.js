class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function deleteDuplicates(head) {
    let curr = head;
    while (curr && curr.next) {
        if (curr.val === curr.next.val) {
            curr.next = curr.next.next; // skip the duplicate
        } else {
            curr = curr.next;
        }
    }
    return head;
}

// --- I/O handling ---
process.stdin.resume();
process.stdin.setEncoding('utf8');

let inputData = '';
process.stdin.on('data', (d) => (inputData += d));
process.stdin.on('end', () => {
    const nums = inputData
        .trim()
        .split(/\s+/)
        .filter((x) => x.length > 0)
        .map(Number);

    if (nums.length === 0) {
        console.log('');
        return;
    }

    let head = new Node(nums[0]);
    let tail = head;
    for (let i = 1; i < nums.length; i++) {
        tail.next = new Node(nums[i]);
        tail = tail.next;
    }

    head = deleteDuplicates(head);

    const out = [];
    let curr = head;
    while (curr) {
        out.push(curr.val);
        curr = curr.next;
    }
    console.log(out.join(' '));
});