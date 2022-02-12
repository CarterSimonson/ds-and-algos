class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }

  setVal(val) {
    this.val = val;
  }

  setNext(node) {
    this.next = node;
  }
}

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const node = new Node(val);

    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.setNext(node);
      this.tail = node;
    }

    this.length++;
    return this;
  }

  pop() {
    if (this.length === 0) {
      return undefined;
    }
    
    const popped = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      // Locate the node directly before the tail
      this.tail = this.get(this.length - 2);
      this.tail.setNext(null);
    }

    this.length--;
    return popped;
  }

  unshift(val) {
    const node = new Node(val);

    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.setNext(this.head);
      this.head = node;
    }

    this.length++;
    return this;
  }

  shift() {
    if (this.length === 0) {
      return undefined;
    }

    const node = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = node.next;
    }

    this.length--;
    return node;
  }

  get(index) {
    let count = 0;
    let currentNode = this.head;

    while(currentNode) {
      if (count === index) {
        return currentNode;
      }

      count += 1;
      currentNode = currentNode.next;
    }

    return null;
  }

  set(index, val) {
    const node = this.get(index);

    if (node) node.setVal(val);
    return Boolean(node);
  }

  insert(index, val) {
    const node = new Node(val);

    if (index < 0 || index > this.length) {
      return false;
    } else if (index === 0) {
      this.unshift(val);
    } else if (index === this.length) {
      this.push(val);
    } else {
      const prev = this.get(index - 1);
      if (prev) {
        node.next = prev.next;
        prev.next = node;
      }
      return Boolean(prev);
    }

    this.length++;
    return true;
  }

  remove(index) {
    let removed;

    if (index < 0 || index >= this.length) {
      return undefined;
    } if (index === 0) {
      removed = this.shift();
    } else if (index === this.length - 1) {
      removed = this.pop();
    } else {
      const prev = this.get(index - 1);
      removed = prev.next;
      prev.next = removed.next;
    }

    this.length--;
    return true;
  }

  reverse() {
    if (this.length <= 1) {
      return this;
    }

    let prev = null;
    let currentNode = this.head;

    while (currentNode) {
      const next = currentNode.next;
      currentNode.setNext(prev);
      prev = currentNode;
      currentNode = next;
    }

    const tail = this.tail;
    this.tail = this.head;
    this.head = tail;
    return this;
  }

  log() {
    let output = "";
    let node = this.head;
    
    while(node) {
      output += node.val;

      if (node.next) {
        output += " -> ";
      }

      node = node.next;
    }

    console.log(output);
  }
}

// Test:
// const list = new LinkedList();
// list.push(1);
// list.push(2);
// list.push(3);
// list.push(4);
// list.push(5);
// list.log();
