class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function buildList(values) {
  const dummy = new ListNode(0);
  let curr = dummy;
  for (const v of values) {
    curr.next = new ListNode(v);
    curr = curr.next;
  }
  return dummy.next;
}

function listToArray(head) {
  const result = [];
  while (head !== null) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

function removeNthFromEnd(head, n) {
  // count length first to validate N
  let length = 0;
  let curr = head;
  while (curr !== null) {
    length++;
    curr = curr.next;
  }

  if (n > length || n <= 0) {
    return { result: null, invalid: true };
  }

  const dummy = new ListNode(0);
  dummy.next = head;

  let fast = dummy;
  let slow = dummy;

  // move fast n steps ahead
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  // move both until fast reaches last node
  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  // slow.next is the node to remove
  slow.next = slow.next.next;

  return { result: dummy.next, invalid: false };
}

// Read input from stdin
const lines = require('fs').readFileSync('/dev/stdin', 'utf8').split('\n');

function parseLine(line) {
  if (line === undefined) return [];
  const trimmed = line.trim();
  if (trimmed === '') return [];
  return trimmed.split(/\s+/).map(Number);
}

const values = parseLine(lines[0]);
const nLine = parseLine(lines[1]);
const n = nLine.length > 0 ? nLine[0] : NaN;

const head = buildList(values);
const { result, invalid } = removeNthFromEnd(head, n);

if (invalid) {
  console.log('INVALID');
} else {
  const arr = listToArray(result);
  if (arr.length === 0) {
    console.log('EMPTY');
  } else {
    console.log(arr.join(' '));
  }
}