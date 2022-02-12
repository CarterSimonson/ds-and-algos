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

export default class Stack {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  push(val) {
    const node = new Node(val);

    if (this.length === 0) {
      this.head = node;
    } else {
      node.setNext(this.head);
      this.head = node;
    }

    this.length++;
    return this;
  }

  pop() {
    if (this.length === 0) {
      return null;
    }

    const node = this.head;
    this.head = this.length === 1 ? null : node.next;

    this.length--;
    return node.val;
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

// Test
// const stack = new Stack();
// stack.push(1);
// stack.push(2);
// stack.push(3);
// stack.log();

// console.log('Popping:')
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());