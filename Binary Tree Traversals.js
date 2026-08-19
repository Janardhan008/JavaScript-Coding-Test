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

  function preorder(node, out) {
    if (!node) return;
    out.push(node.val);
    preorder(node.left, out);
    preorder(node.right, out);
  }

  function inorder(node, out) {
    if (!node) return;
    inorder(node.left, out);
    out.push(node.val);
    inorder(node.right, out);
  }

  function postorder(node, out) {
    if (!node) return;
    postorder(node.left, out);
    postorder(node.right, out);
    out.push(node.val);
  }

  const root = buildTree(arr);

  const pre = [];
  const ino = [];
  const post = [];

  preorder(root, pre);
  inorder(root, ino);
  postorder(root, post);

  console.log(pre.join(' '));
  console.log(ino.join(' '));
  console.log(post.join(' '));
});