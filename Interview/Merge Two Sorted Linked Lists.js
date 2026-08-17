class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function buildList(values) {
  let dummy = new ListNode(0);
  let curr = dummy;
  for (const v of values) {
    curr.next = new ListNode(v);
    curr = curr.next;
  }
  return dummy.next;
}

function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy;

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  curr.next = l1 !== null ? l1 : l2;

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

// Read input from stdin
const lines = require('fs').readFileSync('/dev/stdin', 'utf8').split('\n');

function parseLine(line) {
  if (line === undefined) return [];
  const trimmed = line.trim();
  if (trimmed === '') return [];
  return trimmed.split(/\s+/).map(Number);
}

const arr1 = parseLine(lines[0]);
const arr2 = parseLine(lines[1]);

const l1 = buildList(arr1);
const l2 = buildList(arr2);

const merged = mergeTwoLists(l1, l2);
const resultArr = listToArray(merged);

if (resultArr.length === 0) {
  console.log('EMPTY');
} else {
  console.log(resultArr.join(' '));
}