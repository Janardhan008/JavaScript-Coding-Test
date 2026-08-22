process.stdin.resume();
process.stdin.setEncoding('utf8');

let inputData = '';
process.stdin.on('data', (data) => (inputData += data));
process.stdin.on('end', () => {
  const tokens = inputData.trim().split(/\s+/);

  // First token is n (count of following tokens); skip it.
  const arr = tokens.slice(1).map((t) => (t === 'null' ? null : parseInt(t, 10)));

  class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  function buildTree(arr) {
    if (!arr.length || arr[0] === null) return null;

    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    while (queue.length && i < arr.length) {
      const node = queue.shift();

      if (i < arr.length) {
        if (arr[i] !== null) {
          node.left = new TreeNode(arr[i]);
          queue.push(node.left);
        }
        i++;
      }

      if (i < arr.length) {
        if (arr[i] !== null) {
          node.right = new TreeNode(arr[i]);
          queue.push(node.right);
        }
        i++;
      }
    }

    return root;
  }

  function printLevels(root) {
    if (!root) return;

    let queue = [root];
    const lines = [];

    while (queue.length) {
      const levelVals = queue.map((n) => n.val);
      lines.push(levelVals.join(' '));

      const nextQueue = [];
      for (const node of queue) {
        if (node.left) nextQueue.push(node.left);
        if (node.right) nextQueue.push(node.right);
      }
      queue = nextQueue;
    }

    console.log(lines.join('\n'));
  }

  const root = buildTree(arr);
  printLevels(root);
});