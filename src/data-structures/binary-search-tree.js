class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export default class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val);
    } else if (val < current.val) {
      current.left ? this.insert(val, current.left) : current.left = new Node(val);
    } else if (val > current.val) {
      current.right ? this.insert(val, current.right) : current.right = new Node(val);
    }
  }

  find(val, current = this.root) {
    if (val === current.val) {
      return current;
    } else if (val < current.val) {
      return current.left ? this.find(val, current.left) : undefined;
    } else if (val > current.val) {
      return current.right ? this.find(val, current.right) : undefined;
    }
  }

  bfs(node = this.root, queue = [], visited = []) {
    if (!node) {
      return visited;
    }
    
    visited.push(node);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);

    if (queue.length > 0) {
      return this.bfs(queue.shift(), queue, visited);
    } else {
      return visited;
    }
  }

  dfsPreOrder(node = this.root, visited = []) {
    if (!node) {
      return visited;
    }
    
    visited.push(node);
    if (node.left) this.dfsPreOrder(node.left, visited);
    if (node.right) this.dfsPreOrder(node.right, visited);

    return visited;
  }

  dfsInOrder(node = this.root, visited = []) {
    if (!node) {
      return visited;
    }
    
    if (node.left) this.dfsInOrder(node.left, visited);
    visited.push(node);
    if (node.right) this.dfsInOrder(node.right, visited);

    return visited;
  }
  
  dfsPostOrder(node = this.root, visited = []) {
    if (!node) {
      return visited;
    }
    
    if (node.left) this.dfsPostOrder(node.left, visited);
    if (node.right) this.dfsPostOrder(node.right, visited);
    visited.push(node);

    return visited;
  }
}

// Test
// const binarySearchTree = new BinarySearchTree();
// binarySearchTree.insert(7);
// binarySearchTree.insert(2);
// binarySearchTree.insert(3);
// binarySearchTree.insert(0);
// binarySearchTree.insert(11);
// binarySearchTree.insert(16);

// console.log(`BFS: ${binarySearchTree.bfs().map(({val}) => val)}`);
// console.log(`DFS PreOrder: ${binarySearchTree.dfsPreOrder().map(({val}) => val)}`);
// console.log(`DFS InOrder: ${binarySearchTree.dfsInOrder().map(({val}) => val)}`);
// console.log(`DFS PostOrder: ${binarySearchTree.dfsPostOrder().map(({val}) => val)}`);