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

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(val) {
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

  dequeue() {
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

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.log();

console.log('Dequeuing:')
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());