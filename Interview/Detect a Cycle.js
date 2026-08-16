class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true; // pointers met -> cycle
    }
  }
  return false; // fast reached the end -> no cycle
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
    console.log('NO CYCLE');
    return;
  }

  // Last number is the "pos" (index to link tail back to, or -1 for no cycle)
  const pos = nums[nums.length - 1];
  const values = nums.slice(0, nums.length - 1);

  if (values.length === 0) {
    console.log('NO CYCLE');
    return;
  }

  // Build the list, keeping references to each node by index
  const nodes = values.map((v) => new Node(v));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  // Link tail back if pos is a valid index
  if (pos >= 0 && pos < nodes.length) {
    nodes[nodes.length - 1].next = nodes[pos];
  }

  const head = nodes[0];
  console.log(hasCycle(head) ? 'CYCLE' : 'NO CYCLE');
});