// Define a simple Node class
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Build a linked list from an array
function buildLinkedList(values) {
  if (values.length === 0) return null;
  let head = new Node(values[0]);
  let current = head;
  for (let i = 1; i < values.length; i++) {
    current.next = new Node(values[i]);
    current = current.next;
  }
  return head;
}

// Find middle node using slow and fast pointers
function findMiddleNode(head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;        // move one step
    fast = fast.next.next;   // move two steps
  }
  return slow.value;
}

// Example usage
const input = [1, 2, 3, 4, 5, 6];
const head = buildLinkedList(input);
console.log(findMiddleNode(head)); // Output: 4
